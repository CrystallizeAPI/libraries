import { z } from 'zod';
import { MinMaxComponentConfigInputSchema, MinMaxComponentConfigSchema } from '../shared.js';
import { RichTextContentInputSchema, RichTextContentSchema } from './rich-text.js';
import { DateTimeSchema, IdSchema, KeyValuePairInputSchema, KeyValuePairSchema } from '../../../shared/index.js';

export const ImagesConfigSchema = MinMaxComponentConfigSchema;
export const ImagesConfigInputSchema = MinMaxComponentConfigInputSchema;

export type ImagesConfig = z.infer<typeof ImagesConfigSchema>;
export type ImagesConfigInput = z.infer<typeof ImagesConfigInputSchema>;

export const FocalPointSchema = z.object({
    x: z.number().min(0),
    y: z.number().min(0),
});
export type FocalPoint = z.infer<typeof FocalPointSchema>;

export const ShowcaseSchema = z.object({
    itemIds: z.array(IdSchema).optional(),
    skus: z.array(z.string()).optional(),
    hotpost: FocalPointSchema.optional(),
    meta: z.array(KeyValuePairInputSchema).optional(),
});
export type Showcase = z.infer<typeof ShowcaseSchema>;

export const ImageVariantSchema = z.object({
    key: z.string().min(1),
    width: z.number(),
    height: z.number(),
    size: z.number(),
    url: z.string().min(1),
});
export type ImageVariant = z.infer<typeof ImageVariantSchema>;

export const ImageContentSchema = z.object({
    key: z.string().min(1),
    mimeType: z.string().optional(),
    altText: z.string().optional(),
    caption: RichTextContentSchema.optional(),
    meta: z.array(KeyValuePairSchema).optional(),
    variants: z.array(ImageVariantSchema),
    width: z.number(),
    height: z.number(),
    focalPoint: FocalPointSchema.optional(),
    createdAt: DateTimeSchema.optional(),
    updatedAt: DateTimeSchema.optional(),
    url: z.string().min(1),
    showcase: z.array(ShowcaseSchema).optional(),
});
export type ImageContent = z.infer<typeof ImageContentSchema>;

export const ImagesContentSchema = z.object({
    imageIds: z.array(z.string()).optional(),
    images: z.array(ImageContentSchema).optional(),
});
export type ImagesContent = z.infer<typeof ImagesContentSchema>;

export const ImageContentInputSchema = z.object({
    key: z.string().min(1),
    mimeType: z.string().optional(),
    altText: z.string().optional(),
    caption: RichTextContentInputSchema.optional(),
    meta: z.array(KeyValuePairInputSchema).optional(),
    focalPoint: FocalPointSchema.optional(),
    showcase: z.array(ShowcaseSchema).optional(),
});
export type ImageContentInput = z.infer<typeof ImageContentInputSchema>;

export const ImagesContentInputSchema = z.array(ImageContentInputSchema);
export type ImagesContentInput = z.infer<typeof ImagesContentInputSchema>;
