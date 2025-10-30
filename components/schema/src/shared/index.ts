import { z } from 'zod';

export const IdSchema = z.string().regex(/^(?:[0-9a-f]{24}|{{.*}})$/);
export type Id = z.infer<typeof IdSchema>;

export const ItemTypeSchema = z.enum(['product', 'document', 'folder']);
export type ItemType = z.infer<typeof ItemTypeSchema>;

export const VersionLabelSchema = z.enum(['current', 'draft', 'published']);
export type VersionLabel = z.infer<typeof VersionLabelSchema>;

export const FileSizeUnitSchema = z.enum(['Bytes', 'GiB', 'KiB', 'MiB']);
export type FileSizeUnit = z.infer<typeof FileSizeUnitSchema>;

export const DateTimeSchema = z
    .string()
    .refine((str) => Number.isInteger(Date.parse(str)), { error: `Not a valid date` });

export const KeyValuePairSchema = z.object({
    key: z.string().min(1),
    value: z.string().nullish(),
});
export const KeyValuePairInputSchema = z.object({
    key: z.string().min(1),
    value: z.string().nullish(),
});
export type KeyValuePair = z.infer<typeof KeyValuePairSchema>;
export type KeyValuePairInput = z.infer<typeof KeyValuePairInputSchema>;

// todo: maybe core next only
export const OwnerSchema = z.object({
    id: IdSchema,
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.email().optional(),
    companyName: z.string().optional(),
});
export type Owner = z.infer<typeof OwnerSchema>;

export const ComponentTypeSchema = z.enum([
    'boolean',
    'componentChoice',
    'componentMultipleChoice',
    'contentChunk',
    'datetime',
    'gridRelations',
    'images',
    'itemRelations',
    'location',
    'numeric',
    'paragraphCollection',
    'piece',
    'propertiesTable',
    'richText',
    'selection',
    'singleLine',
    'videos',
    'files',
]);

export type ComponentType = z.infer<typeof ComponentTypeSchema>;
