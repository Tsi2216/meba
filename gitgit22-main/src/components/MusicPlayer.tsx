import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

interface Props {
  active: boolean;   // parent sets true at exact reveal moment
  fadeOut?: boolean; // true when grand finale section is reached
}

export default function MusicPlayer({ active, fadeOut = false }: Props) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [visible, setVisible] = useState(true);
  const [needsTap, setNeedsTap] = useState(false); // autoplay was blocked
  const [loading, setLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const fadeTimerRef = useRef<number | null>(null);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio('/music.mp3');
      a.loop = true;
      a.volume = 0;
      a.preload = 'auto';
      audioRef.current = a;
    }
    return audioRef.current;
  }, []);

  const fadeInAudio = useCallback((audio: HTMLAudioElement, target: number) => {
    audio.volume = 0;
    const step = () => {
      const next = Math.min(audio.volume + 0.05, target);
      audio.volume = next;
      if (next < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  const startMusic = useCallback(async () => {
    const audio = getAudio();
    if (playing) return;
    setLoading(true);
    setNeedsTap(false);
    try {
      await audio.play();
      fadeInAudio(audio, muted ? 0 : volume);
      setPlaying(true);
    } catch {
      // Autoplay policy blocked it — show tap prompt
      setNeedsTap(true);
    }
    setLoading(false);
  }, [playing, muted, volume, getAudio, fadeInAudio]);

  const stopMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
  }, []);

  // Start music the moment parent signals reveal is complete
  useEffect(() => {
    if (active && !startedRef.current) {
      startedRef.current = true;
      startMusic();
    }
  }, [active, startMusic]);

  // Fade out when grand finale is reached
  useEffect(() => {
    if (!fadeOut || !audioRef.current || !playing) return;
    const audio = audioRef.current;
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    fadeTimerRef.current = window.setInterval(() => {
      const next = Math.max(audio.volume - 0.012, 0);
      audio.volume = next;
      if (next === 0) {
        audio.pause();
        if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
      }
    }, 80);
    return () => { if (fadeTimerRef.current) clearInterval(fadeTimerRef.current); };
  }, [fadeOut, playing]);

  const togglePlay = () => { if (playing) { stopMusic(); } else { startMusic(); } };

  const toggleMute = () => {
    setMuted(m => {
      if (audioRef.current) audioRef.current.volume = !m ? 0 : volume;
      return !m;
    });
  };

  const handleVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current && !muted) audioRef.current.volume = v;
  };

  useEffect(() => () => {
    audioRef.current?.pause();
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* "Tap to celebrate" overlay when autoplay was blocked */}
      {needsTap && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 200, background: 'rgba(6,6,15,.85)', backdropFilter: 'blur(18px)' }}
        >
          <div className="text-center" style={{ animation: 'scaleIn .5s cubic-bezier(.16,1,.3,1) both' }}>
            <div className="text-6xl mb-6" style={{ animation: 'heartbeat 1.2s ease-in-out infinite', display: 'inline-block' }}>🎂</div>
            <h2 className="font-serif shimmer-gold mb-3" style={{ fontSize: 'clamp(1.6rem,5vw,3rem)', fontWeight: 300 }}>
              Happy Birthday Mebaye! ❤️
            </h2>
            <p className="font-serif italic mb-8" style={{ color: 'rgba(232,201,106,.6)', fontSize: '1.1rem' }}>
              From Your Chereka 🌙
            </p>
            <button
              className="btn-gold px-12 py-4"
              style={{ fontSize: '.88rem', letterSpacing: '.3em' }}
              onClick={() => {
                setNeedsTap(false);
                const audio = getAudio();
                audio.play().then(() => {
                  fadeInAudio(audio, muted ? 0 : volume);
                  setPlaying(true);
                });
              }}
            >
              🎉 Tap To Start Celebration
            </button>
          </div>
        </div>
      )}

      {/* Floating music bar */}
      <div
        className="fixed bottom-6 left-4 z-50"
        style={{
          background: 'rgba(8,8,20,.94)',
          border: `1px solid ${playing ? 'rgba(201,168,76,.5)' : 'rgba(201,168,76,.18)'}`,
          borderRadius: 8, padding: '10px 14px',
          backdropFilter: 'blur(20px)',
          boxShadow: playing
            ? '0 8px 32px rgba(0,0,0,.55), 0 0 40px rgba(201,168,76,.15)'
            : '0 4px 16px rgba(0,0,0,.4)',
          minWidth: 235,
          transition: 'border .4s ease, box-shadow .4s ease',
        }}
      >
        <div className="flex items-center gap-3">
          <Music
            size={13}
            style={{
              color: playing ? 'var(--gold)' : 'rgba(201,168,76,.3)',
              flexShrink: 0,
              animation: playing ? 'heartbeat 1.5s ease-in-out infinite' : 'none',
            }}
          />

          <div className="flex-1 min-w-0">
            <p className="font-mono truncate" style={{
              fontSize: '.67rem',
              color: playing ? 'var(--gold-light)' : 'rgba(201,168,76,.42)',
              letterSpacing: '.06em',
            }}>
              {loading ? 'Loading...' : playing ? '♪ Birthday Celebration' : 'Birthday Music'}
            </p>
            <input
              type="range" min={0} max={1} step={0.05}
              value={muted ? 0 : volume}
              onChange={e => handleVolume(Number(e.target.value))}
              style={{ width: '100%', marginTop: 4, accentColor: 'var(--gold)', height: 2, cursor: 'pointer', display: 'block' }}
            />
          </div>

          <button onClick={toggleMute} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(201,168,76,.6)', flexShrink: 0 }}>
            {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>

          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0"
            style={{
              background: playing ? 'rgba(201,168,76,.28)' : 'rgba(201,168,76,.1)',
              border: '1px solid rgba(201,168,76,.45)',
              color: 'var(--gold)', cursor: 'pointer', transition: 'background .3s ease',
            }}
          >
            {playing ? <Pause size={11} /> : <Play size={11} />}
          </button>

          <button onClick={() => setVisible(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(201,168,76,.22)', fontSize: 11, flexShrink: 0 }}>
            ✕
          </button>
        </div>
      </div>
    </>
  );
}
