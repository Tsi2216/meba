import { useState, useEffect, useCallback } from 'react';

const MESSAGES = [
  { icon: '📰', title: 'Breaking News', body: 'Mebaye is handsome today.' },
  { icon: '🚨', title: 'Alert', body: 'Chereka 🌙 misses you.' },
  { icon: '🏆', title: 'Achievement Unlocked', body: 'Best Boyfriend Ever.' },
  { icon: '🌙', title: 'Moon Alert', body: 'Someone is thinking about you.' },
  { icon: '😊', title: 'Warning', body: 'Smile detected on Mebaye.' },
  { icon: '🎂', title: 'Birthday Update', body: 'Today is YOUR day, Mebaye!' },
  { icon: '❤️', title: 'Love Report', body: 'Chereka 🌙 loves you more than yesterday.' },
  { icon: '🌟', title: 'Star Alert', body: 'You are literally the brightest star.' },
];

interface Notif {
  id: number;
  icon: string;
  title: string;
  body: string;
  exiting: boolean;
}

let nextId = 0;

export default function Notifications() {
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const msgIdx = { current: 0 };

  const dismiss = useCallback((id: number) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, exiting: true } : n));
    setTimeout(() => setNotifs(prev => prev.filter(n => n.id !== id)), 450);
  }, []);

  useEffect(() => {
    let i = 0;
    const show = () => {
      const msg = MESSAGES[i % MESSAGES.length];
      i++;
      const id = nextId++;
      const notif: Notif = { id, ...msg, exiting: false };
      setNotifs(prev => [...prev.slice(-2), notif]);
      setTimeout(() => dismiss(id), 4500);
    };

    // First one after a delay, then every 8s
    const t1 = setTimeout(show, 6000);
    const t2 = setInterval(show, 9000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, [dismiss]);

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3 pointer-events-none" style={{ maxWidth: 300 }}>
      {notifs.map(n => (
        <div
          key={n.id}
          className={`pointer-events-auto ${n.exiting ? 'notif-exit' : 'notif-enter'}`}
          style={{
            background: 'rgba(10,10,24,.95)',
            border: '1px solid rgba(201,168,76,.3)',
            borderRadius: 6,
            padding: '12px 14px',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0,0,0,.5), 0 0 20px rgba(201,168,76,.08)',
            cursor: 'pointer',
          }}
          onClick={() => dismiss(n.id)}
        >
          <div className="flex items-start gap-2">
            <span style={{ fontSize: 18, lineHeight: 1 }}>{n.icon}</span>
            <div>
              <p className="font-mono text-xs mb-0.5" style={{ color: 'var(--gold-dim)', letterSpacing: '.1em' }}>{n.title}</p>
              <p className="text-xs" style={{ color: 'rgba(232,220,190,.7)', lineHeight: 1.4 }}>{n.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
