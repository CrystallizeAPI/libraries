import { z } from 'zod';
import { GenericComponentConfigInputSchema, GenericComponentConfigSchema } from '../shared.js';

// in the future that may be needed to split between config and input
const extraConfig = z.object({
    decimalPlaces: z.number().positive().optional(),
    units: z.array(z.string()).optional(),
});

export const NumericConfigSchema = GenericComponentConfigSchema.merge(extraConfig);
export const NumericConfigInputSchema = GenericComponentConfigInputSchema.merge(extraConfig);

export type NumericConfig = z.infer<typeof NumericConfigSchema>;
export type NumericConfigInput = z.infer<typeof NumericConfigInputSchema>;

export const NumericContentSchema = z.object({
    number: z.number(),
    unit: z.string().optional(),
});
export type NumericContent = z.infer<typeof NumericContentSchema>;

export const NumericContentInputSchema = z.object({
    number: z.number(),
    unit: z.string().optional(),
});
export type NumericContentInput = z.infer<typeof NumericContentInputSchema>;
