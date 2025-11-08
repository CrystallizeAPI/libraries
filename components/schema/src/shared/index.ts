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

export const TURISchema = z.string().min(1);
export const RefSchema = z.string().min(1);

export const checkTuriOrId = (
    data: { turi?: string; itemId?: string; id?: string },
    ctx: { addIssue: ({ code, message, path }: { code: 'custom'; message: string; path: string[] }) => void },
) => {
    if (!data.turi && !(data.itemId || data.id)) {
        ctx.addIssue({
            code: 'custom',
            message: 'Expected at least one turi.',
            path: ['turi'],
        });
    }
};

const ownerBaseShape = {
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    email: z.string().email().nullish(),
    companyName: z.string().nullish(),
} satisfies z.ZodRawShape;

const CoreOwnerSchema = z.object({
    ...ownerBaseShape,
    id: IdSchema.optional(),
});

const CoreNextOwnerSchema = z.object({
    ...ownerBaseShape,
    id: IdSchema,
});

export const OwnerSchema = z.union([CoreOwnerSchema, CoreNextOwnerSchema]);
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
