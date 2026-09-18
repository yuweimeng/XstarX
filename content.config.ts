import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const works = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/works' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    category: z.enum(['writing', 'visual', 'field-note', 'note']),
    year: z.number(),
    issue: z.string().default('00'),
    order: z.number().default(999),
    featured: z.boolean().default(false),
    description: z.string(),
    location: z.string().optional(),
    medium: z.string().optional(),
    image: z.string().optional(),
    placeholder: z.boolean().default(false),
    accent: z.enum(['vermilion', 'ink', 'olive']).default('ink')
  })
});

export const collections = { works };
