// Every external link on the site lives here.
// Leave a URL as '' to hide its button everywhere. Never use '#'.

export const site = {
  name: 'Tatsat Pandey',
  url: 'https://tatsatpandey.com',
  role: 'Engineer building GenAI platforms and developer tooling',
  // TODO(Tatsat): confirm the public email address for the site.
  email: 'tatsat3mutee@gmail.com',
};

export const social = {
  github: 'https://github.com/tatsat3mutee',
  linkedin: 'https://www.linkedin.com/in/tatsat-pandey/', // TODO(Tatsat): confirm
  instagram: '', // TODO(Tatsat): Instagram profile URL
  youtube: 'https://www.youtube.com/channel/UCDgjJb9UjkElHwt8Lv7sk-w',
};

export const podcast = {
  name: 'Khwaab-e-Surkhaab',
  platformName: 'Surkhaab',
  tagline: 'Kuch khwaab abhi baaki hain…',
  youtubeChannel: social.youtube,
  youtubePlaylistId: 'PLZZtHBm9HcLdBKqPOo_umAqZZsjBM7GHe',
  spotifyShowId: '1OWpKmBSf7qpdkCjpzbmFj',
  appleId: '1548229682',
  instagram: social.instagram,
};

export type Platform = { id: string; label: string; url: string };

// Order = order of buttons on /khwaab.
export const platforms: Platform[] = [
  { id: 'youtube', label: 'YouTube', url: `https://www.youtube.com/playlist?list=${podcast.youtubePlaylistId}` },
  { id: 'spotify', label: 'Spotify', url: `https://open.spotify.com/show/${podcast.spotifyShowId}` },
  { id: 'apple', label: 'Apple Podcasts', url: `https://podcasts.apple.com/in/podcast/surkhaab/id${podcast.appleId}` },
  { id: 'jiosaavn', label: 'JioSaavn', url: 'https://www.jiosaavn.com/shows/surkhaab/1/uDRhwF1FnQk_' },
  { id: 'amazon', label: 'Amazon Music', url: 'https://music.amazon.in/podcasts/dc80b6dc-e001-4e5b-9c6c-f50ab83ea90b/surkhaab' },
  { id: 'hubhopper', label: 'Hubhopper', url: '' }, // TODO(Tatsat): Hubhopper show URL
  { id: 'instagram', label: 'Instagram', url: podcast.instagram },
];

export const visiblePlatforms = platforms.filter((p) => p.url.trim() !== '');

export const research = {
  demoUrl: 'https://rca.tatsatpandey.com',
};
