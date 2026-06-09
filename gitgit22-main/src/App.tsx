import { useState, useEffect, useRef } from 'react';
import StarField from './components/StarField';
import Nav from './components/Nav';
import Notifications from './components/Notifications';
import MusicPlayer from './components/MusicPlayer';
import OpeningScene from './components/OpeningScene';
import VideoSection from './components/VideoSection';
import SpecialAudio from './components/SpecialAudio';
import MoonMessage from './components/MoonMessage';
import FBIPage from './components/FBIPage';
import LoveStory from './components/LoveStory';
import CompatibilityScan from './components/CompatibilityScan';
import DoNotClick from './components/DoNotClick';
import RewardWheel from './components/RewardWheel';
import SecretPassword from './components/SecretPassword';
import HackerPage from './components/HackerPage';
import AudioVault from './components/AudioVault';
import RelationshipStats from './components/RelationshipStats';
import FakeGiftBox from './components/FakeGiftBox';
import EmotionalLetter from './components/EmotionalLetter';
import GrandFinale from './components/GrandFinale';
import MoonPhoto from './components/MoonPhoto';
import { SectionTitle, GoldDivider } from './components/Shared';

function MoonPhotoSection() {
  return (
    <section className="section-wrapper" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(20,12,40,.96) 0%, var(--dark) 80%)' }}>
      <div className="relative z-10 w-full max-w-xl mx-auto text-center">
        <SectionTitle>Written in the Moon</SectionTitle>
        <GoldDivider />
        <p className="text-sm mb-10" style={{ color: 'rgba(232,220,190,.4)', letterSpacing: '.1em' }}>
          Your faces, softly engraved into moonlight. 🌙
        </p>
        <div className="flex justify-center mb-8">
          <MoonPhoto size={260} pulse={true} />
        </div>
        <p className="font-serif italic text-lg" style={{ color: 'rgba(232,201,106,.55)', lineHeight: 1.8 }}>
          "Even the moon chose to carry your story."
        </p>
        <p className="text-xs mt-3" style={{ color: 'rgba(201,168,76,.35)', letterSpacing: '.2em' }}>
          — Chereka 🌙
        </p>
      </div>
    </section>
  );
}

const SECTIONS = [
  { id: 'video',      label: 'Message',    emoji: '🎥' },
  { id: 'audio',      label: 'Voice',      emoji: '🎙️' },
  { id: 'moonphoto',  label: 'Moon',       emoji: '🌙' },
  { id: 'moonmsg',    label: 'Moon Voice', emoji: '🗣️' },
  { id: 'fbi',        label: 'Report',     emoji: '🔍' },
  { id: 'series',     label: 'Love Story', emoji: '🎬' },
  { id: 'compat',     label: 'Compat',     emoji: '💞' },
  { id: 'btn',        label: 'Button',     emoji: '🔴' },
  { id: 'wheel',      label: 'Wheel',      emoji: '🎡' },
  { id: 'pass',       label: 'Password',   emoji: '🔐' },
  { id: 'hacker',     label: 'Hacker',     emoji: '💻' },
  { id: 'vault',      label: 'Open When',  emoji: '🎵' },
  { id: 'stats',      label: 'Stats',      emoji: '📊' },
  { id: 'gift',       label: 'Gift',       emoji: '🎁' },
  { id: 'letter',     label: 'Letter',     emoji: '💌' },
  { id: 'finale',     label: 'Finale',     emoji: '🎆' },
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [musicActive, setMusicActive] = useState(false);
  const [currentSection, setCurrentSection] = useState('video');
  const [atFinale, setAtFinale] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollTo = (id: string) => {
    setCurrentSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOpeningDone = () => {
    setStarted(true);
    setMusicActive(true); // music starts exactly when reveal completes
  };

  useEffect(() => {
    if (!started) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && e.intersectionRatio >= .3) {
            setCurrentSection(e.target.id);
            if (e.target.id === 'finale') setAtFinale(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [started]);

  if (!started) {
    return (
      <>
        <StarField />
        <OpeningScene onDone={handleOpeningDone} />
      </>
    );
  }

  const ref = (id: string) => (el: HTMLDivElement | null) => { sectionRefs.current[id] = el; };

  return (
    <div style={{ background: 'var(--dark)' }}>
      <StarField />
      <Nav sections={SECTIONS} current={currentSection} onNavigate={scrollTo} />
      <Notifications />
      <MusicPlayer active={musicActive} fadeOut={atFinale} />

      <div style={{ paddingTop: '52px' }}>
        <div id="video"     ref={ref('video')}><VideoSection /></div>
        <div id="audio"     ref={ref('audio')}><SpecialAudio /></div>
        <div id="moonphoto" ref={ref('moonphoto')}><MoonPhotoSection /></div>
        <div id="moonmsg"   ref={ref('moonmsg')}><MoonMessage /></div>
        <div id="fbi"       ref={ref('fbi')}><FBIPage /></div>
        <div id="series"    ref={ref('series')}><LoveStory /></div>
        <div id="compat"    ref={ref('compat')}><CompatibilityScan /></div>
        <div id="btn"       ref={ref('btn')}><DoNotClick /></div>
        <div id="wheel"     ref={ref('wheel')}><RewardWheel /></div>
        <div id="pass"      ref={ref('pass')}>
          <SecretPassword onUnlock={() => setTimeout(() => scrollTo('hacker'), 2500)} />
        </div>
        <div id="hacker"    ref={ref('hacker')}><HackerPage /></div>
        <div id="vault"     ref={ref('vault')}><AudioVault /></div>
        <div id="stats"     ref={ref('stats')}><RelationshipStats /></div>
        <div id="gift"      ref={ref('gift')}>
          <FakeGiftBox onFinale={() => scrollTo('finale')} />
        </div>
        <div id="letter"    ref={ref('letter')}><EmotionalLetter /></div>
        <div id="finale"    ref={ref('finale')}><GrandFinale /></div>
      </div>
    </div>
  );
}
