import { useState } from 'react';
import { SectionTitle, GoldDivider, MoonOrb } from './Shared';
import { speakWithFemaleVoice } from './voiceUtils';

const CARDS = [
  {
    emoji: '🌙',
    title: 'Open When You\'re Sad',
    message: `Dear Mebaye,\n\nI know the world feels heavy right now. But you are stronger than any dark day. The moon is still watching over you — and so am I. You are loved beyond what words can carry.\n\nWhen you're sad, remember: I would choose you on your hardest day, every single time.`,
    color: '#6b9ee8',
  },
  {
    emoji: '😴',
    title: 'Open When You\'re Tired',
    message: `Dear Mebaye,\n\nRest. You've earned it. You carry so much, and you do it so beautifully. You don't always have to be strong.\n\nClose your eyes. The moon will keep the stars in place while you sleep.`,
    color: '#a8e6cf',
  },
  {
    emoji: '💭',
    title: 'Open When You Miss Me',
    message: `Dear Mebaye,\n\nI miss you too. More than you know. Across every distance, every quiet moment — you are always in my thoughts.\n\nLook at the moon tonight. I'll be looking at the same one. 🌙`,
    color: '#e8c96a',
  },
  {
    emoji: '😰',
    title: 'Open When You\'re Stressed',
    message: `Dear Mebaye,\n\nBreathe. One breath at a time.\n\nYou are capable. You've overcome things that would break others. This is just another chapter — and I'll be right here while you write it.`,
    color: '#ff9f43',
  },
  {
    emoji: '💪',
    title: 'Open When You Need Motivation',
    message: `Dear Mebaye,\n\nYou were built for this. Every obstacle you've faced? You came out the other side. Stronger. Wiser.\n\nYou are the person I look up to most. Go show the world what you're made of.`,
    color: '#c9a84c',
  },
  {
    emoji: '🌊',
    title: 'Open When Life Gets Difficult',
    message: `Dear Mebaye,\n\nLife will not always be kind. But you are not alone in it. I am here — through every storm, every quiet night, every moment in between.\n\nThe moon has been there through all of it. And so have I.`,
    color: '#e88e8e',
  },
];

export default function AudioVault() {
  const [open, setOpen] = useState<number | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const speakCard = (msg: string, _idx: number) => {
    if (!('speechSynthesis' in window)) return;
    setSpeaking(true);
    speakWithFemaleVoice(
      msg.replace(/\n/g, ' '),
      { rate: 0.82, pitch: 1.1 },
      { onend: () => setSpeaking(false) }
    );
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <section className="section-wrapper" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(10,8,25,.95) 0%, var(--dark) 80%)' }}>
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <MoonOrb size={64} />
          </div>
          <SectionTitle>Voice from the Moon</SectionTitle>
          <GoldDivider />
          <p className="text-sm" style={{ color: 'rgba(232,220,190,.4)', letterSpacing: '.1em' }}>
            Open when you need to hear it most.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="gold-card overflow-hidden"
              style={{ animation: `fadeUp .7s ${i * .1}s both` }}
            >
              {/* Header */}
              <button
                className="w-full flex items-center gap-3 p-4 text-left transition-colors"
                style={{ background: open === i ? 'rgba(201,168,76,.08)' : 'transparent', border: 'none', cursor: 'pointer' }}
                onClick={() => {
                  stopSpeaking();
                  setOpen(open === i ? null : i);
                }}
              >
                <span className="text-2xl">{card.emoji}</span>
                <span className="font-serif text-sm" style={{ color: 'var(--gold-light)', flex: 1 }}>{card.title}</span>
                <span className="text-xs" style={{ color: 'rgba(201,168,76,.4)' }}>{open === i ? '▲' : '▼'}</span>
              </button>

              {/* Content */}
              {open === i && (
                <div className="px-4 pb-5 pt-1" style={{ borderTop: '1px solid rgba(201,168,76,.12)', animation: 'slideDown .3s ease both' }}>
                  <p className="font-serif italic text-sm whitespace-pre-line mb-4" style={{ color: 'rgba(232,220,190,.72)', lineHeight: 1.85, borderLeft: `2px solid ${card.color}`, paddingLeft: 12 }}>
                    {card.message}
                  </p>
                  <button
                    className="btn-outline-gold text-xs px-4 py-2 flex items-center gap-2"
                    onClick={() => speaking ? stopSpeaking() : speakCard(card.message, i)}
                  >
                    {speaking ? '⏹ Stop' : '🔊 Hear This'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
