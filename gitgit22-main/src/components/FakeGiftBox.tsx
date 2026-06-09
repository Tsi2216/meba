import { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import { SectionTitle, GoldDivider } from './Shared';

type GiftState = 'idle' | 'opening' | 'loading' | 'reveal' | 'finale';

export default function FakeGiftBox({ onFinale }: { onFinale: () => void }) {
  const [state, setState] = useState<GiftState>('idle');
  const [progress, setProgress] = useState(0);

  const open = () => {
    if (state !== 'idle') return;
    setState('opening');
    setTimeout(() => {
      setState('loading');
      let p = 0;
      const t = setInterval(() => {
        p += 2;
        setProgress(p);
        if (p >= 100) {
          clearInterval(t);
          setTimeout(() => setState('reveal'), 500);
        }
      }, 40);
    }, 1000);
  };

  return (
    <section className="section-wrapper" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(25,15,5,.95) 0%, var(--dark) 80%)' }}>
      <div className="relative z-10 w-full max-w-lg mx-auto text-center">
        <SectionTitle>A Gift For You</SectionTitle>
        <GoldDivider />
        <p className="text-sm mb-10" style={{ color: 'rgba(232,220,190,.4)', letterSpacing: '.1em' }}>
          From Chereka 🌙, with love. 🌙
        </p>

        {state === 'idle' && (
          <div>
            <button
              onClick={open}
              className="relative group flex flex-col items-center mx-auto cursor-pointer"
              style={{ background: 'none', border: 'none', outline: 'none' }}
            >
              {/* Gift box SVG */}
              <div
                className="float-anim"
                style={{
                  fontSize: 100,
                  filter: 'drop-shadow(0 0 30px rgba(201,168,76,.5)) drop-shadow(0 10px 20px rgba(0,0,0,.6))',
                  lineHeight: 1,
                }}
              >
                🎁
              </div>
              <p
                className="mt-6 text-sm transition-all"
                style={{
                  color: 'rgba(201,168,76,.6)',
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                }}
              >
                Tap to open
              </p>
            </button>
          </div>
        )}

        {state === 'opening' && (
          <div style={{ animation: 'scaleIn .4s ease both' }}>
            <div style={{ fontSize: 100, animation: 'giftOpen .8s ease both', lineHeight: 1 }}>🎁</div>
            <p className="mt-6 font-mono text-sm" style={{ color: 'var(--gold-dim)' }}>Opening...</p>
          </div>
        )}

        {state === 'loading' && (
          <div style={{ animation: 'fadeUp .5s ease both' }}>
            <p className="font-serif text-2xl shimmer-gold mb-6">Loading Gift...</p>
            <div className="w-full max-w-sm mx-auto h-2 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(201,168,76,.1)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(to right, var(--gold-dim), var(--gold), #fff5a0)',
                  transition: 'width .04s linear',
                  boxShadow: '0 0 8px var(--gold)',
                }}
              />
            </div>
            <p className="font-mono text-sm" style={{ color: 'var(--gold-dim)' }}>{progress}%</p>
          </div>
        )}

        {state === 'reveal' && (
          <div style={{ animation: 'scaleIn .6s ease both' }}>
            <div
              className="p-8 rounded mb-6"
              style={{
                background: 'rgba(201,168,76,.06)',
                border: '1px solid rgba(201,168,76,.4)',
                boxShadow: '0 0 40px rgba(201,168,76,.12)',
              }}
            >
              <p className="font-serif text-3xl shimmer-gold mb-3">
                Gift Too Precious To Display.
              </p>
              <p className="font-serif italic text-base mb-2" style={{ color: 'rgba(232,220,190,.55)' }}>
                Some things cannot be measured or shown.
              </p>
              <p className="font-serif italic text-base" style={{ color: 'rgba(232,220,190,.55)' }}>
                Only felt. ❤️
              </p>
            </div>
            <button className="btn-gold px-10 py-4" onClick={onFinale}>
              Proceed To Final Surprise 🌙
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
