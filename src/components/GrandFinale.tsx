import { useEffect, useState } from 'react';
import { MoonOrb } from './Shared';

const MESSAGES = [
  'Thank You For Every Smile',
  'Thank You For Every Memory',
  'Thank You For Every Moment',
  'Thank You For Being My Person',
];

const AMHARIC = 'መልካም ልደት ሄኖኬ';

export default function GrandFinale() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 900),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 2700),
      setTimeout(() => setPhase(4), 3600),
      setTimeout(() => setPhase(5), 4600),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="finale">
      {/* BACKGROUND */}
      <div className="bg" />
      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />

      {/* CONTENT */}
      <div className="container">
        <div className="moon">
          <MoonOrb size={150} />
        </div>

        <div className="messages">
          {MESSAGES.map((msg, i) => (
            <p key={i} className={`msg ${phase > i ? 'show' : ''}`}>
              {msg}
            </p>
          ))}
        </div>

        {phase >= 5 && (
          <div className="final">
            <h1>Happy Birthday Mebaye</h1>
            <div className="heart">❤️</div>

            <h2>{AMHARIC}</h2>
            <p className="date">ሰኔ 8</p>

            <p className="from">From Your Chereka 🌙</p>
            <p className="end">Forever and Always</p>
          </div>
        )}
      </div>

      {/* STYLE */}
      <style>{`
        .finale {
          height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top, #0b0f1a 0%, #05060a 60%, #02030a 100%);
          color: white;
          font-family: serif;
        }

        /* 🌌 soft glow */
        .bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(201,168,76,0.08), transparent 65%);
          opacity: 0.9;
        }

        /* ⭐ STAR LAYER 1 (small distant stars) */
        .stars, .stars2, .stars3 {
          position: absolute;
          inset: 0;
          background-repeat: repeat;
        }

        .stars {
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 120px 120px;
          opacity: 0.25;
          animation: twinkle 6s infinite ease-in-out;
        }

        /* ⭐ STAR LAYER 2 (medium stars) */
        .stars2 {
          background-image: radial-gradient(white 1.5px, transparent 1.5px);
          background-size: 180px 180px;
          opacity: 0.35;
          animation: twinkle2 8s infinite ease-in-out;
        }

        /* ⭐ STAR LAYER 3 (bright stars) */
        .stars3 {
          background-image: radial-gradient(rgba(255,255,255,0.9) 2px, transparent 2px);
          background-size: 260px 260px;
          opacity: 0.45;
          animation: twinkle3 10s infinite ease-in-out;
        }

        @keyframes twinkle {
          0%,100% { opacity: 0.18; filter: brightness(1); }
          50% { opacity: 0.32; filter: brightness(1.3); }
        }

        @keyframes twinkle2 {
          0%,100% { opacity: 0.25; }
          50% { opacity: 0.45; }
        }

        @keyframes twinkle3 {
          0%,100% { opacity: 0.35; filter: brightness(1); }
          50% { opacity: 0.6; filter: brightness(1.6); }
        }

        /* CONTENT */
        .container {
          position: relative;
          text-align: center;
          z-index: 2;
          animation: fadeInUp 1.2s ease;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .moon {
          margin-bottom: 25px;
          animation: moonFloat 6s ease-in-out infinite;
        }

        @keyframes moonFloat {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .messages {
          margin-bottom: 25px;
        }

        .msg {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.8s ease;
          color: #e8c96a;
          font-size: 18px;
          margin: 6px 0;
        }

        .msg.show {
          opacity: 1;
          transform: translateY(0);
        }

        .final h1 {
          font-size: 42px;
          color: #e8c96a;
          margin-bottom: 8px;
        }

        .heart {
          font-size: 22px;
          margin-bottom: 10px;
          animation: pulse 1.8s infinite ease-in-out;
        }

        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .final h2 {
          font-size: 26px;
          color: #c9a84c;
          margin-top: 10px;
        }

        .date {
          opacity: 0.6;
          font-size: 14px;
        }

        .from {
          margin-top: 18px;
          font-style: italic;
          color: #e8c96a;
        }

        .end {
          opacity: 0.5;
          font-size: 14px;
        }
      `}</style>
    </section>
  );
}