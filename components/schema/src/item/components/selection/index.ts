import { z } from 'zod';

export const SelectionComponentContentInputSchema = z.object({
    keys: z.array(z.string()),
});

export type SelectionComponentContentInput = z.infer<typeof SelectionComponentContentInputSchema>;
