import { z } from 'zod';
import { GenericComponentConfigInputSchema, GenericComponentConfigSchema } from '../shared.js';

export const BooleanConfigSchema = GenericComponentConfigSchema;
export const BooleanConfigInputSchema = GenericComponentConfigInputSchema;

export type BooleanConfig = z.infer<typeof BooleanConfigSchema>;
export type BooleanConfigInput = z.infer<typeof BooleanConfigInputSchema>;

export const BooleanContentSchema = z.object({
    value: z.boolean().optional(),
});
export type BooleanContent = z.infer<typeof BooleanContentSchema>;

export const BooleanContentInputSchema = z.object({
    value: z.boolean().optional(),
});
export type BooleanContentInput = z.infer<typeof BooleanContentInputSchema>;
