import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

// ✅ FIXED AUDIO FILE
import voiceAudio from '../assets/voice.mp3';

function fmt(s: number) {
  if (!isFinite(s) || isNaN(s)) return '0:00';
  return `${Math.floor(s / 60)}:${Math.floor(s % 60)
    .toString()
    .padStart(2, '0')}`;
}

export default function SpecialAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play(); // IMPORTANT: wait for browser permission
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch (err) {
      console.log("❌ Audio failed to play:", err);
      setPlaying(false);
    }
  };

  return (
    <section style={{ textAlign: 'center', padding: '10px 0' }}>

      {/* AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        src={voiceAudio}
        preload="auto"
        onTimeUpdate={() => {
          if (!audioRef.current) return;
          setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onEnded={() => setPlaying(false)}
      />

      {/* INLINE SIMPLE UI (NO BOX) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          fontFamily: 'serif',
          color: '#e8d4a8',
          fontSize: '14px',
        }}
      >

        {/* PLAY BUTTON */}
        <button
          onClick={toggle}
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            border: '1px solid rgba(201,168,76,.7)',
            background: 'transparent',
            color: '#c9a84c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>

        {/* TEXT (UNCHANGED) */}
        <span>A Special Voice From Cherekay 🌙❤️</span>

        {/* TIME */}
        <span style={{ fontSize: '12px', opacity: 0.6 }}>
          {fmt(currentTime)} / {fmt(duration)}
        </span>

      </div>
    </section>
  );
}