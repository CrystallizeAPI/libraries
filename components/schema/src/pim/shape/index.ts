import { z } from 'zod';
import { ItemTypeEnum, KeyValuePairInputSchema } from '../../shared/index.js';
import { ComponentDefinitionInputSchema, ComponentDefinitionSchema } from '../components/component-definition.js';

const BaseShapeInputSchema = z.object({
    identifier: z.string().min(2).max(64),
    name: z.string().min(1),
    meta: KeyValuePairInputSchema.optional().nullable(),
    components: z.array(ComponentDefinitionInputSchema).optional().nullable(),
});

export const CreateDocumentShapeInputSchema = BaseShapeInputSchema.extend({
    type: z.literal(ItemTypeEnum.Values.document),
});

export const CreateFolderShapeInputSchema = BaseShapeInputSchema.extend({
    type: z.literal(ItemTypeEnum.Values.folder),
});

export const CreateProductShapeInputSchema = BaseShapeInputSchema.extend({
    type: z.literal(ItemTypeEnum.Values.product),
    variantComponents: z.array(ComponentDefinitionInputSchema).optional().nullable(),
});

export const UpdateShapeInputSchema = BaseShapeInputSchema.extend({
    components: z.array(ComponentDefinitionInputSchema).optional().nullable(),
    variantComponents: z.array(ComponentDefinitionInputSchema).optional().nullable(),
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

export type CreateDocumentShapeInput = z.infer<typeof CreateDocumentShapeInputSchema>;
export type CreateFolderShapeInput = z.infer<typeof CreateFolderShapeInputSchema>;
export type CreateProductShapeInput = z.infer<typeof CreateProductShapeInputSchema>;
export type UpdateShapeInput = z.infer<typeof UpdateShapeInputSchema>;
export type Shape = z.infer<typeof ShapeSchema>;
