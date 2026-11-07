import { useRef } from 'react';
import { PlayerProvider } from '../player/PlayerContext';
import { MiniPlayer } from '../player/Player';
import { Footer, Grain, Nav, useSmoothScroll } from '../components/common';
import { About, Contact, Hero, Marquee, Podcast, Work } from '../components/Home';
import { Expertise, UnderTheHood } from '../components/Tech';
import episodesData from '../data/episodes.json';
import { fmtDate } from '../lib/data';

export function HomeApp() {
  useSmoothScroll();
  const playerRef = useRef<HTMLDivElement>(null);
  return (
    <PlayerProvider>
      <a className="skip" href="#expertise">Skip to content</a>
      <Grain />
      <Nav
        links={[
          { href: '#expertise', label: 'Skills', hideXs: true },
          { href: '#work', label: 'Work' },
          { href: '#arch', label: 'Systems', hideXs: true },
          { href: '#podcast', label: 'Poetry' },
        ]}
        cta={{ href: '#contact', label: 'Contact' }}
      />
      <main>
        <Hero />
        <Marquee />
        <Expertise />
        <Work />
        <UnderTheHood />
        <Podcast playerRef={playerRef} />
        <About />
        <Contact />
      </main>
      <Footer updated={fmtDate(episodesData.fetchedAt)} />
      <MiniPlayer watch={playerRef} />
    </PlayerProvider>
  );
}
