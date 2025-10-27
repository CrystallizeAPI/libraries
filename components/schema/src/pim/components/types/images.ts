import { z } from 'zod';
import { MinMaxComponentConfigInputSchema, MinMaxComponentConfigSchema } from '../shared.js';
import { RichTextContentInputSchema, RichTextContentSchema } from './rich-text.js';
import { DateTimeSchema, IdSchema, KeyValuePairInputSchema, KeyValuePairSchema } from '../../../shared/index.js';

/* TODO: REVIEW THE NULLLISH AND OPTIONAL USAGE */
/* on Content c'est nullish or optional
   mais sur Input c'est pas toujours le cas donc il faut peut-être revoir les schémas
    pour que ce soit plus cohérent entre Content et Input voir le doubler pour éviter les erreurs
    comme pour Showcases etc.

*/

export const ImagesConfigSchema = MinMaxComponentConfigSchema;
export const ImagesConfigInputSchema = MinMaxComponentConfigInputSchema;

export type ImagesConfig = z.infer<typeof ImagesConfigSchema>;
export type ImagesConfigInput = z.infer<typeof ImagesConfigInputSchema>;

export const FocalPointInputSchema = z.object({
    x: z.number().min(0),
    y: z.number().min(0),
});
export type FocalPointInput = z.infer<typeof FocalPointInputSchema>;

export const FocalPointSchema = z.object({
    x: z.number().optional(),
    y: z.number().optional(),
});
export type FocalPoint = z.infer<typeof FocalPointSchema>;

export const ShowcaseInputSchema = z.object({
    itemIds: z.array(IdSchema).optional(),
    skus: z.array(z.string()).optional(),
    hotpost: FocalPointInputSchema.optional(),
    meta: z.array(KeyValuePairInputSchema).optional(),
});
export type ShowcaseInput = z.infer<typeof ShowcaseInputSchema>;

export const ShowcaseSchema = z.object({
    itemIds: z.array(IdSchema).nullish(),
    skus: z.array(z.string()).nullish(),
    hotpost: FocalPointInputSchema.nullish(),
    meta: z.array(KeyValuePairInputSchema).nullish(),
});
export type Showcase = z.infer<typeof ShowcaseSchema>;

export const ImageVariantSchema = z.object({
    key: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    size: z.number().nullish(),
    url: z.string().optional(),
});
export type ImageVariant = z.infer<typeof ImageVariantSchema>;

export const ImageContentSchema = z.object({
    key: z.string().optional(),
    mimeType: z.string().nullish(),
    altText: z.string().nullish(),
    caption: RichTextContentSchema.nullish(),
    meta: z.array(KeyValuePairSchema).nullish(),
    variants: z.array(ImageVariantSchema),
    width: z.number(),
    height: z.number(),
    focalPoint: FocalPointSchema.nullish(),
    createdAt: DateTimeSchema.nullish(),
    updatedAt: DateTimeSchema.nullish(),
    url: z.string().optional(),
    showcase: z.array(ShowcaseSchema).nullish(),
});
export type ImageContent = z.infer<typeof ImageContentSchema>;

export const ImagesContentSchema = z.object({
    imageIds: z.array(z.string()).nullish(),
    images: z.array(ImageContentSchema).nullish(),
});
export type ImagesContent = z.infer<typeof ImagesContentSchema>;

export const ImageContentInputSchema = z.object({
    key: z.string().min(1),
    mimeType: z.string().nullish(),
    altText: z.string().nullish(),
    caption: RichTextContentInputSchema.nullish(),
    meta: z.array(KeyValuePairInputSchema).nullish(),
    focalPoint: FocalPointInputSchema.nullish(),
    showcase: z.array(ShowcaseInputSchema).nullish(),
});
export type ImageContentInput = z.infer<typeof ImageContentInputSchema>;

export const ImagesContentInputSchema = z.array(ImageContentInputSchema);
export type ImagesContentInput = z.infer<typeof ImagesContentInputSchema>;
