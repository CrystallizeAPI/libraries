import { z } from 'zod';

export const NumericComponentContentInputSchema = z.object({
    number: z.number(),
    unit: z.string().optional(),
});

export type NumericComponentContentInput = z.infer<typeof NumericComponentContentInputSchema>;
