import { z } from 'zod';
import { MinMaxComponentConfigInputSchema, MinMaxComponentConfigSchema } from '../shared.js';

// in the future that may be needed to split between config and input
const extraConfig = z.object({
    pattern: z.string().optional(),
});

export const SingleLineConfigSchema = MinMaxComponentConfigSchema.and(extraConfig);
export const SingleLineConfigInputSchema = MinMaxComponentConfigInputSchema.and(extraConfig);

export type SingleLineConfig = z.infer<typeof SingleLineConfigSchema>;
export type SingleLineConfigInput = z.infer<typeof SingleLineConfigInputSchema>;

export const SingleLineContentSchema = z.object({
    text: z.string().optional(),
});
export type SingleLineContent = z.infer<typeof SingleLineContentSchema>;

export const SingleLineContentInputSchema = z.object({
    text: z.string().optional(),
});
export type SingleLineContentInput = z.infer<typeof SingleLineContentInputSchema>;
