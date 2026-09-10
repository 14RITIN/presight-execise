import { z } from 'zod';

const commaSeparatedArray = z
  .string()
  .optional()
  .transform((value) =>
    value
      ? value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      : [],
  );

export const userQuerySchema = z.object({
  q: z.string().trim().optional(),

  nationalities: commaSeparatedArray,
  hobbies: commaSeparatedArray,

  sort: z
    .enum(['first_name', 'last_name', 'age', 'nationality'])
    .default('first_name'),

  direction: z.enum(['asc', 'desc']).default('asc'),

  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(30),
});

export type ParsedUserQuery = z.infer<typeof userQuerySchema>;