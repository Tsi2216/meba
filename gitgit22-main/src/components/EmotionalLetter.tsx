import { useState } from 'react';
import { SectionTitle, GoldDivider, MoonOrb } from './Shared';
import { Edit3 } from 'lucide-react';

const DEFAULT_LETTER = `To Mebaye,

I don't always know how to say the things I feel. But tonight, under this moonlight, I want you to know:

You are the person I think of when I see the moon. You are the reason I look up at the sky and smile.

On this birthday, I want you to know that every moment with you is something I hold close — every laugh, every silence, every ordinary day made extraordinary just because you were in it.

You deserve every good thing that life has to offer. And I mean that with everything in me.

Thank you for being you. Thank you for letting me love you.

Happy Birthday, Mebaye. 🌙

Forever Yours,
Your Chereka 🌙❤️`;

export default function EmotionalLetter() {
  const [letter, setLetter] = useState(DEFAULT_LETTER);
  const [editing, setEditing] = useState(false);

  return (
    <section className="section-wrapper" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(20,10,40,.9) 0%, var(--dark) 70%)' }}>
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Envelope top */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 float-anim">
            <div
              className="flex items-center justify-center"
              style={{
                width: 80,
                height: 80,
                background: 'linear-gradient(135deg, rgba(201,168,76,.15), rgba(201,168,76,.05))',
                border: '1px solid rgba(201,168,76,.4)',
                borderRadius: 4,
                boxShadow: '0 0 30px rgba(201,168,76,.12)',
                fontSize: 36,
              }}
            >
              💌
            </div>
          </div>
          <SectionTitle>A Letter From Your Chereka 🌙</SectionTitle>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--gold-dim)', letterSpacing: '.25em' }}>
            TO MEBAYE · ሰኔ 8
          </p>
          <GoldDivider />
        </div>

        {/* Letter paper */}
        <div
          className="relative rounded p-6 sm:p-10"
          style={{
            background: 'rgba(10,8,22,.9)',
            border: '1px solid rgba(201,168,76,.35)',
            boxShadow: '0 0 60px rgba(201,168,76,.08), 0 40px 80px rgba(0,0,0,.5)',
          }}
        >
          {/* Gold corners */}
          {['top-3 left-3 border-t border-l','top-3 right-3 border-t border-r','bottom-3 left-3 border-b border-l','bottom-3 right-3 border-b border-r'].map((cls, i) => (
            <div key={i} className={`absolute w-5 h-5 pointer-events-none ${cls}`} style={{ borderColor: 'rgba(201,168,76,.5)' }} />
          ))}

          {/* Edit toggle */}
          <button
            className="absolute top-4 right-4 flex items-center gap-1 text-xs btn-outline-gold px-3 py-1.5"
            onClick={() => setEditing(e => !e)}
            style={{ fontSize: '.65rem', zIndex: 10 }}
          >
            <Edit3 size={11} />
            {editing ? 'Done' : 'Edit'}
          </button>

          {editing ? (
            <textarea
              className="w-full font-serif text-base outline-none resize-none"
              style={{
                background: 'transparent',
                color: 'rgba(232,220,190,.8)',
                lineHeight: 1.9,
                border: '1px dashed rgba(201,168,76,.3)',
                padding: 12,
                borderRadius: 4,
                minHeight: 400,
                fontStyle: 'italic',
              }}
              value={letter}
              onChange={e => setLetter(e.target.value)}
            />
          ) : (
            <div className="font-serif italic text-base whitespace-pre-line" style={{ color: 'rgba(232,220,190,.78)', lineHeight: 1.9 }}>
              {letter}
            </div>
          )}

          {/* Wax seal bottom */}
          <div className="flex justify-center mt-8">
            <div
              className="flex items-center justify-center w-14 h-14 rounded-full"
              style={{
                background: 'radial-gradient(circle, #8a6a2a, #c9a84c)',
                border: '2px solid rgba(201,168,76,.5)',
                boxShadow: '0 0 20px rgba(201,168,76,.3)',
                fontSize: 24,
              }}
            >
              🌙
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
