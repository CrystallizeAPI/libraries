import { z } from 'zod';
import { IdSchema } from '../shared/index.js';
import { ShapeComponentTypeEnum } from './enums.js';

const minValueSchema = z.number().min(0).nullable().optional();
const maxValueSchema = z.number().min(0).nullable().optional();
const minMaxSchema = z.object({ min: minValueSchema, max: maxValueSchema });
const minMaxItemRelationsSchema = z.object({
    min: minValueSchema,
    max: maxValueSchema,
    minItems: minValueSchema,
    maxItems: maxValueSchema,
    minSkus: minValueSchema,
    maxSkus: maxValueSchema,
});

export const MinMaxComponentConfigSchema = minMaxSchema
    .transform(({ min, max }) => {
        // API throws an error of max being less than min if max is explicitly null.
        // This transform can be removed if the API issue is resolved.
        const result: z.infer<typeof minMaxSchema> = {};
        if (min !== null && min !== undefined) {
            result.min = min;
        }
        if (max !== null && max !== undefined) {
            result.max = max;
        }
        return result;
    })
    .refine(
        ({ min, max }) => {
            if (typeof min === 'number' && typeof max === 'number') {
                if (min === max) {
                    return true;
                }
                if (min > max) {
                    return false;
                }
            }
            return true;
        },
        {
            message: 'Min cannot be greater than max',
            path: ['min'],
        },
    );

export const MinMaxItemRelationsComponentConfigSchema = minMaxItemRelationsSchema
    .transform(({ min, max, minSkus, minItems, maxSkus, maxItems }) => {
        // API throws an error of max being less than min if max is explicitly null.
        // This transform can be removed if the API issue is resolved.
        const result: z.infer<typeof minMaxItemRelationsSchema> = {};
        if (min !== null && min !== undefined) {
            result.min = min;
        }
        if (minSkus !== null && minSkus !== undefined) {
            result.minSkus = minSkus;
        }
        if (minItems !== null && minItems !== undefined) {
            result.minItems = minItems;
        }
        if (max !== null && max !== undefined) {
            result.max = max;
        }
        if (maxSkus !== null && maxSkus !== undefined) {
            result.maxSkus = maxSkus;
        }
        if (maxItems !== null && maxItems !== undefined) {
            result.maxItems = maxItems;
        }
        return result;
    })
    .refine(
        ({ min, max, minItems, maxItems, minSkus, maxSkus }) => {
            if (typeof min === 'number' && typeof max === 'number') {
                if (min === max) {
                    return true;
                }
                if (min > max) {
                    return false;
                }
            }
            if (typeof minItems === 'number' && typeof maxItems === 'number') {
                if (minItems === maxItems) {
                    return true;
                }
                if (minItems > maxItems) {
                    return false;
                }
            }
            if (typeof minSkus === 'number' && typeof maxSkus === 'number') {
                if (minSkus === maxSkus) {
                    return true;
                }
                if (minSkus > maxSkus) {
                    return false;
                }
            }
            return true;
        },
        {
            message: 'Min cannot be greater than max',
            path: ['min'],
        },
    );

export type ComponentChoiceComponentConfig = {
    choices: any[];
};

export const ComponentChoiceComponentConfigInputSchema: z.ZodType<ComponentChoiceComponentConfig> = z
    .lazy(() =>
        z.object({
            choices: z.array(ShapeComponentInputSchema),
        }),
    )
    .refine(({ choices }) => !choices.find((cmp) => cmp.type === 'componentChoice' || cmp.type === 'contentChunk'), {
        message: 'Nesting "componentChoice" or "contentChunk" structural components is not allowed',
    });

export type ContentChunkComponentConfig = {
    components: any[];
    repeatable?: boolean;
};

export const ContentChunkComponentConfigInputSchema: z.ZodType<ContentChunkComponentConfig> = z
    .lazy(() =>
        z.object({
            components: z.array(ShapeComponentInputSchema),
            repeatable: z.coerce.boolean().default(false),
        }),
    )
    .refine(
        ({ components }) => !components.find((cmp) => cmp.type === 'componentChoice' || cmp.type === 'contentChunk'),
        {
            message: 'Nesting "componentChoice" or "contentChunk" structural components is not allowed',
        },
    );

export const FileComponentConfigSchema = MinMaxComponentConfigSchema.and(
    z.object({
        acceptedContentTypes: z
            .array(
                z.object({
                    contentType: z.string(),
                    extensionLabel: z.string().optional().nullable(),
                }),
            )
            .optional()
            .nullable(),
        maxFileSize: z.object({
            size: z.number(),
            unit: z.enum(['Bytes', 'GiB', 'KiB', 'MiB']),
        }),
    }),
);

export const ItemRelationsComponentConfigSchema = MinMaxItemRelationsComponentConfigSchema.and(
    z.object({
        acceptedShapeIdentifiers: z.array(z.string()).optional().nullable(),
        quickSelect: z
            .object({
                folders: z
                    .array(z.object({ folderId: IdSchema }))
                    .optional()
                    .nullable(),
            })
            .optional()
            .nullable(),
    }),
).superRefine(({ max, min, minItems, maxItems, minSkus, maxSkus }, ctx) => {
    if (max && max > 50) {
        ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 50,
            type: 'number',
            inclusive: true,
            message: 'Max cannot be greater than 50',
        });
    }
    if (maxItems && maxItems > 50) {
        ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 50,
            type: 'number',
            inclusive: true,
            message: 'MaxItems cannot be greater than 50',
        });
    }
    if (maxSkus && maxSkus > 50) {
        ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 50,
            type: 'number',
            inclusive: true,
            message: 'MaxSkus cannot be greater than 50',
        });
    }
});

// .refine(
//     ({ max, maxSkus, maxItems }) => {
//         if (max) {
//             return max <= 50;
//         }
//         if (maxSkus) {
//             return maxSkus <= 50;
//         }
//         if (maxItems) {
//             return maxItems <= 50;
//         }†
//         return true;
//     },
//     {
//         message: 'Max may not be greater than 50',
//         path: ['max'],
//     },
// );

export const NumericComponentConfigSchema = z.object({
    decimalPlaces: z.number().min(0).optional(),
    units: z.array(z.string()).optional(),
});

export type PieceComponentConfig = {
    identifier: string;
    components: any[];
};

export const PieceComponentConfigInputSchema: z.ZodType<PieceComponentConfig> = z.lazy(() =>
    z.object({
        identifier: z.string().min(1),
        components: z.array(ShapeComponentInputSchema),
    }),
);

export const PropertiesTableComponentConfigSchema = z.object({
    sections: z.array(
        z.object({
            title: z.string().optional().nullable(),
            keys: z.array(z.string()),
        }),
    ),
});

export const SelectionComponentConfigInputSchema = MinMaxComponentConfigSchema.and(
    z.object({
        options: z
            .array(
                z.object({
                    key: z.string().min(1),
                    value: z.string().min(1),
                    isPreselected: z.coerce.boolean().default(false),
                }),
            )
            .optional()
            .nullable(),
    }),
);

export const ShapeComponentConfigInputSchema = z.object({
    componentChoice: ComponentChoiceComponentConfigInputSchema.optional(),
    contentChunk: ContentChunkComponentConfigInputSchema.optional(),
    files: FileComponentConfigSchema.optional(),
    itemRelations: ItemRelationsComponentConfigSchema.optional(),
    numeric: NumericComponentConfigSchema.optional(),
    piece: PieceComponentConfigInputSchema.optional(),
    propertiesTable: PropertiesTableComponentConfigSchema.optional(),
    selection: SelectionComponentConfigInputSchema.optional(),
});

export const ShapeComponentConfigSchema = ComponentChoiceComponentConfigInputSchema.or(
    ContentChunkComponentConfigInputSchema,
)
    .or(FileComponentConfigSchema)
    .or(ItemRelationsComponentConfigSchema)
    .or(NumericComponentConfigSchema)
    .or(PieceComponentConfigInputSchema)
    .or(PropertiesTableComponentConfigSchema)
    .or(SelectionComponentConfigInputSchema);

export const ShapeComponentInputSchema = z
    .object({
        id: z.string().min(1),
        name: z.string().min(1),
        type: ShapeComponentTypeEnum,
        description: z.string().optional().nullable(),
        config: ShapeComponentConfigInputSchema.optional().nullable(),
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

export const ShapeComponentSchema = z
    .object({
        id: z.string().min(1),
        name: z.string().min(1),
        type: ShapeComponentTypeEnum,
        description: z.string().optional().nullable(),
        config: ShapeComponentConfigSchema.optional().nullable(),
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

export type MinMaxComponentConfig = z.infer<typeof MinMaxComponentConfigSchema>;
export type MinMaxItemRelationsComponentConfig = z.infer<typeof MinMaxItemRelationsComponentConfigSchema>;
export type FileComponentConfig = z.infer<typeof FileComponentConfigSchema>;
export type ItemRelationsComponentConfig = z.infer<typeof ItemRelationsComponentConfigSchema>;
export type NumericComponentConfig = z.infer<typeof NumericComponentConfigSchema>;
export type PropertiesTableComponentConfig = z.infer<typeof PropertiesTableComponentConfigSchema>;
export type SelectionComponentConfig = z.infer<typeof SelectionComponentConfigInputSchema>;

export type ShapeComponentConfigInput = z.infer<typeof ShapeComponentConfigInputSchema>;
export type ShapeComponentInput = z.infer<typeof ShapeComponentInputSchema>;

export type ShapeComponentConfig = z.infer<typeof ShapeComponentConfigSchema>;
export type ShapeComponent = z.infer<typeof ShapeComponentSchema>;
