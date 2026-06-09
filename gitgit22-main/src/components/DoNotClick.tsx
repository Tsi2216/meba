import { useState, useRef } from 'react';
import { SectionTitle, GoldDivider } from './Shared';

interface Particle { id: number; x: number; y: number; color: string; size: number; tx: number; ty: number; }

const COLORS = ['#c9a84c','#e8c96a','#ff6b6b','#ff9f43','#fff5a0','#a8e6cf','#fff'];

function Burst({ active }: { active: boolean }) {
  if (!active) return null;
  const p: Particle[] = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: 50,
    y: 50,
    color: COLORS[i % COLORS.length],
    size: 4 + Math.random() * 8,
    tx: (Math.random() - .5) * 60,
    ty: (Math.random() - .5) * 60,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 50 }}>
      {p.map(pt => (
        <div key={pt.id} className="absolute rounded-full" style={{
          left: `${pt.x}%`, top: `${pt.y}%`,
          width: pt.size, height: pt.size,
          background: pt.color,
          '--tx': `${pt.tx}vw`, '--ty': `${pt.ty}vh`,
          animation: 'particleBurst 1.2s ease-out both',
        } as React.CSSProperties} />
      ))}
    </div>
  );
}

type Step = 'default' | 'wrong1' | 'wrong2' | 'correct';

export default function DoNotClick() {
  const [clicked, setClicked] = useState<Step>('default');
  const [shake, setShake] = useState(false);
  const [burst, setBurst] = useState(false);

  const handleClick = () => {
    if (clicked === 'default') {
      setShake(true);
      setTimeout(() => setShake(false), 700);
      setClicked('wrong1');
    } else if (clicked === 'wrong1') {
      setShake(true);
      setTimeout(() => setShake(false), 700);
      setClicked('wrong2');
    } else if (clicked === 'wrong2') {
      setBurst(true);
      setTimeout(() => setBurst(false), 1500);
      setClicked('correct');
    }
  };

  const reset = () => setClicked('default');

  return (
    <section className="section-wrapper" style={{ background: 'linear-gradient(180deg, var(--dark-2) 0%, var(--dark) 100%)' }}>
      <Burst active={burst} />
      <div className="relative z-10 w-full max-w-lg mx-auto text-center">
        <SectionTitle>The Button</SectionTitle>
        <GoldDivider />

        {clicked !== 'correct' && (
          <p className="text-sm mb-10" style={{ color: 'rgba(232,220,190,.4)', letterSpacing: '.1em' }}>
            There is only one rule.
          </p>
        )}

        {clicked === 'default' && (
          <div>
            <button
              onClick={handleClick}
              className="relative font-bold text-xl sm:text-2xl px-12 py-6 rounded-lg transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #c0392b, #e74c3c, #ff6b6b)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 40px rgba(231,76,60,.5), 0 10px 40px rgba(0,0,0,.5)',
                letterSpacing: '.15em',
                fontFamily: 'Montserrat, sans-serif',
                animation: 'heartbeat 2s ease-in-out infinite',
              }}
            >
              DO NOT CLICK
            </button>
            <p className="mt-6 text-xs" style={{ color: 'rgba(255,100,100,.3)', letterSpacing: '.2em' }}>
              I'm warning you, Mebaye.
            </p>
          </div>
        )}

        {clicked === 'wrong1' && (
          <div style={{ animation: shake ? 'shake .6s ease both' : 'scaleIn .5s ease both' }}>
            <div className="p-8 rounded-lg mb-6" style={{ background: 'rgba(231,76,60,.12)', border: '2px solid rgba(231,76,60,.5)' }}>
              <p className="text-4xl mb-4">😤</p>
              <p className="font-serif text-3xl shimmer-gold mb-2">MEBAYE!</p>
              <p className="text-lg" style={{ color: '#ff9f43' }}>YOU HAD ONE JOB 😂</p>
            </div>
            <button onClick={handleClick} className="btn-outline-gold px-8 py-3">
              I'm sorry... (click again)
            </button>
          </div>
        )}

        {clicked === 'wrong2' && (
          <div style={{ animation: 'scaleIn .5s ease both' }}>
            <div className="p-8 rounded-lg mb-6" style={{ background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.3)' }}>
              <p className="text-4xl mb-4">😏</p>
              <p className="font-serif text-2xl mb-3" style={{ color: 'var(--gold-light)' }}>
                Actually...
              </p>
              <p className="text-base" style={{ color: 'rgba(232,220,190,.7)' }}>
                I knew you would click it 😏❤️
              </p>
            </div>
            <button onClick={handleClick} className="btn-gold px-8 py-3">
              But what happens now...?
            </button>
          </div>
        )}

        {clicked === 'correct' && (
          <div style={{ animation: 'scaleIn .6s ease both' }}>
            <div className="p-8 rounded-lg mb-6" style={{ background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.4)' }}>
              <p className="text-5xl mb-4" style={{ animation: 'heartbeat 1.2s ease-in-out infinite', display: 'inline-block' }}>❤️</p>
              <p className="font-serif text-2xl shimmer-gold mb-3">
                That's why I love you, Mebaye
              </p>
              <p className="font-serif italic text-base" style={{ color: 'rgba(232,220,190,.6)' }}>
                You always go your own way. And I wouldn't change a thing. 🌙
              </p>
            </div>
            <button onClick={reset} className="btn-outline-gold px-8 py-3 text-xs">
              Reset Button
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
