import { useState, useEffect } from 'react';
import { SectionTitle, GoldDivider, MoonOrb } from './Shared';

interface ScanLine { label: string; value: string; color: string; delay: number; }

const LINES: ScanLine[] = [
  { label: 'Mebaye', value: '100%', color: '#e8c96a', delay: 0.3 },
  { label: 'Chereka 🌙', value: '100%', color: '#e8c96a', delay: 0.7 },
  { label: 'Together', value: 'Infinity%', color: '#ff9f43', delay: 1.1 },
];

function CompatBar({ value, color, delay }: { value: string; color: string; delay: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(100), delay * 1000 + 400);
    return () => clearTimeout(t);
  }, [delay]);

  const isInfinity = value === 'Infinity%';

  return (
    <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.07)' }}>
      <div
        className="h-full rounded-full"
        style={{
          width: `${width}%`,
          background: isInfinity
            ? 'linear-gradient(to right, var(--gold-dim), var(--gold), #fff5a0, var(--gold), var(--gold-dim))'
            : `linear-gradient(to right, ${color}88, ${color})`,
          transition: 'width 1.2s cubic-bezier(.16,1,.3,1)',
          boxShadow: `0 0 10px ${color}66`,
          backgroundSize: isInfinity ? '200% 100%' : '100%',
          animation: isInfinity ? 'shimmer 2s linear infinite' : 'none',
        }}
      />
    </div>
  );
}

export default function CompatibilityScan() {
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => setDone(true), 2800);
  };

  return (
    <section className="section-wrapper" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(10,10,30,.9) 0%, var(--dark) 80%)' }}>
      <div className="relative z-10 w-full max-w-xl mx-auto text-center">
        <SectionTitle>Compatibility Scan</SectionTitle>
        <GoldDivider />
        <p className="text-sm mb-10" style={{ color: 'rgba(232,220,190,.4)', letterSpacing: '.1em' }}>
          Moon-certified compatibility analysis
        </p>

        {/* Scanner visual */}
        <div className="relative flex justify-center mb-10">
          <div className="relative">
            <MoonOrb size={120} />
            {scanning && (
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid var(--gold)',
                  animation: 'spin 2s linear infinite',
                  boxShadow: '0 0 20px var(--gold)',
                }}
              />
            )}
            {scanning && (
              <div
                className="absolute"
                style={{
                  top: '50%',
                  left: '-30%',
                  width: '160%',
                  height: 2,
                  background: 'linear-gradient(to right, transparent, rgba(201,168,76,.8), transparent)',
                  transform: 'translateY(-50%)',
                  animation: 'spin 2s linear infinite',
                  transformOrigin: 'center',
                }}
              />
            )}
          </div>
        </div>

        {!scanning ? (
          <button className="btn-gold px-10 py-3" onClick={startScan}>
            Begin Moon Scan 🌙
          </button>
        ) : (
          <div className="space-y-5 text-left">
            {LINES.map((line, i) => (
              <div key={i} style={{ animation: `fadeUp .6s ${line.delay}s both`, opacity: 0 }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm" style={{ color: 'var(--gold-light)', letterSpacing: '.1em' }}>
                    {line.label}
                  </span>
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: line.color, textShadow: `0 0 10px ${line.color}` }}
                  >
                    {line.value}
                  </span>
                </div>
                <CompatBar value={line.value} color={line.color} delay={line.delay} />
              </div>
            ))}

            {done && (
              <div className="text-center mt-8 p-6 rounded" style={{
                background: 'rgba(201,168,76,.07)',
                border: '1px solid rgba(201,168,76,.3)',
                animation: 'scaleIn .6s .2s both',
              }}>
                <p className="font-mono text-sm mb-2" style={{ color: 'var(--gold-dim)', letterSpacing: '.2em' }}>RESULT</p>
                <p className="font-serif shimmer-gold text-3xl mb-2">Perfect Match Found</p>
                <p className="text-2xl heartbeat inline-block">❤️</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
