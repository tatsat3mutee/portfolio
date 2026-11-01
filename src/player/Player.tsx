import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState, type RefObject } from 'react';
import { Icons } from '../lib/icons';
import { artwork, fmtDate, fmtTime, type Episode } from '../lib/data';
import { usePlayer } from './PlayerContext';

export function Equalizer() {
  return (
    <span className="eq" aria-hidden="true">
      <i /><i /><i /><i /><i />
    </span>
  );
}

export function PlayButton({ ep, size = 'lg', ghost = false }: { ep?: Episode; size?: 'lg' | 'sm'; ghost?: boolean }) {
  const p = usePlayer();
  const target = ep ?? p.episode;
  const active = p.isCurrent(target) && p.playing;
  return (
    <button
      className={`play-btn${size === 'sm' ? ' sm' : ''}${ghost && !active ? ' ghost' : ''}`}
      onClick={() => p.toggle(target)}
      aria-label={`${active ? 'Pause' : 'Play'} ${target.title}`}
    >
      {active ? <Icons.pause /> : <Icons.play style={{ marginLeft: 3 }} />}
    </button>
  );
}

/** The big player card: title, scrubber, skip, speed. */
export function FeaturedPlayer({ label = 'Latest episode' }: { label?: string }) {
  const p = usePlayer();
  const ep = p.episode;
  const pct = p.duration ? (p.time / p.duration) * 100 : 0;
  return (
    <div className={`player${p.playing ? ' playing' : ''}`}>
      <div className="player-top">
        <PlayButton />
        <div className="player-info">
          <small>{p.started ? (p.playing ? 'Now playing' : 'Paused') : label}</small>
          <p className="ttl">{ep.title}</p>
          <p>{[ep.subtitle, fmtDate(ep.date)].filter(Boolean).join(' · ')}</p>
        </div>
        <Equalizer />
      </div>
      <div className="scrub">
        <span>{fmtTime(p.time)}</span>
        <input
          type="range"
          min={0}
          max={Math.max(1, Math.floor(p.duration))}
          step={1}
          value={Math.floor(p.time)}
          onChange={(e) => p.seek(Number(e.target.value))}
          style={{ ['--p' as string]: `${pct}%` }}
          aria-label="Seek"
        />
        <span>{fmtTime(p.duration)}</span>
      </div>
      <div className="player-ctrls">
        <div className="group">
          <button className="ctrl" onClick={() => p.skip(-10)} aria-label="Back 10 seconds"><Icons.back10 /></button>
          <button className="ctrl" onClick={() => p.skip(30)} aria-label="Forward 30 seconds"><Icons.fwd30 /></button>
        </div>
        <button className="ctrl" onClick={p.cycleRate} aria-label={`${p.rate}× playback speed`}>{p.rate}×</button>
      </div>
    </div>
  );
}

/** Floating pill that appears while audio is active and the big player is off screen. */
export function MiniPlayer({ watch }: { watch: RefObject<HTMLElement> }) {
  const p = usePlayer();
  const [offscreen, setOffscreen] = useState(true);
  useEffect(() => {
    const el = watch.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [watch]);
  const show = p.started && offscreen;
  const pct = p.duration ? (p.time / p.duration) * 100 : 0;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`mini${p.playing ? ' playing' : ''}`}
          initial={{ y: 90, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 90, opacity: 0, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          role="region"
          aria-label="Audio player"
        >
          <img src={artwork(120)} alt="" width={48} height={48} />
          <div className="t">
            <b>{p.episode.title}</b>
            <span>{fmtTime(p.time)} / {fmtTime(p.duration)}</span>
          </div>
          <Equalizer />
          <PlayButton size="sm" />
          <button className="x" onClick={p.close} aria-label="Close player"><Icons.close /></button>
          <span className="bar" style={{ width: `${pct}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
