import { z } from 'zod';

export const userQuerySchema = z.object({
  q: z.string().trim().optional(),
  nationalities: z.string().optional(),
  hobbies: z.string().optional(),

  sort: z
    .enum(['first_name', 'last_name', 'age', 'nationality'])
    .default('first_name'),

  direction: z.enum(['asc', 'desc']).default('asc'),

  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(30),
});