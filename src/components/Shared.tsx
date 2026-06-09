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
      className={`relative flex-shrink-0 rounded-full ${
        pulse ? 'moon-pulse' : ''
      }`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Main moon */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          background: `
            radial-gradient(
              circle at 30% 30%,
              #fffef8 0%,
              #f8f1dc 22%,
              #eadfc2 48%,
              #cfbea0 75%,
              #a69479 100%
            )
          `,
          boxShadow: `
            inset -16px -16px 30px rgba(0,0,0,.28),
            inset 10px 10px 18px rgba(255,255,255,.18)
          `,
        }}
      >
        {/* Lunar maria (dark regions visible from Earth) */}
        <div
          style={{
            position: 'absolute',
            inset: '8%',
            borderRadius: '50%',
            opacity: 0.4,
            backgroundImage: `
              radial-gradient(ellipse at 35% 30%, rgba(70,60,45,.55) 0%, transparent 28%),
              radial-gradient(ellipse at 65% 35%, rgba(80,70,55,.45) 0%, transparent 22%),
              radial-gradient(ellipse at 45% 58%, rgba(75,65,50,.50) 0%, transparent 30%),
              radial-gradient(ellipse at 28% 70%, rgba(70,60,45,.40) 0%, transparent 18%),
              radial-gradient(ellipse at 72% 68%, rgba(65,55,40,.35) 0%, transparent 16%)
            `,
            filter: 'blur(1px)',
          }}
        />

        {/* Craters */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            backgroundImage: `
              radial-gradient(circle at 22% 28%, rgba(80,70,55,.28) 0%, rgba(0,0,0,.12) 6%, transparent 18%),
              radial-gradient(circle at 48% 35%, rgba(90,80,65,.22) 0%, rgba(0,0,0,.10) 8%, transparent 22%),
              radial-gradient(circle at 65% 60%, rgba(80,70,55,.24) 0%, rgba(0,0,0,.12) 7%, transparent 20%),
              radial-gradient(circle at 35% 75%, rgba(90,80,65,.18) 0%, rgba(0,0,0,.08) 6%, transparent 18%),
              radial-gradient(circle at 78% 22%, rgba(85,75,60,.15) 0%, transparent 14%)
            `,
            opacity: 0.9,
          }}
        />

        {/* Surface texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `
              repeating-radial-gradient(
                circle at center,
                rgba(255,255,255,.015) 0px,
                rgba(255,255,255,.015) 2px,
                transparent 3px,
                transparent 8px
              )
            `,
            opacity: 0.4,
            mixBlendMode: 'soft-light',
          }}
        />

        {/* Natural shading */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `
              radial-gradient(
                circle at 70% 40%,
                rgba(0,0,0,0) 35%,
                rgba(0,0,0,.15) 70%,
                rgba(0,0,0,.35) 100%
              )
            `,
            mixBlendMode: 'multiply',
          }}
        />

        {/* Rim highlight */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid rgba(255,245,220,.35)',
          }}
        />
      </div>

      {/* Outer moon glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          boxShadow: `
            0 0 20px rgba(255,245,210,.45),
            0 0 50px rgba(255,225,160,.25),
            0 0 100px rgba(255,220,120,.10)
          `,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}