import { z } from 'zod';

export const BooleanContentInputSchema = z.object({
    value: z.boolean(),
});

export type BooleanContentInput = z.infer<typeof BooleanContentInputSchema>;
