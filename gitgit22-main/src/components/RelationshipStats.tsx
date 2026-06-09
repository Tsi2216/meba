import { useState, useEffect, useRef } from 'react';
import { SectionTitle, GoldDivider } from './Shared';

interface Stat { label: string; value: string; suffix?: string; color: string; }

const STATS: Stat[] = [
  { label: 'Times Chereka 🌙 Thought About Mebaye', value: '∞', color: '#e8c96a' },
  { label: 'Times Mebaye Made Chereka 🌙 Smile', value: '9,999+', color: '#ff9f43' },
  { label: 'Times They Missed Each Other', value: '∞', color: '#a8e6cf' },
  { label: 'Times Mebaye Stole Chereka 🌙\'s Heart', value: '1', suffix: '❤️', color: '#ff6b6b' },
];

function AnimCounter({ target, color }: { target: string; color: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        if (target === '∞') {
          let i = 0;
          const frames = ['0','1','...','∞'];
          const t = setInterval(() => {
            setDisplay(frames[Math.min(i, frames.length - 1)]);
            i++;
            if (i >= frames.length) clearInterval(t);
          }, 350);
          return;
        }
        const num = parseInt(target.replace(/[^0-9]/g, ''));
        if (isNaN(num)) { setDisplay(target); return; }
        let current = 0;
        const step = Math.ceil(num / 50);
        const t = setInterval(() => {
          current = Math.min(current + step, num);
          setDisplay(current.toLocaleString() + (target.includes('+') ? '+' : ''));
          if (current >= num) clearInterval(t);
        }, 30);
      }
    }, { threshold: .3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-serif text-4xl sm:text-5xl font-bold" style={{ color, textShadow: `0 0 20px ${color}66` }}>
      {display}
    </div>
  );
}

export default function RelationshipStats() {
  return (
    <section className="section-wrapper" style={{ background: 'linear-gradient(180deg, var(--dark) 0%, var(--dark-2) 100%)' }}>
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        <SectionTitle>Relationship Statistics</SectionTitle>
        <GoldDivider />
        <p className="text-sm mb-12" style={{ color: 'rgba(232,220,190,.4)', letterSpacing: '.1em' }}>
          Moon-verified numbers. 🌙
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="gold-card p-6 text-center"
              style={{ animation: `fadeUp .7s ${i * .15}s both` }}
            >
              <AnimCounter target={stat.value} color={stat.color} />
              {stat.suffix && <span className="text-2xl ml-2 heartbeat inline-block">{stat.suffix}</span>}
              <p className="text-xs mt-3 font-mono" style={{ color: 'rgba(201,168,76,.5)', letterSpacing: '.1em', lineHeight: 1.5 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
