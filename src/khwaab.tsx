import './fonts';
import { StrictMode, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'motion/react';
import { PlayerProvider, usePlayer } from './player/PlayerContext';
import { FeaturedPlayer, MiniPlayer, PlayButton } from './player/Player';
import { Footer, Grain, Nav, Platforms, Reveal, SocialLinks, useSmoothScroll } from './components/common';
import { Icons } from './lib/icons';
import { artwork, episodeCount, episodes, fmtDate, fmtTime, type Episode } from './lib/data';
import { podcast } from './data/site';

const ease = [0.22, 1, 0.36, 1] as const;

// /khwaab/?ep=<slug> opens a specific episode in the player
const fromUrl = new URLSearchParams(location.search).get('ep');
const initial = episodes.find((e) => e.slug === fromUrl) ?? episodes[0];

function Hero({ playerRef }: { playerRef: React.RefObject<HTMLDivElement> }) {
  const p = usePlayer();
  return (
    <header className={`k-hero${p.playing ? ' playing' : ''}`}>
      <div className="k-bg" style={{ backgroundImage: `url(${artwork(400)})` }} aria-hidden="true" />
      <div className="wrap k-grid">
        <motion.div className="pod-art" initial={{ opacity: 0, scale: 0.92, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.2, ease }}>
          <span className="disc" />
          <img src={artwork(1000)} alt="Khwaab-e-Surkhaab cover art" width={480} height={480} fetchPriority="high" />
        </motion.div>
        <div ref={playerRef}>
          <motion.span className="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Hindi poetry podcast · {episodeCount}+ episodes
          </motion.span>
          <motion.h1 className="k-title-hi" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1, ease }}>
            {podcast.hindi}
          </motion.h1>
          <motion.p className="k-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease }}>
            {podcast.name}
          </motion.p>
          <motion.p className="k-tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>
            {podcast.tagline} Hindi poems, written and narrated by Tatsat Pandey.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 1, ease }}>
            <FeaturedPlayer label={initial === episodes[0] ? 'Latest episode' : 'Episode'} />
            <Platforms />
          </motion.div>
        </div>
      </div>
    </header>
  );
}

function Watch() {
  const [on, setOn] = useState(false);
  const id = podcast.latestVideoId;
  if (!id) return null;
  return (
    <section className="k-section" id="watch">
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <span className="label">Watch</span>
            <h2 className="section-title">{episodes[0].title} <span className="serif grad-text">on YouTube</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a className="btn btn-ghost" href={podcast.platforms.find((p) => p.id === 'youtube')!.url} target="_blank" rel="noopener">
              <Icons.youtube /> Full playlist
            </a>
          </Reveal>
        </div>
        <Reveal>
          {on ? (
            <div className="k-watch">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                title={`${episodes[0].title} on YouTube`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          ) : (
            <a className="k-watch" href={`https://www.youtube.com/watch?v=${id}`} onClick={(e) => { e.preventDefault(); setOn(true); }}>
              <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" loading="lazy" onError={(e) => ((e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`))} />
              <span className="play-btn"><Icons.play style={{ marginLeft: 4 }} /></span>
              <span className="cap">Watch “{episodes[0].title}”</span>
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function EpisodeRow({ ep }: { ep: Episode }) {
  const p = usePlayer();
  const [open, setOpen] = useState(ep.slug === fromUrl);
  return (
    <li className="k-ep" id={ep.slug}>
      <div className={`k-ep-row ep${p.isCurrent(ep) ? ' current' : ''}`}>
        <PlayButton ep={ep} size="sm" ghost />
        <div className="ep-main">
          <b>{ep.title}</b>
          <span>{[ep.subtitle, ep.number ? `Episode ${ep.number}` : null, fmtDate(ep.date)].filter(Boolean).join(' · ')}</span>
        </div>
        <span className="ep-dur">{fmtTime(ep.duration)}</span>
        {ep.description && (
          <button className="more-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            {open ? 'Less' : 'About'}
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} style={{ overflow: 'hidden' }}>
            <p className="k-ep-desc">{ep.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function App() {
  useSmoothScroll();
  const playerRef = useRef<HTMLDivElement>(null);
  return (
    <PlayerProvider initial={initial}>
      <Grain />
      <Nav
        links={[
          { href: '/', label: 'Home' },
          { href: '#episodes', label: 'Episodes' },
          { href: '#watch', label: 'Watch' },
        ]}
        cta={{ href: '#about', label: 'About' }}
      />
      <main>
        <Hero playerRef={playerRef} />
        <Watch />
        <section className="k-section" id="episodes">
          <div className="wrap">
            <div className="section-head">
              <Reveal>
                <span className="label">All episodes</span>
                <h2 className="section-title">Every <span className="serif grad-text">khwaab</span>, so far</h2>
              </Reveal>
            </div>
            <ul className="k-eps">
              {episodes.map((ep) => <EpisodeRow key={ep.slug} ep={ep} />)}
            </ul>
          </div>
        </section>
        <section className="k-section" id="about">
          <div className="wrap" style={{ maxWidth: 820 }}>
            <Reveal>
              <span className="label">About the show</span>
              <p className="about-big" style={{ marginTop: 18 }}>
                Poems about the things we <span className="serif grad-text">keep to ourselves</span>, read slowly, with a little music.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="about-text" style={{ marginTop: 24 }}>
                <p>
                  {podcast.name} is a Hindi poetry podcast written and narrated by Tatsat Pandey. After almost two years away,
                  the show came back in November 2026 with “Agar Tum…”.
                </p>
              </div>
              <SocialLinks />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <MiniPlayer watch={playerRef} />
    </PlayerProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
