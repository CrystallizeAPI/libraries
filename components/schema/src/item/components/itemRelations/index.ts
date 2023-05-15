import { z } from 'zod';
import { IdSchema } from '../../../shared';

export const ItemRelationsContentInputSchema = z.object({
    itemIds: z.array(IdSchema).optional(),
});

export type ItemRelationsContentInput = z.infer<typeof ItemRelationsContentInputSchema>;
