import { useRef } from 'react';
import { PlayerProvider } from '../player/PlayerContext';
import { MiniPlayer } from '../player/Player';
import { Footer, Grain, Nav, useSmoothScroll } from '../components/common';
import { About, Contact, Hero, Marquee, Podcast, Work } from '../components/Home';
import episodesData from '../data/episodes.json';
import { fmtDate } from '../lib/data';

export function HomeApp() {
  useSmoothScroll();
  const playerRef = useRef<HTMLDivElement>(null);
  return (
    <PlayerProvider>
      <a className="skip" href="#work">Skip to content</a>
      <Grain />
      <Nav
        links={[
          { href: '#work', label: 'Work' },
          { href: '#podcast', label: 'Poetry' },
          { href: '#about', label: 'About', hideXs: true },
        ]}
        cta={{ href: '#contact', label: 'Contact' }}
      />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Podcast playerRef={playerRef} />
        <About />
        <Contact />
      </main>
      <Footer updated={fmtDate(episodesData.fetchedAt)} />
      <MiniPlayer watch={playerRef} />
    </PlayerProvider>
  );
}
