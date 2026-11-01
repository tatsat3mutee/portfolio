import { getCollection, type CollectionEntry } from 'astro:content';

export type Episode = CollectionEntry<'episodes'>;

// Latest first: by date, then by episode number.
export async function getEpisodes(): Promise<Episode[]> {
  const all = await getCollection('episodes', ({ data }) => !data.draft);
  return all.sort((a, b) => {
    const d = (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0);
    return d !== 0 ? d : (b.data.number ?? 0) - (a.data.number ?? 0);
  });
}

export const ytThumb = (id: string) => `https://i.ytimg.com/vi_webp/${id}/hqdefault.webp`;
export const ytEmbed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
export const ytWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const formatDate = (d?: Date) =>
  d ? d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
