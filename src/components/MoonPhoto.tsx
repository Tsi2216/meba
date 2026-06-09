import couplePhoto from '../assets/ppp.png';

interface Props {
  size?: number;
  pulse?: boolean;
}

export default function MoonPhoto({ size = 200, pulse = true }: Props) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: pulse
            ? '0 0 60px 20px rgba(201,168,76,.25), 0 0 120px 40px rgba(201,168,76,.1)'
            : '0 0 30px 10px rgba(201,168,76,.15)',
          animation: pulse ? 'moonPulse 3s ease-in-out infinite' : 'none',
        }}
      />

      {/* Moon base */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 38% 35%, #fff5d0 0%, #e8c96a 28%, #c9a84c 52%, #8a6a2a 78%, #3a2a0a 100%)',
          border: '2px solid rgba(201,168,76,.5)',
        }}
      >
        {/* Couple photo blended in as moon engraving */}
        <img
          src={couplePhoto}
          alt="Us"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            mixBlendMode: 'multiply',
            opacity: 0.55,
            filter: 'sepia(60%) brightness(1.3) contrast(0.85) saturate(0.4)',
          }}
        />

        {/* Moonlight overlay — gives the "engraved in moon" feel */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 38% 35%, rgba(255,245,210,.35) 0%, rgba(201,168,76,.18) 40%, rgba(58,42,10,.3) 100%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Crater details */}
        <div className="absolute rounded-full" style={{ width: '16%', height: '14%', top: '22%', left: '10%', background: 'rgba(120,90,30,.18)' }} />
        <div className="absolute rounded-full" style={{ width: '9%', height: '8%', top: '60%', left: '65%', background: 'rgba(120,90,30,.14)' }} />
        <div className="absolute rounded-full" style={{ width: '6%', height: '6%', top: '75%', left: '30%', background: 'rgba(120,90,30,.12)' }} />

        {/* Highlight */}
        <div className="absolute rounded-full" style={{
          width: '28%', height: '20%', top: '12%', left: '14%',
          background: 'rgba(255,255,220,.22)', filter: 'blur(6px)',
        }} />
      </div>
    </div>
  );
}
