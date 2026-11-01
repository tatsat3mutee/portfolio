import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const url = z.url().optional().or(z.literal(''));

// One .md file per episode. The file name becomes the URL: /khwaab/<file-name>
const episodes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/episodes' }),
  schema: z.object({
    title: z.string(),
    // Used for "latest first". Leave out if unknown; `number` is the fallback.
    date: z.coerce.date().optional(),
    number: z.number().optional(),
    description: z.string(),
    youtubeId: z.string().optional(),
    spotifyUrl: url,
    appleUrl: url,
    jiosaavnUrl: url,
    amazonUrl: url,
    hubhopperUrl: url,
    audioUrl: url,
    // Poem text goes in the body. It is only shown when this is true.
    showPoem: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    order: z.number().default(100),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    publishedOn: z.string().optional(),
    repoUrl: url,
    liveUrl: url,
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(100),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { episodes, projects, work };
