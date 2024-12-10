import { z } from 'zod';

// Generic Stuff
export const GenericComponentConfigSchema = z.object({
    multilingual: z.boolean().optional(),
    required: z.boolean().optional(),
    discoverable: z.boolean().optional(),
});
export type GenericComponentConfig = z.infer<typeof GenericComponentConfigSchema>;
export const GenericComponentConfigInputSchema = GenericComponentConfigSchema;
export type GenericComponentConfigInput = z.infer<typeof GenericComponentConfigInputSchema>;

// Min Max Stuff
export const MinValueSchema = z.number().min(0).nullable().optional();
export const MaxValueSchema = z.number().min(0).nullable().optional();
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
        message: 'Min cannot be greater than max',
        path: ['min'],
    },
);
export type MinMaxComponentConfigInput = z.infer<typeof MinMaxComponentConfigInputSchema>;
