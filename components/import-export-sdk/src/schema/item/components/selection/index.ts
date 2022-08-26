import { z } from 'zod';

export const SelectionComponentContentInputSchema = z.object({});

export type SelectionComponentContentInput = z.infer<typeof SelectionComponentContentInputSchema>;
