import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Send,
  Globe,
  Zap,
  Trash2,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Compound, ElementData, Language } from '../types/element';
import { UI_TEXT } from '../data/i18n';
import { FormulaText } from './FormulaText';

export interface AiContext {
  element?: ElementData;
  compound?: Compound;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: Array<{ title: string; uri: string }>;
}

interface ChemAiDrawerProps {
  isOpen: boolean;
  lang: Language;
  context: AiContext | null;
  pendingPrompt: string | null;
  onConsumePendingPrompt: () => void;
  onClearContext: () => void;
  onClose: () => void;
}

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return tokens.map((tok, i) => {
    if (tok.startsWith('**') && tok.endsWith('**') && tok.length > 4) {
      return (
        <strong key={i} className="font-semibold text-slate-900 dark:text-white">
          {tok.slice(2, -2)}
        </strong>
      );
    }
    if (tok.startsWith('`') && tok.endsWith('`') && tok.length > 2) {
      return (
        <code
          key={i}
          dir="ltr"
          className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700/70 font-mono-tabular text-[0.88em] text-sky-800 dark:text-sky-300"
        >
          {tok.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={i}>{tok}</React.Fragment>;
  });
}

function MarkdownContent({ text }: { text: string }) {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`${keyPrefix}-ul`} className="space-y-1.5 my-2 ps-4 list-disc">
        {listItems.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderInlineMarkdown(item)}
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) {
      flushList(`line-${idx}`);
      return;
    }

    if (line.startsWith('### ')) {
      flushList(`line-${idx}`);
      blocks.push(
        <h4
          key={`h4-${idx}`}
          className="text-sm font-bold text-slate-900 dark:text-white mt-3 mb-1"
        >
          {renderInlineMarkdown(line.slice(4))}
        </h4>
      );
    } else if (line.startsWith('## ')) {
      flushList(`line-${idx}`);
      blocks.push(
        <h3
          key={`h3-${idx}`}
          className="text-sm font-bold text-slate-900 dark:text-white mt-3 mb-1"
        >
          {renderInlineMarkdown(line.slice(3))}
        </h3>
      );
    } else if (/^[-*•]\s+/.test(line)) {
      listItems.push(line.replace(/^[-*•]\s+/, ''));
    } else if (/^\d+\.\s+/.test(line)) {
      listItems.push(line.replace(/^\d+\.\s+/, ''));
    } else {
      flushList(`line-${idx}`);
      blocks.push(
        <p key={`p-${idx}`} className="leading-relaxed my-1.5">
          {renderInlineMarkdown(line)}
        </p>
      );
    }
  });

  flushList('end');
  return <div className="text-sm text-slate-700 dark:text-slate-200">{blocks}</div>;
}

export const ChemAiDrawer: React.FC<ChemAiDrawerProps> = ({
  isOpen,
  lang,
  context,
  pendingPrompt,
  onConsumePendingPrompt,
  onClearContext,
  onClose,
}) => {
  const t = UI_TEXT[lang];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'grounded' | 'fast'>('grounded');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const threadEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, error]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const sendMessage = async (promptText: string, overrideMessages?: ChatMessage[]) => {
    const trimmed = promptText.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const baseHistory = overrideMessages ?? messages;
    const nextHistory = [...baseHistory, userMsg];
    setMessages(nextHistory);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextHistory.map((m) => ({ role: m.role, text: m.text })),
          lang,
          mode,
          context: context
            ? {
                element: context.element
                  ? {
                      number: context.element.number,
                      symbol: context.element.symbol,
                      enName: context.element.enName,
                      arName: context.element.arName,
                      latinName: context.element.latinName,
                      category: context.element.category,
                      state: context.element.state,
                      atomicMass: context.element.atomicMass,
                      electronConfig: context.element.electronConfig,
                    }
                  : undefined,
                compound: context.compound
                  ? {
                      formula: context.compound.formula,
                      enName: context.compound.enName,
                      arName: context.compound.arName,
                    }
                  : undefined,
              }
            : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const modelMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        role: 'model',
        text: data.reply || '',
        sources: Array.isArray(data.sources) ? data.sources : [],
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : lang === 'ar'
          ? 'تعذر الاتصال بخدمة الذكاء الاصطناعي. تأكد من اتصالك بالإنترنت.'
          : 'Could not reach the Chemistry AI service. Check your connection and try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-send pending prompt triggered from ElementModal / Compound button
  useEffect(() => {
    if (isOpen && pendingPrompt) {
      const promptToSend = pendingPrompt;
      onConsumePendingPrompt();
      void sendMessage(promptToSend, messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, pendingPrompt]);

  if (!isOpen) return null;

  const quickPrompts: string[] = context?.compound
    ? lang === 'ar'
      ? [
          `اشرح البنية الكيميائية والروابط في ${context.compound.arName} (${context.compound.formula})`,
          `ما أبرز الاستخدامات الصناعية واحتياطات السلامة لمركب ${context.compound.formula}؟`,
        ]
      : [
          `Explain the bonding, structure, and properties of ${context.compound.enName} (${context.compound.formula})`,
          `How is ${context.compound.formula} synthesized and what are its safety precautions?`,
        ]
    : context?.element
    ? lang === 'ar'
      ? [
          `اشرح السلوك الكيميائي والتوزيع الإلكتروني لعنصر ${context.element.arName} (${context.element.symbol})`,
          `كيف يتفاعل ${context.element.arName} وما أشهر مركباته وتطبيقاته الحديثة؟`,
        ]
      : [
          `Explain the chemical reactivity and periodic trends of ${context.element.enName} (${context.element.symbol})`,
          `What are the most important reactions and modern applications of ${context.element.enName}?`,
        ]
    : lang === 'ar'
    ? [
        'اشرح الفرق بين الرابطة الأيونية والتساهمية مع أمثلة شائعة',
        'لماذا تتشابه عناصر المجموعة الواحدة في خواصها الكيميائية؟',
        'اشرح بنية واستخدامات حمض الكبريتيك H2SO4',
      ]
    : [
        'Compare ionic vs. covalent bonding with real compound examples',
        'Why do elements in the same periodic group share chemical properties?',
        'Explain the structure, synthesis, and uses of Sulfuric Acid (H2SO4)',
      ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.aiTitle}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg h-full bg-white dark:bg-slate-900 border-s border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col text-slate-900 dark:text-slate-100"
      >
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-sky-600 dark:bg-sky-500 text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold truncate">{t.aiTitle}</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {t.aiSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setError(null);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={t.aiClearChat}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.aiClearChat}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={t.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Context & Mode Bar */}
        <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 flex flex-wrap items-center justify-between gap-2">
          {/* Active Mode Selector */}
          <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-slate-200/70 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setMode('grounded')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                mode === 'grounded'
                  ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>{t.aiModeGrounded}</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('fast')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                mode === 'fast'
                  ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>{t.aiModeFast}</span>
            </button>
          </div>

          {/* Context Chip (interactive clearable focus) */}
          {(context?.element || context?.compound) && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
              <span className="font-medium">
                {context.compound ? (
                  <>
                    <FormulaText formula={context.compound.formula} className="font-bold text-sky-700 dark:text-sky-300" />
                    {' · '}
                    {lang === 'ar' ? context.compound.arName : context.compound.enName}
                  </>
                ) : context.element ? (
                  <>
                    <strong className="font-mono-tabular text-sky-700 dark:text-sky-300">
                      {context.element.symbol}
                    </strong>
                    {' · '}
                    {lang === 'ar' ? context.element.arName : context.element.enName}
                  </>
                ) : null}
              </span>
              <button
                type="button"
                onClick={onClearContext}
                className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                title={t.aiClearContext}
                aria-label={t.aiClearContext}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !isLoading && (
            <div className="py-6 space-y-4">
              <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.aiWelcome}
              </div>
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {t.aiSuggestions}
                </div>
                <div className="flex flex-col gap-2">
                  {quickPrompts.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => void sendMessage(q)}
                      className="text-start px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-sky-400 dark:hover:border-sky-600 hover:bg-sky-50/40 dark:hover:bg-sky-950/30 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[92%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-sky-600 text-white text-sm leading-relaxed'
                    : 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 w-full'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <>
                    <MarkdownContent text={msg.text} />
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          <span>{t.aiSourcesTitle}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {msg.sources.slice(0, 5).map((src, sIdx) => (
                            <a
                              key={sIdx}
                              href={src.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-700 dark:text-sky-300 hover:underline max-w-[220px] truncate"
                            >
                              <ExternalLink className="w-3 h-3 shrink-0" />
                              <span className="truncate">{src.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 px-2">
              <Loader2 className="w-4 h-4 animate-spin text-sky-600 dark:text-sky-400" />
              <span>{t.aiThinking}</span>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div ref={threadEndRef} />
        </div>

        {/* Input Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void sendMessage(input);
          }}
          className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        >
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void sendMessage(input);
                }
              }}
              placeholder={t.aiInputPlaceholder}
              className="flex-1 resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:pointer-events-none text-white transition-colors shrink-0 cursor-pointer"
              aria-label={t.aiSend}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
};
