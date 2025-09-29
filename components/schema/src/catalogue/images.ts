import { z } from 'zod';
import { RichTextContentSchema } from '../pim';
import { DateTimeSchema, KeyValuePairSchema } from '../shared';
import { TopicSchema } from './topics';

const CaptionSchema = RichTextContentSchema;

export const ImageVariantSchema = z.object({
    url: z.string().optional(),
    key: z.string().optional(),
    width: z.number().optional(),
    height: z.number().nullish(),
    size: z.number().nullish(),
});
export type ImageVariant = z.infer<typeof ImageVariantSchema>;

export const ImageSchema = z.object({
    url: z.string().optional(),
    key: z.string().optional(),
    altText: z.string().nullish(),
    caption: CaptionSchema.nullish(),
    meta: z.array(KeyValuePairSchema).nullish(),
    width: z.number().nullish(),
    height: z.number().nullish(),
    variants: z.array(ImageVariantSchema).nullish(),
    createdAt: DateTimeSchema.nullish(),
    updatedAt: DateTimeSchema.nullish(),
    focalPoint: z
        .object({
            x: z.number().optional(),
            y: z.number().optional(),
        })
        .nullish(),
    topics: z.array(TopicSchema).nullish(),
    //showcases: todo
});
export type Image = z.infer<typeof ImageSchema>;

// export interface Image {
//     url: string;
//     key: string;
//     altText?: string;
//     caption?: {
//         json: any[];
//         html: string[];
//         plainText: string[];
//     };
//     meta?: MetaProperty[];
//     metaProperty?: string; // shortcut to meta[n].value
//     variants?: ImageVariant[];
//     createdAt?: Date;
// }

// export interface ImageVariant {
//     url: string;
//     key: string;
//     width: number;
//     height?: number;
//     size?: number;
// }
