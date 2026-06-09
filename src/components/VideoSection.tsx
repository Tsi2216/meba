import { useRef, useState } from 'react';
import { Maximize } from 'lucide-react';
import { SectionTitle, GoldDivider, MoonOrb } from './Shared';

import videoSrc from '../assets/lv.mp4';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const onTimeUpdate = () => {
    if (!videoRef.current) return;

    const t = videoRef.current.currentTime;
    const d = videoRef.current.duration || 1;

    setCurrentTime(t);
    setProgress((t / d) * 100);
  };

  const onLoaded = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    videoRef.current.currentTime =
      percent * (videoRef.current.duration || 0);
  };

  const openFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.requestFullscreen) el.requestFullscreen();
    else setFullscreen(true);
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return '0:00';
    return `${Math.floor(s / 60)}:${Math.floor(s % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <section
      style={{
        background: '#05040a',
        padding: '20px 0',
      }}
    >
      {/* TITLE */}
      <div className="text-center mb-4">
        <div className="flex justify-center mb-2">
          <MoonOrb size={60} />
        </div>

        <SectionTitle>
          Tonight The Moon Has A Gift For You 🌙✨
        </SectionTitle>

        <GoldDivider />
      </div>

      {/* VIDEO CONTAINER */}
      <div
        style={{
          maxWidth: 520,
          margin: '0 auto',
          borderRadius: 16,
          overflow: 'hidden',
          background: '#000',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        }}
      >
        {/* VIDEO (FULL VISIBLE - NO CROPPING) */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          preload="metadata"
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoaded}
          onEnded={() => setPlaying(false)}
          style={{
            width: '100%',
            height: 340,
            objectFit: 'contain',   // ✅ IMPORTANT FIX (SHOW FULL VIDEO)
            background: '#000',
            display: 'block',
          }}
        />

        {/* PLAY OVERLAY */}
        {!playing && (
          <div
            onClick={toggle}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.8))',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'rgba(201,168,76,0.25)',
                border: '1px solid #c9a84c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c9a84c',
                fontSize: 22,
              }}
            >
              ▶
            </div>
          </div>
        )}

        {/* CONTROLS */}
        <div
          style={{
            padding: 10,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
          }}
        >
          {/* PROGRESS BAR */}
          <div
            onClick={seek}
            style={{
              height: 5,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 5,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: '#c9a84c',
              }}
            />
          </div>

          {/* BUTTONS */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 6,
              fontSize: 12,
              color: '#c9a84c',
            }}
          >
            <button onClick={toggle}>
              {playing ? 'Pause' : 'Play'}
            </button>

            <span style={{ marginLeft: 10, opacity: 0.7 }}>
              {fmt(currentTime)} / {fmt(duration)}
            </span>

            <div style={{ flex: 1 }} />

            <button onClick={openFullscreen}>
              <Maximize size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* FULLSCREEN MODE */}
      {fullscreen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            zIndex: 999,
          }}
        >
          <button
            onClick={() => setFullscreen(false)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: '#fff',
              fontSize: 18,
            }}
          >
            ✕
          </button>

          <video
            src={videoSrc}
            controls
            autoPlay
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      )}
    </section>
  );
}