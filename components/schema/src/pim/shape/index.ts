import { z } from 'zod';
import { ItemTypeEnum, KeyValuePairInputSchema } from '../../shared/index.js';
import { ComponentDefinitionInputSchema, ComponentDefinitionSchema } from '../components/component-definition.js';

export const UpdateShapeInputSchema = z.object({
    identifier: z.string().min(2).max(64),
    name: z.string().min(1),
    meta: KeyValuePairInputSchema.optional().nullable(),
    components: z.array(ComponentDefinitionInputSchema).optional().nullable(),
    variantComponents: z.array(ComponentDefinitionInputSchema).optional().nullable(),
});

export const CreateShapeInputSchema = UpdateShapeInputSchema.extend({
    type: ItemTypeEnum,
});

export const BasicShapeSchema = z.object({
    identifier: z.string().min(2).max(64),
    name: z.string().min(1),
    type: ItemTypeEnum,
});

export const ShapeSchema = BasicShapeSchema.extend({
    components: z.array(ComponentDefinitionSchema).optional(),
    variantComponents: z.array(ComponentDefinitionSchema).optional(),
});

export type CreateShapeInput = z.infer<typeof UpdateShapeInputSchema>;
export type UpdateShapeInput = z.infer<typeof UpdateShapeInputSchema>;
export type Shape = z.infer<typeof ShapeSchema>;
