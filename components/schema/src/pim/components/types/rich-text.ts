import { z } from 'zod';
import { MinMaxComponentConfigInputSchema, MinMaxComponentConfigSchema } from '../shared.js';

export const RichTextConfigSchema = MinMaxComponentConfigSchema;
export const RichTextConfigInputSchema = MinMaxComponentConfigInputSchema;

export type RichTextConfig = z.infer<typeof RichTextConfigSchema>;
export type RichTextConfigInput = z.infer<typeof RichTextConfigInputSchema>;

export const RichTextContentSchema = z.object({
    html: z.array(z.string()).optional(),
    json: z.array(z.any()).optional(),
    plainText: z.array(z.string()).optional(),
});
export type RichTextContent = z.infer<typeof RichTextContentSchema>;

export const RichTextContentInputSchema = z
    .object({
        html: z.array(z.string()).optional(),
        json: z.array(z.string()).optional(),
    })
    .refine(
        ({ json }) => {
            if (json) {
                try {
                    json.map((str) => JSON.parse(str));
                } catch (err) {
                    return false;
                }
            }
            return true;
        },
        {
            message: 'Invalid json provided to rich text content input',
        },
    );
export type RichTextContentInput = z.infer<typeof RichTextContentInputSchema>;
