import { z } from 'zod';
import { KeyValuePairInputSchema } from '../../../shared/index.js';
import { RichTextContentInputSchema } from '../richText/index.js';

export const ImageInputSchema = z.object({
    key: z.string().min(1),
    caption: RichTextContentInputSchema.optional(),
    altText: z.string().optional(),
    mimeType: z.string().optional(),
    meta: z.array(KeyValuePairInputSchema).optional(),
});

export type ImageInput = z.infer<typeof ImageInputSchema>;
