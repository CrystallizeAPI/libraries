import { z } from 'zod';

export const SingleLineContentInputSchema = z.object({
    text: z.string().optional(),
});

export type SingleLineContentInput = z.infer<typeof SingleLineContentInputSchema>;
