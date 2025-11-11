import { z } from 'zod';
import { MinMaxComponentConfigInputSchema, MinMaxComponentConfigSchema } from '../shared';

export const RichTextConfigSchema = MinMaxComponentConfigSchema;
export const RichTextConfigInputSchema = MinMaxComponentConfigInputSchema;

export type RichTextConfig = z.infer<typeof RichTextConfigSchema>;
export type RichTextConfigInput = z.infer<typeof RichTextConfigInputSchema>;

export const RichTextContentSchema = z.object({
    html: z.array(z.string()).nullish(),
    json: z.array(z.any()).nullish(),
    plainText: z.array(z.string()).nullish(),
});
export type RichTextContent = z.infer<typeof RichTextContentSchema>;

export const RichTextContentInputSchema = z.object({
    html: z.array(z.string()).optional(),
    json: z.array(z.any()).optional(),
});
export type RichTextContentInput = z.infer<typeof RichTextContentInputSchema>;
