import { z } from 'zod';
import { ShapeComponentTypeEnum } from './enums';

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

export const ComponentChoiceComponentConfigSchema: any = z.object({
    choices: z.array(z.lazy(() => ShapeComponentSchema)),
});

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

export const ItemRelationsComponentConfigSchema = MinMaxComponentConfigSchema.and(
    z.object({
        acceptedShapeIdentifiers: z.array(z.string()).optional(),
    }),
);

export const NumericComponentConfigSchema = z.object({
    decimalPlaces: z.number().min(0).optional(),
    units: z.array(z.string()).optional(),
});

export const PropertiesTableComponentConfigSchema = z.object({
    sections: z.array(
        z.object({
            title: z.string().optional(),
            keys: z.array(z.string()),
        }),
    ),
});

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

export const ShapeComponentConfigSchema = z.object({
    componentChoice: ComponentChoiceComponentConfigSchema.optional(),
    contentChunk: ContentChunkComponentConfigSchema.optional(),
    files: FileComponentConfigSchema.optional(),
    itemRelations: ItemRelationsComponentConfigSchema.optional(),
    numeric: NumericComponentConfigSchema.optional(),
    propertiesTable: PropertiesTableComponentConfigSchema.optional(),
    selection: SelectionComponentConfigSchema.optional(),
});

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

export type MinMaxComponentConfig = z.infer<typeof MinMaxComponentConfigSchema>;
export type ComponentChoiceComponentConfig = z.infer<typeof ComponentChoiceComponentConfigSchema>;
export type ContentChunkComponentConfig = z.infer<typeof ContentChunkComponentConfigSchema>;
export type FileComponentConfig = z.infer<typeof FileComponentConfigSchema>;
export type ItemRelationsComponentConfig = z.infer<typeof ItemRelationsComponentConfigSchema>;
export type NumericComponentConfig = z.infer<typeof NumericComponentConfigSchema>;
export type PropertiesTableComponentConfig = z.infer<typeof PropertiesTableComponentConfigSchema>;
export type SelectionComponentConfig = z.infer<typeof SelectionComponentConfigSchema>;
export type ShapeComponentConfig = z.infer<typeof ShapeComponentConfigSchema>;
export type ShapeComponent = z.infer<typeof ShapeComponentSchema>;
