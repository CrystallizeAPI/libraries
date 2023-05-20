import { z } from 'zod';
import { IdSchema } from '../shared/index.js';
import { ShapeComponentTypeEnum } from './enums.js';

const minValueSchema = z.number().min(0).nullable().optional();
const maxValueSchema = z.number().min(1).nullable().optional();
const minMaxSchema = z.object({ min: minValueSchema, max: maxValueSchema });

export const MinMaxComponentConfigSchema = minMaxSchema
    .transform(({ min, max }) => {
        // API throws an error of max being less than min if max is explicitly null.
        // This transform can be removed if the API issue is resolved.
        const result: z.infer<typeof minMaxSchema> = {};
        if (!!min) {
            result.min = min;
        }
        if (!!max) {
            result.max = max;
        }

        return result;
    })
    .refine(
        ({ min, max }) => {
            if (typeof min === 'number' && typeof max === 'number') {
                return min <= max;
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
            repeatable: z.boolean().default(false),
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

export const ItemRelationsComponentConfigSchema = MinMaxComponentConfigSchema.and(
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
).refine(
    ({ max }) => {
        if (max) {
            return max <= 50;
        }
        return true;
    },
    {
        message: 'Max may not be greater than 50',
        path: ['max'],
    },
);

export const NumericComponentConfigSchema = z.object({
    decimalPlaces: z.number().min(0).optional(),
    units: z.array(z.string()).optional(),
});

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
                    isPreselected: z.boolean().default(false),
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
    propertiesTable: PropertiesTableComponentConfigSchema.optional(),
    selection: SelectionComponentConfigInputSchema.optional(),
});

export const ShapeComponentConfigSchema = ComponentChoiceComponentConfigInputSchema.or(
    ContentChunkComponentConfigInputSchema,
)
    .or(FileComponentConfigSchema)
    .or(ItemRelationsComponentConfigSchema)
    .or(NumericComponentConfigSchema)
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
export type FileComponentConfig = z.infer<typeof FileComponentConfigSchema>;
export type ItemRelationsComponentConfig = z.infer<typeof ItemRelationsComponentConfigSchema>;
export type NumericComponentConfig = z.infer<typeof NumericComponentConfigSchema>;
export type PropertiesTableComponentConfig = z.infer<typeof PropertiesTableComponentConfigSchema>;
export type SelectionComponentConfig = z.infer<typeof SelectionComponentConfigInputSchema>;

export type ShapeComponentConfigInput = z.infer<typeof ShapeComponentConfigInputSchema>;
export type ShapeComponentInput = z.infer<typeof ShapeComponentInputSchema>;

export type ShapeComponentConfig = z.infer<typeof ShapeComponentConfigSchema>;
export type ShapeComponent = z.infer<typeof ShapeComponentSchema>;