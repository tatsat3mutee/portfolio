import { siSpotify, siYoutube, siApplepodcasts, siInstagram, siGithub, siGmail } from 'simple-icons';
import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const brand = (path: string) => (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d={path} /></svg>
);
const line = (children: React.ReactNode) => (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>{children}</svg>
);

export const Icons = {
  spotify: brand(siSpotify.path),
  youtube: brand(siYoutube.path),
  apple: brand(siApplepodcasts.path),
  instagram: brand(siInstagram.path),
  github: brand(siGithub.path),
  mail: brand(siGmail.path),
  linkedin: (p: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  // generic marks for platforms without a free brand icon
  jiosaavn: line(<><circle cx="12" cy="12" r="9" /><path d="M9 15.5V9l6 3.2-6 3.3z" fill="currentColor" stroke="none" /></>),
  amazon: line(<><path d="M4 15c4.5 3 11.5 3 16 0" /><path d="M17 13.5l3 1.5-1.2 3" /><path d="M9 4v7a2 2 0 1 1-2-2" /><path d="M9 4l6-1.5V9a2 2 0 1 1-2-2" /></>),
  hubhopper: line(<><path d="M3 14v-2a9 9 0 0 1 18 0v2" /><rect x="3" y="14" width="4" height="7" rx="1.5" /><rect x="17" y="14" width="4" height="7" rx="1.5" /></>),
  play: (p: P) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" /></svg>,
  pause: (p: P) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><rect x="5.5" y="4" width="4.5" height="16" rx="1.3" /><rect x="14" y="4" width="4.5" height="16" rx="1.3" /></svg>,
  back10: line(<><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /><text x="12" y="15.5" fontSize="7" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="sans-serif">10</text></>),
  fwd30: line(<><path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" /><text x="12" y="15.5" fontSize="7" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="sans-serif">30</text></>),
  arrowUpRight: line(<><path d="M7 17L17 7" /><path d="M8 7h9v9" /></>),
  arrowDown: line(<><path d="M12 5v14" /><path d="M6 13l6 6 6-6" /></>),
  arrowRight: line(<><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>),
  file: line(<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" /></>),
  copy: line(<><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>),
  check: line(<path d="M5 12.5l4.5 4.5L19 7" />),
  close: line(<><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>),
  trophy: line(<><path d="M8 21h8M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" /></>),
  agents: line(<><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M12 7.5v4M12 11.5l-5.5 4.5M12 11.5l5.5 4.5" /></>),
  retrieval: line(<><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5.5 5.5" /><path d="M8 10.5h5M10.5 8v5" /></>),
  llmops: line(<><path d="M4 6h10M4 12h16M4 18h7" /><circle cx="17" cy="6" r="2.2" /><circle cx="14" cy="18" r="2.2" /></>),
  devtools: line(<><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M7 10l3 2.5L7 15" /><path d="M12.5 15H17" /></>),
  pulse: line(<path d="M3 12h4l2.5-6 4 12 2.5-6H21" />),
  star: (p: P) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" /></svg>,
};

export type IconName = keyof typeof Icons;
