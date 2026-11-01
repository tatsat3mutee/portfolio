import { motion, useReducedMotion, type Variants } from 'motion/react';
import Lenis from 'lenis';
import { useEffect, useState, type ReactNode } from 'react';
import { Icons, type IconName } from '../lib/icons';
import { podcast, site, social } from '../data/site';
import { hasResume } from '../lib/data';

/** Smooth scrolling (off for reduced-motion users). Also handles #anchor clicks. */
export function useSmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.querySelector(a.getAttribute('href')!);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -20 });
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, [reduce]);
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({ children, delay = 0, className, as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'section' }) {
  const M = motion[as];
  return (
    <M className={className} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} transition={{ delay }}>
      {children}
    </M>
  );
}

export function Nav({ links, cta }: { links: { href: string; label: string; hideXs?: boolean }[]; cta?: { href: string; label: string } }) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const ids = links.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [links]);
  return (
    <motion.nav
      className="nav"
      aria-label="Main"
      initial={{ y: -40, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <a className="nav-logo" href="/" aria-label="Tatsat Pandey, home">t</a>
      <div className="nav-links">
        {links.map((l) => {
          const isActive = active && l.href === `#${active}`;
          return (
            <a key={l.href} href={l.href} className={`nav-link${isActive ? ' active' : ''}${l.hideXs ? ' hide-xs' : ''}`}>
              {isActive && <motion.span layoutId="nav-pill" className="pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              {l.label}
            </a>
          );
        })}
      </div>
      {cta && <a className="nav-cta" href={cta.href}>{cta.label}</a>}
    </motion.nav>
  );
}

export function Platforms({ only }: { only?: string[] }) {
  const list = podcast.platforms.filter((p) => p.url && (!only || only.includes(p.id)));
  return (
    <div className="platforms">
      {list.map((p) => {
        const Icon = Icons[p.id as IconName] ?? Icons.hubhopper;
        return (
          <a key={p.id} className="pf" href={p.url} target="_blank" rel="noopener">
            <Icon /> {p.label}
          </a>
        );
      })}
    </div>
  );
}

export function SocialLinks() {
  const items: { href: string; label: string; icon: IconName }[] = [
    { href: social.github, label: 'GitHub', icon: 'github' },
    { href: social.linkedin, label: 'LinkedIn', icon: 'linkedin' },
    { href: social.instagram, label: 'Instagram', icon: 'instagram' },
    { href: social.youtube, label: 'YouTube', icon: 'youtube' },
  ];
  return (
    <div className="socials">
      {items.filter((i) => i.href).map((i) => {
        const Icon = Icons[i.icon];
        return (
          <a key={i.label} className="icon-btn" href={i.href} target="_blank" rel="me noopener" aria-label={i.label}>
            <Icon />
          </a>
        );
      })}
    </div>
  );
}

export function ResumeButton({ className = 'btn btn-ghost' }: { className?: string }) {
  if (!hasResume) return null;
  return (
    <a className={className} href={site.resume} target="_blank" rel="noopener">
      <Icons.file /> Resume
    </a>
  );
}

export function Footer({ updated }: { updated?: string }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-row">
          <span>© {new Date().getFullYear()} Tatsat Pandey</span>
          <span>
            <a href="/">Home</a> · <a href="/khwaab/">Khwaab-e-Surkhaab</a> · <a href={`mailto:${site.email}`}>Email</a>
          </span>
          {updated && <span className="mono">Updated {updated}</span>}
        </div>
        <div className="wordmark" aria-hidden="true">Tatsat</div>
      </div>
    </footer>
  );
}

export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}
