import { z } from 'zod';
import { GenericComponentConfigInputSchema, GenericComponentConfigSchema } from '../shared.js';
import { RichTextContentInputSchema, RichTextContentSchema } from './rich-text.js';
import { ImageContentInputSchema, ImageContentSchema } from './images.js';
import { SingleLineContentInputSchema, SingleLineContentSchema } from './single-line.js';
import { VideoContentInputSchema, VideoContentSchema, VideosContentInputSchema } from './videos.js';

export const ParagraphCollectionConfigSchema = GenericComponentConfigSchema.omit({
    multilingual: true,
}).extend({
    multilingual: z.enum(['body', 'images', 'title', 'videos', 'structure']),
});

export const ParagraphCollectionConfigInputSchema = GenericComponentConfigInputSchema.omit({
    multilingual: true,
}).extend({
    multilingual: z.array(z.enum(['body', 'images', 'title', 'videos', 'structure'])),
});

export type ParagraphCollectionConfig = z.infer<typeof ParagraphCollectionConfigSchema>;
export type ParagraphCollectionConfigInput = z.infer<typeof ParagraphCollectionConfigInputSchema>;

export const ParagraphContentSchema = z.object({
    title: SingleLineContentSchema.nullish(),
    body: RichTextContentSchema.nullish(),
    images: z.array(ImageContentSchema).nullish(),
    videos: z.array(VideoContentSchema).nullish(),
});

export const ParagraphContentInputSchema = z.object({
    body: RichTextContentInputSchema.optional(),
    images: z.array(ImageContentInputSchema).optional(),
    title: SingleLineContentInputSchema.optional(),
    videos: z.array(VideoContentInputSchema).optional(),
});

export const ParagraphCollectionContentSchema = z.object({
    paragraphs: z.array(ParagraphContentSchema).nullish(),
});
export type ParagraphCollectionContent = z.infer<typeof ParagraphCollectionContentSchema>;

export const ParagraphCollectionContentInputSchema = z.object({
    paragraphs: z.array(ParagraphContentInputSchema).optional(),
});
export type ParagraphCollectionContentInput = z.infer<typeof ParagraphCollectionContentInputSchema>;
