import { z } from 'zod';

export const ShapeTypeEnum = z.enum(['product', 'document', 'folder']);
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

export const ComponentChoiceComponentConfigSchema: any = z.object({
    choices: z.array(z.lazy(() => ShapeComponentSchema)),
});

export const ContentChunkComponentConfigSchema: any = z.object({
    components: z.array(z.lazy(() => ShapeComponentSchema)),
    repeatable: z.boolean().default(false),
});

export const ShapeComponentConfigSchema = z.object({
    componentChoice: ComponentChoiceComponentConfigSchema.optional(),
    contentChunk: ContentChunkComponentConfigSchema.optional(),
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
            path: ['config'],
        },
    );

export const ShapeCreateInputSchema = z.object({
    identifier: z.string().optional(),
    name: z.string().min(1),
    tenantId: z.string().min(1),
    type: ShapeTypeEnum,
    meta: z.record(z.string()).optional(),
    components: z.array(ShapeComponentSchema).optional(),
});

export const ShapeUpdateInputSchema = z.object({
    name: z.string().min(1),
    meta: z.record(z.string()).optional(),
    components: z.array(ShapeComponentSchema).optional(),
});
