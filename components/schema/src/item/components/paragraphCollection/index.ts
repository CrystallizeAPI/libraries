import { z } from 'zod';
import { ImageInputSchema } from '../images';
import { RichTextContentInputSchema } from '../richText';
import { SingleLineContentInputSchema } from '../singleLine';
import { VideoInputSchema } from '../videos';

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
