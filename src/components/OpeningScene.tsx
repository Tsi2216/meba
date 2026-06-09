import { useState, useEffect, useRef, useCallback } from 'react';
import { MoonOrb, GoldDivider } from './Shared';

type Phase = 'connecting' | 'searching' | 'loading' | 'error' | 'countdown' | 'done';

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
const COLORS = ['#c9a84c','#e8c96a','#fff5a0','#ff6b6b','#ff9f43','#fff','#a8e6cf','#f9ca24'];

/* ── Particle types ──────────────────────────────────────────── */
interface PItem { id: number; x: number; y: number; color: string; tx: number; ty: number; size: number; }

function GoldParticles({ active }: { active: boolean }) {
  const [p, setP] = useState<PItem[]>([]);
  useEffect(() => {
    if (!active) return;
    setP(Array.from({ length: 140 }, (_, i) => ({
      id: i, x: 3 + Math.random() * 94, y: 3 + Math.random() * 94,
      color: COLORS[i % COLORS.length],
      tx: (Math.random() - .5) * 130, ty: (Math.random() - .5) * 130,
      size: 3 + Math.random() * 11,
    })));
    const t = setTimeout(() => setP([]), 2600);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 52 }}>
      {p.map(pt => (
        <div key={pt.id} className="absolute rounded-full" style={{
          left: `${pt.x}%`, top: `${pt.y}%`, width: pt.size, height: pt.size,
          background: pt.color,
          '--tx': `${pt.tx}vw`, '--ty': `${pt.ty}vh`,
          animation: 'particleBurst 2s ease-out both',
          boxShadow: `0 0 ${pt.size}px ${pt.color}`,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}

function ConfettiRain({ active }: { active: boolean }) {
  const items = useRef(Array.from({ length: 130 }, (_, i) => ({
    id: i, x: Math.random() * 100, color: COLORS[i % COLORS.length],
    w: 4 + Math.random() * 7, h: Math.random() > .45 ? 4 + Math.random() * 7 : 2 + Math.random() * 16,
    isCircle: Math.random() > .4,
    dur: 1.8 + Math.random() * 2.6, delay: Math.random() * 2,
    tx: (Math.random() - .5) * 35, ty: 60 + Math.random() * 55,
  }))).current;
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 56 }}>
      {items.map(p => (
        <div key={p.id} className="absolute" style={{
          left: `${p.x}%`, top: '-8%', width: p.w, height: p.h,
          background: p.color, borderRadius: p.isCircle ? '50%' : 2,
          '--tx': `${p.tx}vw`, '--ty': `${p.ty}vh`,
          animation: `particleBurst ${p.dur}s ${p.delay}s ease-out both`,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}

function Fireworks({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 44 }}>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: 100 + i * 60, height: 100 + i * 60,
          border: `2px solid ${COLORS[i % COLORS.length]}`,
          animation: `firework 1.8s ${i * .06}s ease-out both`,
          opacity: .7,
        }} />
      ))}
    </div>
  );
}

function ShootingStars() {
  return (
    <>
      {[0,1,2,3,4,5,6].map(i => (
        <div key={i} className="fixed pointer-events-none" style={{
          left: `${4 + i * 13}%`, top: `${2 + (i % 4) * 6}%`,
          width: 80 + i * 22, height: 2,
          background: 'linear-gradient(to right, transparent, rgba(255,255,200,.95) 65%, rgba(201,168,76,.3) 90%, transparent)',
          borderRadius: 2, zIndex: 2,
          animation: `shooting 1.2s ${i * 2.1}s ease-out infinite`,
          transform: 'rotate(-28deg)',
        }} />
      ))}
    </>
  );
}

/* ── Glitch overlay ─────────────────────────────────────────── */
function GlitchOverlay({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 80 }}>
      {/* RGB shift slices */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,80,.04) 2px, rgba(255,0,80,.04) 4px)',
        animation: 'glitchSlice 0.12s step-end infinite',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,255,200,.03)',
        animation: 'glitchSlice 0.08s step-end infinite reverse',
      }} />
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function OpeningScene({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('connecting');
  const [loadPct, setLoadPct] = useState(0);
  const [showError, setShowError] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [shake, setShake] = useState(false);
  const [countNum, setCountNum] = useState<number | null>(null);
  const [particles, setParticles] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [fireworks, setFireworks] = useState(false);
  const [moonBurst, setMoonBurst] = useState(false);

  const triggerGlitch = useCallback(async (times = 3) => {
    for (let i = 0; i < times; i++) {
      setGlitch(true); setShake(true);
      await sleep(120);
      setGlitch(false); setShake(false);
      await sleep(80);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      await sleep(400);
      if (cancelled) return;

      // Phase: connecting
      setPhase('connecting');
      await sleep(1200);
      if (cancelled) return;

      // Phase: searching
      setPhase('searching');
      await sleep(1000);
      if (cancelled) return;

      // Phase: loading → 0→100%
      setPhase('loading');
      for (let i = 0; i <= 100; i += 2) {
        await sleep(24);
        if (cancelled) return;
        setLoadPct(i);
      }

      // Glitch + error reveal
      await triggerGlitch(4);
      if (cancelled) return;
      setShowError(true);
      setPhase('error');
      await triggerGlitch(2);
      await sleep(1600);
      if (cancelled) return;

      // Countdown 5 → 1
      setPhase('countdown');
      for (let c = 5; c >= 1; c--) {
        if (cancelled) return;
        setCountNum(c);
        if (c <= 2) await triggerGlitch(1);
        await sleep(680);
      }
      if (cancelled) return;
      setCountNum(null);

      // ✨ THE REVEAL — everything fires at once
      setParticles(true);
      setConfetti(true);
      setFireworks(true);
      setMoonBurst(true);
      setShake(true);
      setTimeout(() => setShake(false), 700);
      setTimeout(() => setParticles(false), 2800);
      setTimeout(() => setFireworks(false), 3000);
      setTimeout(() => setMoonBurst(false), 4000);
      setTimeout(() => setConfetti(false), 5500);

      await sleep(400);
      if (cancelled) return;
      setPhase('done');
    };
    run();
    return () => { cancelled = true; };
  }, [triggerGlitch]);

  const base: React.CSSProperties = {
    minHeight: '100vh',
    background: 'radial-gradient(ellipse at 50% 15%, rgba(10,8,30,.99) 0%, #06060f 100%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '2rem', position: 'relative', overflow: 'hidden',
    transform: shake ? 'none' : undefined,
    animation: shake ? 'shake .12s ease infinite' : 'none',
  };

  /* ── DONE / HERO screen ─────────────────────────────────────── */
  if (phase === 'done') {
    return (
      <div style={base}>
        <GoldParticles active={particles} />
        <ConfettiRain active={confetti} />
        <Fireworks active={fireworks} />
        <ShootingStars />

        {/* Moon glow burst */}
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 0 }}>
          <div style={{
            width: 700, height: 700, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,.28) 0%, rgba(201,168,76,.08) 40%, transparent 70%)',
            animation: 'moonPulse 1.6s ease-in-out infinite',
          }} />
        </div>

        {/* Additional firework rings */}
        {fireworks && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 3 }}>
            {[0,1,2,3].map(i => (
              <div key={i} className="absolute rounded-full" style={{
                width: 200 + i * 120, height: 200 + i * 120,
                border: `3px solid ${COLORS[i % COLORS.length]}`,
                animation: `firework 1.6s ${i * .18}s ease-out both`,
                opacity: .55,
              }} />
            ))}
          </div>
        )}

        <div className="relative z-10 text-center" style={{ animation: 'scaleIn .7s cubic-bezier(.16,1,.3,1) both' }}>
          <div className="flex justify-center mb-8 float-anim">
            <MoonOrb size={170} />
          </div>

          <p
            className="font-mono text-xs mb-5"
            style={{
              color: 'var(--gold-dim)', letterSpacing: '.4em',
              animation: 'fadeUp .5s .15s both', opacity: 0,
            }}
          >
            🎉 &nbsp;MOON BIRTHDAY PROTOCOL ACTIVE&nbsp; 🎉
          </p>

          <h1
            className="font-serif shimmer-gold mb-4"
            style={{
              fontWeight: 300, lineHeight: 1.05,
              fontSize: 'clamp(2.6rem, 8vw, 5.5rem)',
              animation: 'fadeUp .8s .35s both', opacity: 0,
            }}
          >
            Happy Birthday Mebaye ❤️
          </h1>

          <p
            className="font-serif italic"
            style={{
              fontSize: 'clamp(1.2rem, 3.5vw, 2rem)',
              color: 'rgba(232,201,106,.65)',
              animation: 'fadeUp .8s .6s both', opacity: 0,
            }}
          >
            From Your Chereka 🌙
          </p>

          <GoldDivider />

          <p
            className="text-sm mb-10"
            style={{
              color: 'rgba(232,201,106,.4)', letterSpacing: '.08em',
              animation: 'fadeUp .7s .85s both', opacity: 0,
            }}
          >
            A special mission has been prepared by the moon.
          </p>

          <button
            className="btn-gold px-14 py-4"
            onClick={onDone}
            style={{
              fontSize: '.88rem', letterSpacing: '.28em',
              animation: 'scaleIn .6s 1.1s both', opacity: 0,
            }}
          >
            Begin Mission 🚀
          </button>
        </div>
      </div>
    );
  }

  /* ── LOADING / TERMINAL screen ──────────────────────────────── */
  return (
    <div style={base}>
      <ShootingStars />
      <GoldParticles active={particles} />
      <GlitchOverlay active={glitch} />

      {/* Moon ambient glow */}
      <div className="absolute pointer-events-none" style={{
        top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,.13) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: phase === 'error' ? 'moonPulse 1.1s ease-in-out infinite' : 'moonPulse 5s ease-in-out infinite',
      }} />

      {/* Countdown overlay */}
      {phase === 'countdown' && countNum !== null && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 70 }}>
          <div
            key={countNum}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(9rem, 30vw, 16rem)',
              fontWeight: 300,
              color: countNum <= 2 ? '#e8c96a' : '#ffffff',
              textShadow: `0 0 100px ${countNum <= 2 ? 'rgba(201,168,76,.8)' : 'rgba(255,255,255,.5)'}`,
              lineHeight: 1,
              animation: 'scaleIn .22s cubic-bezier(.16,1,.3,1) both',
              WebkitTextStroke: countNum <= 2 ? '1px rgba(201,168,76,.5)' : '1px rgba(255,255,255,.2)',
            }}
          >
            {countNum}
          </div>
        </div>
      )}

      {/* Terminal box */}
      <div className="w-full max-w-lg relative z-10">
        <div
          className="terminal-screen p-5 sm:p-8 w-full"
          style={{ animation: glitch ? 'shake .1s ease infinite' : 'none' }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 mb-5 pb-3" style={{ borderBottom: '1px solid rgba(0,255,65,.2)' }}>
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs" style={{ color: 'rgba(0,255,65,.5)', letterSpacing: '.1em' }}>moon-network.sys</span>
            {glitch && (
              <span className="ml-auto text-xs" style={{ color: '#ff4444', animation: 'fadeIn .1s ease both' }}>
                GLITCH !!
              </span>
            )}
          </div>

          <div className="space-y-3 text-sm sm:text-base leading-loose">
            {/* Line 1 */}
            <p style={{ color: '#00ff41' }}>
              <span style={{ color: 'rgba(0,255,65,.4)' }}>&gt; </span>
              connecting to your moon.....
              {phase === 'connecting'
                ? <span className="inline-block w-2 h-4 ml-1 bg-green-400" style={{ animation: 'blink .8s step-end infinite', verticalAlign: 'text-bottom' }} />
                : <span style={{ color: '#a8e6cf' }}> OK</span>
              }
            </p>

            {/* Line 2 */}
            {phase !== 'connecting' && (
              <p style={{ color: '#00ff41', animation: 'fadeUp .35s ease both' }}>
                <span style={{ color: 'rgba(0,255,65,.4)' }}>&gt; </span>
                Searching for: <span style={{ color: '#e8c96a', fontWeight: 700 }}>Mebaye</span>
                {phase === 'searching'
                  ? <span className="inline-block w-2 h-4 ml-1 bg-green-400" style={{ animation: 'blink .8s step-end infinite', verticalAlign: 'text-bottom' }} />
                  : <span style={{ color: '#a8e6cf' }}> FOUND ✓</span>
                }
              </p>
            )}

            {/* Lines 3-5 */}
            {(phase === 'loading' || phase === 'error' || phase === 'countdown') && (
              <>
                <p style={{ color: '#00ff41', animation: 'fadeUp .4s .05s ease both', opacity: 0 }}>
                  <span style={{ color: 'rgba(0,255,65,.4)' }}>&gt; </span>
                  Birthday detected: <span style={{ color: '#e8c96a' }}>ሰኔ 8 ✓</span>
                </p>
                <p style={{ color: '#00ff41', animation: 'fadeUp .4s .12s ease both', opacity: 0 }}>
                  <span style={{ color: 'rgba(0,255,65,.4)' }}>&gt; </span>
                  Age detected: <span style={{ color: '#e8c96a' }}>23 ✓</span>
                </p>
                <p style={{ color: '#00ff41', animation: 'fadeUp .4s .19s ease both', opacity: 0 }}>
                  <span style={{ color: 'rgba(0,255,65,.4)' }}>&gt; </span>
                  Handsome level:{' '}
                  {!showError
                    ? <span style={{ color: '#a8e6cf' }}>Calculating...</span>
                    : <span style={{ color: '#ff4444', fontWeight: 700, animation: glitch ? 'shake .1s ease infinite' : 'none' }}>
                        OVERFLOW ERROR ∞
                      </span>
                  }
                </p>

                {/* Progress bar */}
                {phase === 'loading' && !showError && (
                  <div style={{ animation: 'fadeUp .3s .25s ease both', opacity: 0 }}>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,255,65,.1)' }}>
                        <div style={{
                          height: '100%', borderRadius: 999,
                          width: `${loadPct}%`,
                          background: 'linear-gradient(to right, #00ff41, #a8e6cf)',
                          transition: 'width .024s linear',
                          boxShadow: '0 0 10px rgba(0,255,65,.8)',
                        }} />
                      </div>
                      <span style={{ color: '#00ff41', minWidth: 44, fontVariantNumeric: 'tabular-nums' }}>{loadPct}%</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Error box */}
            {showError && (
              <div style={{ animation: 'fadeUp .35s ease both' }}>
                <div className="mt-1 p-3 rounded" style={{
                  background: 'rgba(255,30,30,.1)',
                  border: '1px solid rgba(255,50,50,.55)',
                }}>
                  <p style={{ color: '#ff4444', fontWeight: 700, letterSpacing: '.05em' }}>!! SYSTEM ERROR 0x∞</p>
                  <p style={{ color: '#ffaaaa', marginTop: 2 }}>Handsome level exceeds system limit.</p>
                  <p style={{ color: 'rgba(255,170,170,.5)', fontSize: '.78em', marginTop: 2 }}>
                    Maximum threshold: 9999 &nbsp;/&nbsp; Detected: ∞ &nbsp;/&nbsp; Status: IMMEASURABLE
                  </p>
                </div>
              </div>
            )}

            {/* Countdown label */}
            {phase === 'countdown' && (
              <div style={{ animation: 'fadeUp .35s ease both', marginTop: 8 }}>
                <p style={{ color: '#e8c96a', fontWeight: 700, letterSpacing: '.08em' }}>
                  <span style={{ color: 'rgba(0,255,65,.4)' }}>&gt; </span>
                  INITIATING BIRTHDAY PROTOCOL 🚀
                </p>
                <p style={{ color: '#c9a84c', marginTop: 4 }}>
                  <span style={{ color: 'rgba(0,255,65,.4)' }}>&gt; </span>
                  Countdown to celebration...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
