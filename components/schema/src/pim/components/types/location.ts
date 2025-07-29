import { z } from 'zod';
import { GenericComponentConfigInputSchema, GenericComponentConfigSchema } from '../shared.js';

export const LocationConfigSchema = GenericComponentConfigSchema;
export const LocationConfigInputSchema = GenericComponentConfigInputSchema;

export type LocationConfig = z.infer<typeof LocationConfigSchema>;
export type LocationConfigInput = z.infer<typeof LocationConfigInputSchema>;

export const LocationContentSchema = z.object({
    lat: z.number().nullish(),
    long: z.number().nullish(),
});
export type LocationContent = z.infer<typeof LocationContentSchema>;

export const LocationContentInputSchema = z.object({
    lat: z.number().optional(),
    long: z.number().optional(),
});
export type LocationContentInput = z.infer<typeof LocationContentInputSchema>;
