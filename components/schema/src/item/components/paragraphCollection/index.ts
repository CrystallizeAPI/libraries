import { z } from 'zod';
import { ImageInputSchema } from '../images/index.js';
import { RichTextContentInputSchema } from '../richText/index.js';
import { SingleLineContentInputSchema } from '../singleLine/index.js';
import { VideoInputSchema } from '../videos/index.js';

export const ParagraphInputSchema = z.object({
    body: RichTextContentInputSchema.optional(),
    images: z.array(ImageInputSchema).optional(),
    title: SingleLineContentInputSchema.optional(),
    videos: z.array(VideoInputSchema).optional(),
});

export const ParagraphCollectionContentInputSchema = z.object({
    paragraphs: z.array(ParagraphInputSchema).optional(),
});

export type ParagraphInput = z.infer<typeof ParagraphInputSchema>;
export type ParagraphCollectionContentInput = z.infer<typeof ParagraphCollectionContentInputSchema>;
