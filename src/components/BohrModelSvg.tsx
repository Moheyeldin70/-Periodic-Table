import React from 'react';

interface BohrModelSvgProps {
  symbol: string;
  number: number;
  shells: number[];
  size?: number;
}

export const BohrModelSvg: React.FC<BohrModelSvgProps> = ({
  symbol,
  number,
  shells,
  size = 180,
}) => {
  const center = size / 2;
  const maxRadius = size * 0.44;
  const minRadius = size * 0.17;
  const shellCount = shells.length;
  const step = shellCount > 1 ? (maxRadius - minRadius) / (shellCount - 1) : 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="select-none shrink-0"
      role="img"
      aria-label={`Electron shell diagram for ${symbol} (${shells.join(', ')})`}
    >
      {/* Orbit rings */}
      {shells.map((_, shellIdx) => {
        const r = shellCount === 1 ? maxRadius * 0.65 : minRadius + shellIdx * step;
        return (
          <circle
            key={`orbit-${shellIdx}`}
            cx={center}
            cy={center}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.2}
            strokeWidth={1}
          />
        );
      })}

      {/* Electrons */}
      {shells.map((electronCount, shellIdx) => {
        const r = shellCount === 1 ? maxRadius * 0.65 : minRadius + shellIdx * step;
        const angleOffset = (shellIdx * Math.PI) / 6;
        return Array.from({ length: electronCount }).map((__, eIdx) => {
          const angle = angleOffset + (2 * Math.PI * eIdx) / electronCount;
          const cx = center + r * Math.cos(angle);
          const cy = center + r * Math.sin(angle);
          const isOuter = shellIdx === shellCount - 1;
          return (
            <circle
              key={`e-${shellIdx}-${eIdx}`}
              cx={cx}
              cy={cy}
              r={isOuter ? 3.2 : 2.3}
              className={
                isOuter
                  ? 'fill-sky-600 dark:fill-sky-400'
                  : 'fill-slate-600 dark:fill-slate-400'
              }
            />
          );
        });
      })}

      {/* Nucleus */}
      <circle
        cx={center}
        cy={center}
        r={size * 0.105}
        className="fill-slate-900 dark:fill-slate-100"
      />
      <text
        x={center}
        y={center - 1}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-white dark:fill-slate-950 font-bold"
        style={{ fontSize: `${Math.max(10, size * 0.085)}px` }}
      >
        {symbol}
      </text>
      <text
        x={center}
        y={center + size * 0.055}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-slate-300 dark:fill-slate-600 font-mono-tabular"
        style={{ fontSize: `${Math.max(7, size * 0.05)}px` }}
      >
        {number}
      </text>
    </svg>
  );
};
