import { Star } from 'lucide-react';

interface Props {
  children?: React.ReactNode;
  delay?: number;
}

export function GoldDivider({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex items-center gap-3 my-4" style={{ animationDelay: `${delay}s` }}>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,.55), transparent)' }} />
      <Star size={9} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,.55), transparent)' }} />
    </div>
  );
}

export function SectionTitle({ children }: Props) {
  return (
    <h2
      className="font-serif shimmer-gold text-4xl sm:text-5xl text-center mb-3"
      style={{ fontWeight: 300, lineHeight: 1.1 }}
    >
      {children}
    </h2>
  );
}

export function MoonOrb({
  size = 120,
  pulse = true,
}: {
  size?: number;
  pulse?: boolean;
}) {
  return (
    <div
      className={`relative flex-shrink-0 rounded-full ${pulse ? 'moon-pulse' : ''}`}
      style={{
        width: size,
        height: size,
        overflow: 'hidden',
      }}
    >
      {/* 🌕 base sphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 30% 30%, #ffffff 0%, #f2f2f2 35%, #d2d2d2 60%, #a8a8a8 100%)',
          boxShadow:
            'inset -18px -18px 35px rgba(0,0,0,0.35), inset 10px 10px 20px rgba(255,255,255,0.25)',
        }}
      />

      {/* 🌗 light direction shadow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 70% 40%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.45) 100%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* 🌑 natural crater clusters (irregular, more “human-eye moon”) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          backgroundImage: `
            radial-gradient(circle at 22% 28%, rgba(90,90,90,0.25) 0%, transparent 18%),
            radial-gradient(circle at 48% 35%, rgba(110,110,110,0.18) 0%, transparent 22%),
            radial-gradient(circle at 65% 60%, rgba(80,80,80,0.2) 0%, transparent 20%),
            radial-gradient(circle at 35% 75%, rgba(100,100,100,0.15) 0%, transparent 18%),
            radial-gradient(circle at 55% 20%, rgba(70,70,70,0.12) 0%, transparent 16%)
          `,
          opacity: 0.85,
        }}
      />

      {/* ✨ atmospheric glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          boxShadow:
            '0 0 35px rgba(255,255,255,0.18), 0 0 90px rgba(255,255,255,0.08)',
        }}
      />
    </div>
  );
}