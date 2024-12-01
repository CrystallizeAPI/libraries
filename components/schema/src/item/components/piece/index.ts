import { z } from 'zod';
import { ComponentInputSchema } from '../index.js';

export const PieceContentInputSchema = z.object({
    identifier: z.string().min(1),
    components: z.array(ComponentInputSchema).optional(),
});

export type PieceContentInput = z.infer<typeof PieceContentInputSchema>;
