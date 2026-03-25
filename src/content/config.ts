import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        category: z.enum(['Backend', 'Frontend', 'Tools', 'Android', 'Startup', 'Life']),
        tags: z.array(z.string()),
        cover: z.string().optional(),
        draft: z.boolean().default(false),
        readingTime: z.string().optional(),
        featured: z.boolean().optional().default(false),
    }),
});

export const collections = { blog };
