import { z } from 'zod';
import { IdSchema } from '../../../shared/index.js';

export const ItemRelationsContentInputSchema = z.object({
    itemIds: z.array(IdSchema).optional(),
    skus: z.array(z.string()).optional(),
});

export type ItemRelationsContentInput = z.infer<typeof ItemRelationsContentInputSchema>;
