import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel, type Content } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

interface ChatMessageInput {
  role: 'user' | 'model';
  text: string;
}

interface ChatContextInput {
  element?: {
    number: number;
    symbol: string;
    enName: string;
    arName: string;
    latinName: string;
    category: string;
    state: string;
    atomicMass: string;
    electronConfig: string;
  };
  compound?: {
    formula: string;
    enName: string;
    arName: string;
  };
}

interface ChatRequestBody {
  messages: ChatMessageInput[];
  lang?: 'en' | 'ar';
  mode?: 'grounded' | 'fast';
  context?: ChatContextInput;
}

interface GroundingSource {
  title: string;
  uri: string;
}

function createAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function buildSystemInstruction(lang: 'en' | 'ar', context?: ChatContextInput): string {
  const languageDirective =
    lang === 'ar'
      ? 'The UI language is Arabic. Respond in clear, accurate Modern Standard Arabic (العربية الفصحى العلمية) by default unless the user writes in English, while preserving international chemical formulas (like H2O, NaCl, Fe2O3) and IUPAC symbols clearly.'
      : 'The UI language is English. Respond in clear, accurate scientific English by default unless the user writes in Arabic.';

  let focusContext = '';
  if (context?.element) {
    const el = context.element;
    focusContext += `\nCurrent element in focus: ${el.enName} (${el.arName}, Latin: ${el.latinName}), Symbol: ${el.symbol}, Atomic Number: ${el.number}, Atomic Mass: ${el.atomicMass}, Category: ${el.category}, State at 25°C: ${el.state}, Electron Config: ${el.electronConfig}.`;
  }
  if (context?.compound) {
    const comp = context.compound;
    focusContext += `\nCurrent chemical compound in focus: ${comp.enName} (${comp.arName}), Formula: ${comp.formula}.`;
  }

  return [
    'You are an expert Chemistry Educator and Chemical Research Assistant embedded inside an interactive bilingual Periodic Table application.',
    'Your role is to explain chemical elements, periodic trends, atomic structure, bonding, reaction mechanisms, stoichiometry, and chemical compounds (structure, IUPAC naming, synthesis, properties, real-world uses, and safety considerations) with precision and clarity.',
    'Format answers cleanly using concise headings, bullet points, and clear chemical formulas (e.g., H2O, NaCl, H2SO4). Avoid overly verbose filler; keep explanations educational, structured, and scientifically rigorous.',
    languageDirective,
    focusContext,
  ]
    .filter(Boolean)
    .join('\n');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const ai = createAiClient();
      if (!ai) {
        res.status(503).json({
          error:
            'Gemini API key is not configured on the server. Please configure GEMINI_API_KEY in Settings > Secrets.',
        });
        return;
      }

      const body = req.body as ChatRequestBody;
      const messages = Array.isArray(body?.messages) ? body.messages : [];
      if (messages.length === 0) {
        res.status(400).json({ error: 'At least one user message is required.' });
        return;
      }

      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || lastMessage.role !== 'user' || !lastMessage.text?.trim()) {
        res.status(400).json({ error: 'The latest message must be a non-empty user message.' });
        return;
      }

      const lang: 'en' | 'ar' = body.lang === 'ar' ? 'ar' : 'en';
      const mode: 'grounded' | 'fast' = body.mode === 'fast' ? 'fast' : 'grounded';

      const history: Content[] = messages.slice(0, -1).map((m) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }],
      }));

      const model = mode === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-4-hydrogen';
      const systemInstruction = buildSystemInstruction(lang, body.context);

      const chat = ai.chats.create({
        model,
        history,
        config:
          mode === 'fast'
            ? {
                systemInstruction,
                thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
              }
            : {
                systemInstruction,
                tools: [{ googleSearch: {} }],
              },
      });

      const response = await chat.sendMessage({
        message: lastMessage.text.trim(),
      });

      const replyText = response.text ?? '';

      // Extract unique Google Search grounding sources if present
      const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources: GroundingSource[] = [];
      const seenUris = new Set<string>();
      if (Array.isArray(rawChunks)) {
        for (const chunk of rawChunks) {
          const uri = chunk?.web?.uri;
          const title = chunk?.web?.title;
          if (uri && !seenUris.has(uri)) {
            seenUris.add(uri);
            sources.push({
              uri,
              title: title || uri,
            });
          }
        }
      }

      res.json({
        reply: replyText,
        model,
        sources,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected server error';
      const status =
        typeof err === 'object' &&
        err !== null &&
        'status' in err &&
        typeof (err as { status: unknown }).status === 'number'
          ? (err as { status: number }).status
          : 500;

      if (status === 403 || message.includes('PERMISSION_DENIED') || message.includes('API_KEY_INVALID')) {
        res.status(status === 403 ? 403 : 400).json({
          error:
            'Unable to authenticate with Gemini API. Please check your API key in Settings > Secrets.',
        });
        return;
      }

      if (status === 429 || message.includes('RESOURCE_EXHAUSTED')) {
        res.status(429).json({
          error:
            'API rate limit or quota exceeded. Please wait a moment and try again, or verify your key quota in Settings > Secrets.',
        });
        return;
      }

      res.status(status >= 400 && status < 600 ? status : 500).json({
        error: message,
      });
    }
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
