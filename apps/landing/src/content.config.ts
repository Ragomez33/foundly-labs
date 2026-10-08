import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pricing = defineCollection({
  loader: glob({ pattern: '**/*.{md,json}', base: './src/content/pricing' }),
  schema: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    monthlyPriceCents: z.number().int().nonnegative(),
    annualPriceCents: z.number().int().nonnegative(),
    features: z.array(z.string()),
    badge: z.string().optional(),
    highlighted: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.{md,json}', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
  }),
});

const features = defineCollection({
  loader: glob({ pattern: '**/*.{md,json}', base: './src/content/features' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    icon: z.string().optional(),
    order: z.number().int().nonnegative().optional(),
  }),
});

export const collections = { pricing, faqs, features };
