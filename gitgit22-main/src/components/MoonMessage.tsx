import { useState } from 'react';
import { SectionTitle, GoldDivider, MoonOrb } from './Shared';
import { speakWithFemaleVoice } from './voiceUtils';

export default function MoonMessage() {
  const [speaking, setSpeaking] = useState(false);
  const [spoken, setSpoken] = useState(false);
  const [glowing, setGlowing] = useState(false);

  const speak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported in this browser.');
      return;
    }
    const text = `Hello Mebaye. I am the moon. Your Chereka asked me to deliver a message. Today is your special day. The stars are celebrating. The sky is celebrating. And someone loves you very much. Happy birthday.`;
    speakWithFemaleVoice(
      text,
      { rate: 0.82, pitch: 1.1, volume: 1 },
      {
        onstart: () => { setSpeaking(true); setGlowing(true); },
        onend: () => { setSpeaking(false); setSpoken(true); setGlowing(false); },
      }
    );
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setGlowing(false);
  };

  const MESSAGE_LINES = [
    'Hello Mebaye.',
    'I am the moon.',
    'Your Chereka 🌙 asked me to deliver a message.',
    'Today is your special day.',
    'The stars are celebrating.',
    'The sky is celebrating.',
    'And someone loves you very much. ❤️',
  ];

  return (
    <section className="section-wrapper" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(15,10,40,.95) 0%, var(--dark) 80%)' }}>
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        <SectionTitle>Moon Message</SectionTitle>
        <GoldDivider />
        <p className="text-sm mb-10" style={{ color: 'rgba(232,220,190,.4)', letterSpacing: '.1em' }}>
          Click the moon. It has something to say.
        </p>

        {/* Clickable Moon */}
        <div className="flex justify-center mb-10">
          <button
            onClick={speaking ? stop : speak}
            className="relative flex items-center justify-center rounded-full transition-all duration-500 cursor-pointer"
            style={{
              width: 180,
              height: 180,
              background: 'none',
              border: 'none',
              outline: 'none',
            }}
          >
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: glowing
                  ? '0 0 80px 30px rgba(201,168,76,.5), 0 0 150px 60px rgba(201,168,76,.2)'
                  : '0 0 30px 8px rgba(201,168,76,.1)',
                transition: 'box-shadow .6s ease',
                animation: glowing ? 'moonPulse 1.5s ease-in-out infinite' : 'none',
              }}
            />
            <MoonOrb size={160} pulse={!glowing} />
            {/* Hint text */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-xs whitespace-nowrap"
              style={{ color: 'rgba(201,168,76,.5)', letterSpacing: '.15em' }}
            >
              {speaking ? '🔊 Speaking...' : '🌙 Click me'}
            </div>
          </button>
        </div>

        {/* Message reveal */}
        <div
          className="gold-card p-6 text-left mt-12"
          style={{ opacity: spoken || speaking ? 1 : 0.4, transition: 'opacity .5s ease' }}
        >
          {MESSAGE_LINES.map((line, i) => (
            <p
              key={i}
              className="font-serif text-lg mb-2"
              style={{
                color: 'rgba(232,201,106,.8)',
                fontStyle: 'italic',
                lineHeight: 1.7,
                animationDelay: `${i * .15}s`,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {spoken && (
          <p className="mt-6 text-sm" style={{ color: 'rgba(201,168,76,.5)', animation: 'fadeUp .6s ease both' }}>
            — Delivered with moonlight, just for you 🌙
          </p>
        )}
      </div>
    </section>
  );
}