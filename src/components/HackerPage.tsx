import { SectionTitle, GoldDivider } from './Shared';

const LINES = [
  { label: 'Favorite Person', value: 'Chereka 🌙', color: '#e8c96a' },
  { label: 'Most Missed Person', value: 'Chereka 🌙', color: '#e8c96a' },
  { label: 'Most Loved Person', value: 'Chereka 🌙', color: '#ff9f43' },
  { label: 'Most Beautiful Person', value: 'Chereka 🌙', color: '#e8c96a' },
  { label: 'Status', value: 'Hopelessly In Love ❤️', color: '#ff6b6b' },
];

let lineDelay = 0;

export default function HackerPage() {
  return (
    <section className="section-wrapper" style={{ background: '#000' }}>
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Terminal */}
        <div className="terminal-screen p-6 sm:p-8">
          {/* Title bar */}
          <div className="flex items-center gap-2 mb-6 pb-3" style={{ borderBottom: '1px solid rgba(0,255,65,.15)' }}>
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs" style={{ color: 'rgba(0,255,65,.4)' }}>brain-scan-v2.sys</span>
          </div>

          <p className="text-sm mb-4" style={{ color: '#00ff41', animation: 'fadeUp .5s ease both' }}>
            <span style={{ color: 'rgba(0,255,65,.5)' }}>&gt; </span>
            Initializing neural scan on target: <span style={{ color: '#e8c96a' }}>Mebaye</span>
          </p>
          <p className="text-sm mb-6" style={{ color: '#00ff41', animation: 'fadeUp .5s .2s ease both', opacity: 0 }}>
            <span style={{ color: 'rgba(0,255,65,.5)' }}>&gt; </span>
            Hacking brain... <span style={{ color: '#a8e6cf' }}>SUCCESS ✓</span>
          </p>

          <div className="mb-2 pb-2" style={{ borderBottom: '1px solid rgba(0,255,65,.1)' }}>
            <p className="text-xs" style={{ color: 'rgba(0,255,65,.4)', letterSpacing: '.25em' }}>// SCAN RESULTS</p>
          </div>

          <div className="space-y-3 mt-4">
            {LINES.map((line, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm"
                style={{ animation: `fadeUp .6s ${.4 + i * .18}s ease both`, opacity: 0 }}
              >
                <span className="w-48 flex-shrink-0" style={{ color: 'rgba(0,255,65,.55)', fontFamily: 'Share Tech Mono, monospace' }}>
                  {line.label}:
                </span>
                <span className="font-bold" style={{ color: line.color, fontFamily: 'Share Tech Mono, monospace', textShadow: `0 0 8px ${line.color}` }}>
                  {line.value}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-8 pt-4"
            style={{ borderTop: '1px solid rgba(0,255,65,.15)', animation: 'fadeUp .6s 1.5s ease both', opacity: 0 }}
          >
            <p className="text-xs" style={{ color: 'rgba(0,255,65,.35)', letterSpacing: '.2em' }}>
              // CONCLUSION: Subject is irreversibly, completely, totally in love with Chereka 🌙.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
