import { z } from 'zod';

export const IdSchema = z.string().regex(/^[0-9a-f]{24}$/);
export type Id = z.infer<typeof IdSchema>;

export const ItemTypeEnum = z.enum(['product', 'document', 'folder']);
export type ItemType = z.infer<typeof ItemTypeEnum>;

export const VersionLabelEnum = z.enum(['current', 'draft', 'published']);
export type VersionLabel = z.infer<typeof VersionLabelEnum>;

export const FileSizeUnitEnum = z.enum(['Bytes', 'GiB', 'KiB', 'MiB']);
export type FileSizeUnit = z.infer<typeof FileSizeUnitEnum>;

export const DateTimeSchema = z.string().refine(
    (str) => Number.isInteger(Date.parse(str)),
    (str) => ({ message: `${str} is not a valid date` }),
);

export const KeyValuePairSchema = z.record(z.string());
export const KeyValuePairInputSchema = z.object({
    key: z.string().min(1),
    value: z.string().optional(),
});
export type KeyValuePair = z.infer<typeof KeyValuePairSchema>;
export type KeyValuePairInput = z.infer<typeof KeyValuePairInputSchema>;

// todo: maybe core next only
export const OwnerSchema = z.object({
    id: IdSchema,
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    companyName: z.string().optional(),
});
export type Owner = z.infer<typeof OwnerSchema>;

export const ComponentTypeEnum = z.enum([
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

export type ComponentType = z.infer<typeof ComponentTypeEnum>;
