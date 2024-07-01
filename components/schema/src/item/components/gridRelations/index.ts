import { z } from 'zod';
import { IdSchema } from '../../../shared/index.js';

export const GridRelationsContentInputSchema = z.object({
    gridIds: z.array(IdSchema).optional(),
});

export type GridRelationsContentInput = z.infer<typeof GridRelationsContentInputSchema>;
