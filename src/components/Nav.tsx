import { MoonOrb } from './Shared';

interface Props {
  sections: { id: string; label: string; emoji: string }[];
  current: string;
  onNavigate: (id: string) => void;
}

export default function Nav({ sections, current, onNavigate }: Props) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
      style={{
        background: 'rgba(6,6,15,.85)',
        borderBottom: '1px solid rgba(201,168,76,.15)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('finale')}>
        <MoonOrb size={28} pulse={false} />
        <span className="font-serif text-sm hidden sm:block" style={{ color: 'var(--gold-light)', letterSpacing: '.1em' }}>
          Mebaye 🌙
        </span>
      </div>

      {/* Nav dots (desktop) */}
      <div className="hidden md:flex items-center gap-1">
        {sections.map(s => (
          <button
            key={s.id}
            title={s.label}
            onClick={() => onNavigate(s.id)}
            className={`nav-dot ${current === s.id ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Section name */}
      <div className="hidden sm:block">
        <p className="font-mono text-xs" style={{ color: 'rgba(201,168,76,.5)', letterSpacing: '.15em' }}>
          {sections.find(s => s.id === current)?.emoji}{' '}
          {sections.find(s => s.id === current)?.label}
        </p>
      </div>
    </nav>
  );
}
