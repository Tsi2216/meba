import { useState } from 'react';
import { SectionTitle, GoldDivider } from './Shared';
import { Shield, FileText } from 'lucide-react';

const CHARGES = [
  'Stealing Chereka 🌙\'s Heart',
  'Making Her Smile Every Day',
  'Being Too Handsome',
  'Being Impossible To Forget',
  'Occupying Her Mind 24/7',
  'Making Life More Beautiful',
];

export default function FBIPage() {
  const [stamped, setStamped] = useState(false);

  return (
    <section className="section-wrapper" style={{ background: 'var(--dark-2)' }}>
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield size={28} style={{ color: 'var(--gold)' }} />
            <SectionTitle>Moon Investigation Report</SectionTitle>
            <Shield size={28} style={{ color: 'var(--gold)' }} />
          </div>
          <p className="font-mono text-xs" style={{ color: 'var(--gold-dim)', letterSpacing: '.3em' }}>
            CLASSIFIED / MOONFORCE AGENCY / JUNE 2026
          </p>
          <GoldDivider />
        </div>

        <div
          className="relative gold-card p-6 sm:p-10"
          style={{ background: 'rgba(8,8,20,.85)', borderColor: 'rgba(201,168,76,.4)' }}
        >
          <div className="flex items-start justify-between mb-6 pb-4" style={{ borderBottom: '1px solid rgba(201,168,76,.2)' }}>
            <div>
              <p className="font-mono text-xs mb-1" style={{ color: 'var(--gold-dim)', letterSpacing: '.2em' }}>CASE NO. 0608-MEBAYE</p>
              <p className="font-mono text-xs" style={{ color: 'var(--gold-dim)', letterSpacing: '.2em' }}>DATE: ሰኔ 8, 2026</p>
            </div>
            <FileText size={32} style={{ color: 'rgba(201,168,76,.3)' }} />
          </div>

          <div className="mb-5">
            <p className="font-mono text-xs mb-1" style={{ color: 'var(--gold-dim)', letterSpacing: '.2em' }}>SUBJECT</p>
            <p className="font-serif text-3xl shimmer-gold">Mebaye</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <p className="font-mono text-xs mb-1" style={{ color: 'var(--gold-dim)' }}>BIRTHDAY</p>
              <p style={{ color: 'var(--gold-light)' }}>ሰኔ 8</p>
            </div>
            <div>
              <p className="font-mono text-xs mb-1" style={{ color: 'var(--gold-dim)' }}>STATUS</p>
              <p style={{ color: '#a8e6cf' }}>Extremely Adorable ✓</p>
            </div>
            <div>
              <p className="font-mono text-xs mb-1" style={{ color: 'var(--gold-dim)' }}>AGE</p>
              <p style={{ color: 'var(--gold-light)' }}>23</p>
            </div>
            <div>
              <p className="font-mono text-xs mb-1" style={{ color: 'var(--gold-dim)' }}>THREAT LEVEL</p>
              <p style={{ color: '#ff9f43' }}>DANGEROUSLY LOVEABLE</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="font-mono text-xs mb-3" style={{ color: 'var(--gold-dim)', letterSpacing: '.2em' }}>CHARGES</p>
            <div className="space-y-2">
              {CHARGES.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(168,230,207,.12)', border: '1px solid #a8e6cf' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: '#a8e6cf' }} />
                  </div>
                  <p className="text-sm" style={{ color: 'rgba(232,220,190,.75)' }}>{c}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center relative">
            <button
              className="font-mono text-2xl sm:text-3xl font-bold tracking-widest py-3 px-8 rounded transition-all"
              style={{
                border: '3px solid #ff6b6b',
                color: '#ff6b6b',
                background: 'rgba(255,107,107,.06)',
                transform: stamped ? 'rotate(-8deg) scale(1.05)' : 'rotate(-4deg) scale(1)',
                boxShadow: stamped ? '0 0 30px rgba(255,107,107,.4)' : '0 0 10px rgba(255,107,107,.15)',
                transition: 'all .4s ease',
                cursor: 'default',
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '.25em',
              }}
              onClick={() => setStamped(true)}
            >
              GUILTY ❤️
            </button>
            {stamped && (
              <p className="mt-3 text-xs font-mono" style={{ color: 'rgba(255,107,107,.6)', animation: 'fadeUp .4s ease both' }}>
                Sentence: Receive all the love forever.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
