// Enhanced StarField with more stars, shooting stars, trails, moon particles

const STAR_COUNT = 200;
const SHOOTING_COUNT = 8;
const MOON_PARTICLE_COUNT = 15;

interface Star { x: number; y: number; size: number; delay: number; dur: number; gold: boolean; }
interface Shooter { x: number; y: number; delay: number; width: number; }
interface MoonPart { x: number; y: number; size: number; delay: number; dur: number; }

const STARS: Star[] = Array.from({ length: STAR_COUNT }, (_, i) => ({
  x: (i * 137.508) % 100,
  y: (i * 97.32) % 100,
  size: i % 4 === 0 ? 2.5 : i % 4 === 1 ? 1.8 : i % 4 === 2 ? 1.2 : 0.7,
  delay: (i * 0.43) % 8,
  dur: 2.5 + (i * 0.19) % 4.5,
  gold: i % 7 === 0,
}));

const SHOOTERS: Shooter[] = Array.from({ length: SHOOTING_COUNT }, (_, i) => ({
  x: (i * 12) % 90,
  y: 2 + (i * 7) % 20,
  delay: 2 + i * 3.1,
  width: 70 + i * 25,
}));

const MOON_PARTS: MoonPart[] = Array.from({ length: MOON_PARTICLE_COUNT }, (_, i) => ({
  x: 35 + (i * 23) % 30, // cluster near the moon region (top area)
  y: (i * 13) % 25,
  size: 2 + (i % 3),
  delay: i * 0.7,
  dur: 3 + (i * 0.4) % 3,
}));

export default function StarField({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, opacity }}
    >
      {/* Regular stars */}
      {STARS.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            background: s.gold ? `rgba(201,168,76,.85)` : `rgba(255,255,255,${s.size > 2 ? '.8' : '.6'})`,
            boxShadow: s.gold ? `0 0 ${s.size * 3}px rgba(201,168,76,.5)` : s.size > 1.5 ? `0 0 3px rgba(255,255,255,.4)` : 'none',
            animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Moon glow particles */}
      {MOON_PARTS.map((p, i) => (
        <div
          key={`mp-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: 'rgba(201,168,76,.55)',
            boxShadow: `0 0 ${p.size * 4}px rgba(201,168,76,.4)`,
            animation: `twinkle ${p.dur}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {SHOOTERS.map((s, i) => (
        <div
          key={`sh-${i}`}
          className="absolute"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.width, height: 2,
            background: 'linear-gradient(to right, transparent, rgba(255,255,200,.95) 60%, rgba(201,168,76,.4) 85%, transparent)',
            borderRadius: 2,
            animation: `shooting 1.2s ${s.delay}s ease-out infinite`,
            transform: 'rotate(-25deg)',
          }}
        />
      ))}

      {/* Long slow dramatic shooting stars */}
      {[0, 1, 2].map(i => (
        <div
          key={`ls-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 30}%`, top: `${1 + i * 3}%`,
            width: 160, height: 1.5,
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,.6), transparent)',
            borderRadius: 2,
            animation: `shooting 2.2s ${8 + i * 7}s ease-out infinite`,
            transform: 'rotate(-18deg)',
            opacity: 0.7,
          }}
        />
      ))}

      {/* Star trails (larger dim glowing clusters) */}
      {[0,1,2,3,4].map(i => (
        <div key={`trail-${i}`} className="absolute rounded-full" style={{
          left: `${10 + i * 20}%`, top: `${10 + (i % 3) * 25}%`,
          width: 60, height: 60,
          background: `radial-gradient(circle, rgba(201,168,76,${0.04 + i * 0.01}) 0%, transparent 70%)`,
          animation: `moonPulse ${5 + i}s ${i * 1.5}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}
