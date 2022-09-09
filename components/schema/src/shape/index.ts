import { z } from 'zod';
import { IdSchema, KeyValuePairSchema } from '../shared';
import { ShapeComponentInputSchema, ShapeComponentSchema } from './components';
import { ShapeTypeEnum } from './enums';

export * from './components';
export * from './enums';

export const CreateShapeInputSchema = z
    .object({
        identifier: z.string().optional(),
        name: z.string().min(1),
        tenantId: IdSchema,
        type: ShapeTypeEnum,
        meta: KeyValuePairSchema.optional(),
        components: z.array(ShapeComponentInputSchema).optional(),
        variantComponents: z.array(ShapeComponentInputSchema).optional(),
    })
    .refine(
        ({ type, variantComponents }) => {
            if (type !== 'product' && !!variantComponents) {
                return false;
            }
            return true;
        },
        ({ name, identifier }) => ({
            message: `[shape:${identifier || name}]: Only shapes of type product can have variantComponents`,
            path: ['variantComponents'],
        }),
    );

export const UpdateShapeInputSchema = z.object({
    name: z.string(),
    meta: z.record(z.string()).optional(),
    components: z.array(ShapeComponentInputSchema).optional(),
    variantComponents: z.array(ShapeComponentInputSchema).optional(),
});

/** @internal */
export const basicShapeSchema = z.object({
    identifier: z.string().min(2).max(64),
    name: z.string().min(1),
    type: ShapeTypeEnum,
});

export const ShapeSchema = basicShapeSchema.extend({
    components: z.array(ShapeComponentSchema).optional(),
    variantComponents: z.array(ShapeComponentSchema).optional(),
});

export type CreateShapeInput = z.infer<typeof CreateShapeInputSchema>;
export type UpdateShapeInput = z.infer<typeof UpdateShapeInputSchema>;
export type Shape = z.infer<typeof ShapeSchema>;
