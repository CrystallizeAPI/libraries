import { z } from 'zod';

// Generic Stuff
export const GenericComponentConfigSchema = z.object({
    multilingual: z.boolean().optional(),
    required: z.boolean().optional(),
    discoverable: z.boolean().optional(),
    /**
     * Discovery indexing flags. Unset means `true` everywhere.
     *
     * They narrow the QUERY SURFACE only: a component with all four off is still stored and still
     * returned in the Discovery payload. `discoverable: false` is the master switch that removes it
     * from Discovery entirely. Changes take effect at the tenant's next re-ignition, in both directions.
     */
    searchable: z.boolean().optional(),
    filterable: z.boolean().optional(),
    sortable: z.boolean().optional(),
    facetable: z.boolean().optional(),
});
export type GenericComponentConfig = z.infer<typeof GenericComponentConfigSchema>;
export const GenericComponentConfigInputSchema = GenericComponentConfigSchema;
export type GenericComponentConfigInput = z.infer<typeof GenericComponentConfigInputSchema>;

// Min Max Stuff
export const MinValueSchema = z.number().min(0).nullish();
export const MaxValueSchema = z.number().min(0).nullish();
export const MinMaxComponentConfigSchema = GenericComponentConfigSchema.extend({
    min: MinValueSchema,
    max: MaxValueSchema,
});
export type MinMaxComponentConfig = z.infer<typeof MinMaxComponentConfigSchema>;

export const MinMaxComponentConfigInputSchema = GenericComponentConfigInputSchema.extend({
    min: MinValueSchema,
    max: MaxValueSchema,
}).refine(
    ({ min, max }) => {
        if (typeof min === 'number' && typeof max === 'number' && min > max) {
            return false;
        }
        return true;
    },
    {
        error: 'Min cannot be greater than max',
        path: ['min'],
    },
);
export type MinMaxComponentConfigInput = z.infer<typeof MinMaxComponentConfigInputSchema>;
