import { z } from 'zod';
import {
    MaxValueSchema,
    MinMaxComponentConfigInputSchema,
    MinMaxComponentConfigSchema,
    MinValueSchema,
} from '../shared.js';
import { IdSchema } from '../../../shared/index.js';

// in the future that may be needed to split between config and input
const extraConfig = z.object({
    acceptedShapeIdentifiers: z.array(z.string()).optional(),
    quickSelect: z
        .object({
            folders: z.array(z.object({ folderId: IdSchema })).optional(),
        })
        .optional(),
});

export const ItemRelationsConfigSchema = MinMaxComponentConfigSchema.omit({
    min: true,
    max: true,
}).extend(extraConfig.shape);

export const ItemRelationsConfigInputSchema = MinMaxComponentConfigInputSchema.and(
    z
        .object({
            minItems: MinValueSchema,
            maxItems: MaxValueSchema,
            minSkus: MinValueSchema,
            maxSkus: MaxValueSchema,
        })
        .extend(extraConfig.shape),
).refine(
    ({ min, max, minItems, maxItems, minSkus, maxSkus }) => {
        if (typeof min === 'number' && typeof max === 'number') {
            if (min === max) {
                return true;
            }
            if (min > max) {
                return false;
            }
        }
        if (typeof minItems === 'number' && typeof maxItems === 'number') {
            if (minItems === maxItems) {
                return true;
            }
            if (minItems > maxItems) {
                return false;
            }
        }
        if (typeof minSkus === 'number' && typeof maxSkus === 'number') {
            if (minSkus === maxSkus) {
                return true;
            }
            if (minSkus > maxSkus) {
                return false;
            }
        }
        return true;
    },
    {
        error: 'Min cannot be greater than max',
        path: ['min'],
    },
);

export type ItemRelationsConfig = z.infer<typeof ItemRelationsConfigSchema>;
export type ItemRelationsConfigInput = z.infer<typeof ItemRelationsConfigInputSchema>;

export const ItemRelationsContentSchema = z.object({
    itemIds: z.array(IdSchema).optional(),
    // skus: z.array(z.string()).optional() // @todo missing in Core Next
    // items: @todo
    // productVariants: @todo
});
export type ItemRelationsContent = z.infer<typeof ItemRelationsContentSchema>;

export const ItemRelationsContentInputSchema = z.object({
    itemIds: z.array(IdSchema).optional(),
    skus: z.array(z.string()).optional(),
});
export type ItemRelationsContentInput = z.infer<typeof ItemRelationsContentInputSchema>;
