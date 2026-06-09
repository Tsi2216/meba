import { useState, useRef, useCallback } from 'react';
import { SectionTitle, GoldDivider } from './Shared';
import { RotateCcw } from 'lucide-react';

const REWARDS = [
  { emoji: '☕', label: 'Coffee Date', desc: 'Just the two of us and good coffee.' },
  { emoji: '🎬', label: 'Movie Night', desc: 'Your pick, my arms around you.' },
  { emoji: '💌', label: 'Special Message', desc: 'Words written just for your heart.' },
  { emoji: '👑', label: 'VIP Boyfriend Award', desc: 'Officially the best boyfriend ever.' },
  { emoji: '🎁', label: 'Mystery Surprise', desc: 'Something unexpected, just for you.' },
  { emoji: '🌙', label: 'Secret Moon Reward', desc: 'Only the moon knows what it is.' },
  { emoji: '💞', label: 'Hidden Romantic Message', desc: 'A secret only you will hear.' },
  { emoji: '🍔', label: 'Favorite Meal', desc: 'Whatever your heart desires.' },
];

const SEGMENT_COLORS = REWARDS.map((_, i) =>
  i % 2 === 0 ? 'rgba(201,168,76,.35)' : 'rgba(201,168,76,.12)'
);

export default function RewardWheel() {
  const [spinning, setSpinning] = useState(false);
  const [totalRotation, setTotalRotation] = useState(0);
  const [result, setResult] = useState<typeof REWARDS[0] | null>(null);
  const [revealed, setRevealed] = useState(false);

  const n = REWARDS.length;
  const angle = 360 / n;
  const size = 300;
  const cx = size / 2, cy = size / 2, r = size / 2 - 4;

  const segmentPath = (i: number) => {
    const s = ((i * angle - 90) * Math.PI) / 180;
    const e = (((i + 1) * angle - 90) * Math.PI) / 180;
    return `M ${cx} ${cy} L ${cx + r * Math.cos(s)} ${cy + r * Math.sin(s)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(e)} ${cy + r * Math.sin(e)} Z`;
  };

  const textPos = (i: number) => {
    const mid = ((i * angle + angle / 2 - 90) * Math.PI) / 180;
    return { x: cx + r * 0.62 * Math.cos(mid), y: cy + r * 0.62 * Math.sin(mid), rotate: i * angle + angle / 2 };
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    setRevealed(false);

    const extra = 1440 + Math.random() * 720;
    const newTotal = totalRotation + extra;
    setTotalRotation(newTotal);

    setTimeout(() => {
      const normalized = ((newTotal % 360) + 360) % 360;
      const pointer = (360 - normalized + 270) % 360;
      const idx = Math.floor(pointer / angle) % n;
      setResult(REWARDS[idx]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <section className="section-wrapper" style={{ background: 'var(--dark-2)' }}>
      <div className="relative z-10 w-full max-w-lg mx-auto text-center">
        <SectionTitle>Birthday Reward Wheel</SectionTitle>
        <GoldDivider />
        <p className="text-sm mb-8" style={{ color: 'rgba(232,220,190,.4)', letterSpacing: '.1em' }}>
          Spin to discover your reward, Mebaye. 🌙
        </p>

        {/* Wheel */}
        <div className="flex justify-center mb-6 relative">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20" style={{ marginTop: -2 }}>
            <div style={{
              width: 0, height: 0,
              borderLeft: '12px solid transparent', borderRight: '12px solid transparent',
              borderTop: '28px solid var(--gold)',
              filter: 'drop-shadow(0 0 8px var(--gold))',
            }} />
          </div>

          <div style={{
            width: size, height: size,
            transform: `rotate(${totalRotation}deg)`,
            transition: spinning ? 'transform 4s cubic-bezier(.17,.67,.12,1)' : 'none',
            borderRadius: '50%', overflow: 'hidden',
            border: '2px solid rgba(201,168,76,.4)',
            boxShadow: '0 0 30px rgba(201,168,76,.15)',
          }}>
            <svg width={size} height={size}>
              {REWARDS.map((reward, i) => {
                const tp = textPos(i);
                return (
                  <g key={i}>
                    <path d={segmentPath(i)} fill={SEGMENT_COLORS[i]} stroke="rgba(201,168,76,.3)" strokeWidth="1" />
                    {/* Show ? instead of content until revealed */}
                    <text x={tp.x} y={tp.y} textAnchor="middle" dominantBaseline="middle"
                      fontSize="18" transform={`rotate(${tp.rotate}, ${tp.x}, ${tp.y})`}>
                      ❓
                    </text>
                  </g>
                );
              })}
              <circle cx={cx} cy={cy} r={28} fill="rgba(6,6,15,.9)" stroke="rgba(201,168,76,.5)" strokeWidth="2" />
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="20">🌙</text>
            </svg>
          </div>
        </div>

        <button
          className="btn-gold px-10 py-3 mb-8 mx-auto flex items-center gap-2"
          onClick={spin} disabled={spinning}
          style={{ opacity: spinning ? .6 : 1, fontSize: '.82rem' }}
        >
          <RotateCcw size={15} />
          {spinning ? 'Spinning...' : 'Spin The Wheel'}
        </button>

        {/* Result — hidden until revealed */}
        {result && !revealed && (
          <div style={{ animation: 'scaleIn .5s ease both' }}>
            <div className="p-6 rounded mb-4" style={{
              background: 'rgba(201,168,76,.06)', border: '1px solid rgba(201,168,76,.35)',
              boxShadow: '0 0 20px rgba(201,168,76,.1)',
            }}>
              <p className="font-serif text-xl mb-4" style={{ color: 'rgba(201,168,76,.6)' }}>
                The wheel has chosen... 🌙
              </p>
              <div style={{
                width: 80, height: 80, borderRadius: '50%', margin: '0 auto 16px',
                background: 'rgba(201,168,76,.12)', border: '2px solid rgba(201,168,76,.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, animation: 'heartbeat 1.2s ease-in-out infinite',
              }}>
                🎁
              </div>
              <p className="text-sm mb-4" style={{ color: 'rgba(201,168,76,.5)' }}>
                Your reward is waiting...
              </p>
              <button className="btn-gold px-8 py-3" onClick={() => setRevealed(true)}>
                Reveal My Reward ✨
              </button>
            </div>
          </div>
        )}

        {result && revealed && (
          <div style={{ animation: 'scaleIn .5s ease both' }}>
            <div className="p-6 rounded" style={{
              background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.4)',
              boxShadow: '0 0 40px rgba(201,168,76,.18)',
            }}>
              <p className="text-5xl mb-3" style={{ animation: 'heartbeat 1.2s ease-in-out infinite', display: 'inline-block' }}>
                {result.emoji}
              </p>
              <p className="font-serif shimmer-gold text-2xl mb-2">{result.label}</p>
              <p className="font-serif italic text-sm mb-1" style={{ color: 'rgba(232,220,190,.6)' }}>{result.desc}</p>
              <p className="font-mono text-xs mt-3" style={{ color: 'rgba(201,168,76,.4)', letterSpacing: '.2em' }}>
                — YOUR BIRTHDAY REWARD 🎉
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
