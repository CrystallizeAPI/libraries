import { z } from 'zod';
import { IdSchema, ItemTypeEnum, KeyValuePairSchema } from '../shared/index.js';
import { ShapeComponentInputSchema, ShapeComponentSchema } from './components.js';

export * from './components.js';
export * from './enums.js';

const TypedShapeSchema = z
    .object({
        type: z.literal(ItemTypeEnum.Values.product),
        variantComponents: z.array(ShapeComponentInputSchema).optional().nullable(),
    })
    .or(
        z.object({
            type: z.literal(ItemTypeEnum.Values.document).or(z.literal(ItemTypeEnum.Values.folder)),
            variantComponents: z.never().optional(),
        }),
    );

const BaseShapeInputSchema = z.object({
    identifier: z.string().min(2).max(64),
    name: z.string().min(1),
    meta: KeyValuePairSchema.optional().nullable(),
    components: z.array(ShapeComponentInputSchema).optional().nullable(),
});
// @deprecated
export const CreateShapeInputSchema = BaseShapeInputSchema.extend({
    tenantId: IdSchema,
}).and(TypedShapeSchema);

export const NextPimCreateShapeInputSchema = BaseShapeInputSchema.and(TypedShapeSchema);

export const UpdateShapeInputSchema = BaseShapeInputSchema.omit({
    identifier: true,
}).extend({
    components: z.array(ShapeComponentInputSchema).optional().nullable(),
    variantComponents: z.array(ShapeComponentInputSchema).optional().nullable(),
});

export const BasicShapeSchema = z.object({
    identifier: z.string().min(2).max(64),
    name: z.string().min(1),
    type: ItemTypeEnum,
});

export const ShapeSchema = BasicShapeSchema.extend({
    components: z.array(ShapeComponentSchema).optional(),
    variantComponents: z.array(ShapeComponentSchema).optional(),
});

export type CreateShapeInput = z.infer<typeof CreateShapeInputSchema>;
export type NextPimCreateShapeInput = z.infer<typeof NextPimCreateShapeInputSchema>;
export type UpdateShapeInput = z.infer<typeof UpdateShapeInputSchema>;
export type Shape = z.infer<typeof ShapeSchema>;
