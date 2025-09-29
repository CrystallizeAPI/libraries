import { z } from 'zod';

// Image
export const ImageVariantSchema = z.object({
    url: z.string(),
    key: z.string(),
    width: z.number().nullish(),
    height: z.number().nullish(),
    altText: z.string().nullish(),
});

export const ImageSchema = ImageVariantSchema.extend({
    variants: z.array(ImageVariantSchema),
});

export type Image = z.infer<typeof ImageSchema>;
export type ImageVariant = z.infer<typeof ImageVariantSchema>;
