import { useState } from 'react';
import { SectionTitle, GoldDivider } from './Shared';
import { Lock, Unlock } from 'lucide-react';

export default function SecretPassword({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [shake, setShake] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const messages = [
    'Wrong Password. Try harder, Mebaye. 😏',
    'Still Wrong. Think... who do you love most? 💭',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlocked) return;

    if (attempts < 2) {
      setShake(true);
      setTimeout(() => setShake(false), 700);
      setAttempts(a => a + 1);
      setInput('');
      return;
    }

    // 3rd attempt — always "correct"
    setUnlocked(true);
    setTimeout(() => onUnlock(), 2000);
  };

  return (
    <section className="section-wrapper" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(15,5,30,.9) 0%, var(--dark) 70%)' }}>
      <div className="relative z-10 w-full max-w-md mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          {unlocked
            ? <Unlock size={36} style={{ color: 'var(--gold)', filter: 'drop-shadow(0 0 10px var(--gold))' }} />
            : <Lock size={36} style={{ color: 'var(--gold-dim)' }} />
          }
        </div>

        <SectionTitle>Secret Password</SectionTitle>
        <GoldDivider />
        <p className="text-sm mb-8" style={{ color: 'rgba(232,220,190,.4)', letterSpacing: '.1em' }}>
          Enter Chereka 🌙's Secret Password
        </p>

        {!unlocked ? (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type the password..."
                className="w-full max-w-sm px-5 py-3 rounded text-center font-mono text-sm outline-none transition-all"
                style={{
                  background: 'rgba(201,168,76,.06)',
                  border: '1px solid rgba(201,168,76,.3)',
                  color: 'var(--gold-light)',
                  letterSpacing: '.1em',
                  animation: shake ? 'shake .6s ease both' : 'none',
                }}
                autoComplete="off"
              />
              <button type="submit" className="btn-gold px-10 py-3">
                Submit
              </button>
            </form>

            {attempts > 0 && attempts <= 2 && (
              <div
                className="mt-6 p-4 rounded"
                style={{
                  background: 'rgba(231,76,60,.08)',
                  border: '1px solid rgba(231,76,60,.3)',
                  animation: 'scaleIn .4s ease both',
                }}
              >
                <p className="text-sm" style={{ color: '#ff9f43' }}>
                  {messages[attempts - 1]}
                </p>
                {attempts === 2 && (
                  <p className="text-xs mt-2" style={{ color: 'rgba(255,159,67,.5)' }}>
                    Hint: It starts with "I LOVE..."
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <div style={{ animation: 'scaleIn .6s ease both' }}>
            <div
              className="p-8 rounded mb-4"
              style={{
                background: 'rgba(168,230,207,.07)',
                border: '1px solid rgba(168,230,207,.4)',
                boxShadow: '0 0 30px rgba(168,230,207,.12)',
              }}
            >
              <p className="font-mono text-xs mb-3" style={{ color: 'rgba(168,230,207,.6)', letterSpacing: '.3em' }}>
                ACCESS GRANTED
              </p>
              <p className="font-serif text-2xl mb-1" style={{ color: '#a8e6cf' }}>
                Correct Password:
              </p>
              <p className="font-serif text-2xl shimmer-gold">
                I LOVE MY CHEREKA 🌙❤️
              </p>
            </div>
            <p className="text-xs" style={{ color: 'rgba(201,168,76,.4)', letterSpacing: '.15em' }}>
              Unlocking next section...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
