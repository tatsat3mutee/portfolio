import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { artwork, episodes, type Episode } from '../lib/data';
import { podcast } from '../data/site';

type PlayerState = {
  episode: Episode;
  playing: boolean;
  started: boolean; // user has pressed play at least once
  time: number;
  duration: number;
  rate: number;
  toggle: (ep?: Episode) => void;
  seek: (t: number) => void;
  skip: (delta: number) => void;
  cycleRate: () => void;
  close: () => void;
  isCurrent: (ep: Episode) => boolean;
};

const Ctx = createContext<PlayerState | null>(null);
const RATES = [1, 1.25, 1.5, 0.75];

export function PlayerProvider({ children, initial }: { children: ReactNode; initial?: Episode }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [episode, setEpisode] = useState<Episode>(initial ?? episodes[0]);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(episode.duration);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const a = new Audio();
    a.preload = 'none';
    audio.current = a;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => isFinite(a.duration) && setDuration(a.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onPause);
    return () => {
      a.pause();
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onPause);
    };
  }, []);

  // lock-screen / headphone controls
  useEffect(() => {
    if (!('mediaSession' in navigator) || !started) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: episode.title,
      artist: 'Tatsat Pandey',
      album: podcast.name,
      artwork: [{ src: artwork(512), sizes: '512x512', type: 'image/jpeg' }],
    });
  }, [episode, started]);

  const toggle = useCallback(
    (ep?: Episode) => {
      const a = audio.current;
      if (!a) return;
      const next = ep ?? episode;
      if (next.slug !== episode.slug || !a.src) {
        a.src = next.audio;
        a.playbackRate = rate;
        setEpisode(next);
        setTime(0);
        setDuration(next.duration);
        setStarted(true);
        void a.play();
        return;
      }
      setStarted(true);
      if (a.paused) void a.play();
      else a.pause();
    },
    [episode, rate],
  );

  const seek = useCallback((t: number) => {
    const a = audio.current;
    if (!a) return;
    if (!a.src) {
      a.src = episode.audio;
      setStarted(true);
    }
    a.currentTime = t;
    setTime(t);
  }, [episode]);

  const skip = useCallback((d: number) => {
    const a = audio.current;
    if (a && a.src) a.currentTime = Math.max(0, Math.min((a.duration || duration) - 1, a.currentTime + d));
  }, [duration]);

  const cycleRate = useCallback(() => {
    const next = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
    setRate(next);
    if (audio.current) audio.current.playbackRate = next;
  }, [rate]);

  const close = useCallback(() => {
    audio.current?.pause();
    setStarted(false);
  }, []);

  const value = useMemo<PlayerState>(
    () => ({ episode, playing, started, time, duration, rate, toggle, seek, skip, cycleRate, close, isCurrent: (ep) => ep.slug === episode.slug }),
    [episode, playing, started, time, duration, rate, toggle, seek, skip, cycleRate, close],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePlayer() {
  const v = useContext(Ctx);
  if (!v) throw new Error('usePlayer outside PlayerProvider');
  return v;
}
