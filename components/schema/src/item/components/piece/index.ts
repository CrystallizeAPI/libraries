import { z } from 'zod';
import { ComponentInputSchema } from '..';

export const PieceContentInputSchema = z.object({
    components: z.array(ComponentInputSchema).optional(),
});

export type PieceContentInput = z.infer<typeof PieceContentInputSchema>;
