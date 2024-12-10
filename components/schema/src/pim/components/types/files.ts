import { z } from 'zod';
import { MinMaxComponentConfigInputSchema, MinMaxComponentConfigSchema } from '../shared.js';
import {
    DateTimeSchema,
    FileSizeUnitEnum,
    KeyValuePairInputSchema,
    KeyValuePairSchema,
} from '../../../shared/index.js';

// in the future that may be needed to split between config and input
const extraConfig = z.object({
    acceptedContentTypes: z
        .array(
            z.object({
                contentType: z.string(),
                extensionLabel: z.string().optional(),
            }),
        )
        .optional(),
    maxFileSize: z.object({
        size: z.number(),
        unit: FileSizeUnitEnum,
    }),
});
export const FilesConfigSchema = MinMaxComponentConfigSchema.and(extraConfig);
export const FilesConfigInputSchema = MinMaxComponentConfigInputSchema.and(extraConfig);

export type FilesConfig = z.infer<typeof FilesConfigSchema>;
export type FilesConfigInput = z.infer<typeof FilesConfigInputSchema>;

export const FileContentSchema = z.object({
    key: z.string().min(1),
    contentType: z.string().optional(),
    title: z.string().optional(),
    meta: z.array(KeyValuePairSchema).optional(),
    size: z.number().optional(),
    createdAt: DateTimeSchema.optional(),
    updatedAt: DateTimeSchema.optional(),
    url: z.string().min(1),
});
export type FileContent = z.infer<typeof FilesContentSchema>;

export const FilesContentSchema = z.object({
    files: z.array(FileContentSchema).optional(),
});
export type FilesContent = z.infer<typeof FilesContentSchema>;

export const FileInputSchema = z.object({
    key: z.string().min(1),
    title: z.string().optional(),
    meta: z.array(KeyValuePairInputSchema).optional(),
});
export type FileInput = z.infer<typeof FileInputSchema>;

export const FilesContentInputSchema = z.array(FileInputSchema);
export type FilesContentInput = z.infer<typeof FilesContentInputSchema>;
