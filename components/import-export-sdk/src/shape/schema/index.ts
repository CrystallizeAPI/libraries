import { z } from 'zod';

/** @internal */
export const ShapeTypeEnum = z.enum(['product', 'document', 'folder']);

/** @internal */
export const ShapeComponentTypeEnum = z.enum([
    'boolean',
    'componentChoice',
    'contentChunk',
    'datetime',
    'gridRelations',
    'images',
    'itemRelations',
    'location',
    'numeric',
    'paragraphCollection',
    'propertiesTable',
    'richText',
    'selection',
    'singleLine',
    'videos',
    'files',
]);

/** @internal */
export const MinMaxComponentConfigSchema = z
    .object({
        min: z.number().positive().optional(),
        max: z.number().min(1).optional(),
    })
    .refine(
        ({ min, max }) => {
            if (min && max) {
                return min <= max;
            }
            return true;
        },
        {
            message: 'Min cannot be greater than max',
            path: ['min'],
        },
    );

/** @internal */
export const ComponentChoiceComponentConfigSchema: any = z.object({
    choices: z.array(z.lazy(() => ShapeComponentSchema)),
});

/** @internal */
export const ContentChunkComponentConfigSchema: any = z.object({
    components: z
        .array(z.lazy(() => ShapeComponentSchema))
        .refine(
            (components) => !components.find((cmp) => cmp.type === 'componentChoice' || cmp.type === 'contentChunk'),
            {
                message: 'Nesting "componentChoice" or "contentChunk" structural components is not allowed',
            },
        ),
    repeatable: z.boolean().default(false),
});

/** @internal */
export const FileComponentConfigSchema = MinMaxComponentConfigSchema.and(
    z.object({
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
            unit: z.enum(['Bytes', 'GiB', 'KiB', 'MiB']),
        }),
    }),
);

/** @internal */
export const ItemRelationsComponentConfigSchema = MinMaxComponentConfigSchema.and(
    z.object({
        acceptedShapeIdentifiers: z.array(z.string()).optional(),
    }),
);

/** @internal */
export const NumericComponentConfigSchema = z.object({
    decimalPlaces: z.number().positive().optional(),
    units: z.array(z.string()).optional(),
});

/** @internal */
export const PropertiesTableComponentConfigSchema = z.object({
    sections: z.array(
        z.object({
            title: z.string().optional(),
            keys: z.array(z.string()),
        }),
    ),
});

/** @internal */
export const SelectionComponentConfigSchema = MinMaxComponentConfigSchema.and(
    z.object({
        options: z
            .array(
                z.object({
                    key: z.string().min(1),
                    value: z.string().min(1),
                    isPreselected: z.boolean().default(false),
                }),
            )
            .optional(),
    }),
);

/** @internal */
export const ShapeComponentConfigSchema = z.object({
    componentChoice: ComponentChoiceComponentConfigSchema.optional(),
    contentChunk: ContentChunkComponentConfigSchema.optional(),
    files: FileComponentConfigSchema.optional(),
    itemRelations: ItemRelationsComponentConfigSchema.optional(),
    numeric: NumericComponentConfigSchema.optional(),
    propertiesTable: PropertiesTableComponentConfigSchema.optional(),
    selection: SelectionComponentConfigSchema.optional(),
});

/** @internal */
export const ShapeComponentSchema = z
    .object({
        id: z.string().min(1),
        name: z.string().min(1),
        type: ShapeComponentTypeEnum,
        description: z.string().optional(),
        config: ShapeComponentConfigSchema.optional(),
    })
    .refine(
        ({ type, config }) => {
            if (!config) {
                return true;
            }

            // Check if there are any config options that don't match the type
            // of the component.
            return !Object.entries(config).find(([key, value]) => value && key !== type);
        },
        {
            message: 'Incorrect config type provided on shape component',
        },
    );

/** @internal */
export const CreateShapeInputSchema = z.object({
    identifier: z.string().optional(),
    name: z.string().min(1),
    tenantId: z.string().min(1),
    type: ShapeTypeEnum,
    meta: z.record(z.string()).optional(),
    components: z.array(ShapeComponentSchema).optional(),
});

/** @internal */
export const UpdateShapeInputSchema = z.object({
    name: z.string(),
    meta: z.record(z.string()).optional(),
    components: z.array(ShapeComponentSchema).optional(),
});