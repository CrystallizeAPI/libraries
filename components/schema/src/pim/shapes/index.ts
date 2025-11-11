import { z } from 'zod';
import { ItemTypeSchema, KeyValuePairInputSchema } from '../../shared/index';
import { ComponentDefinitionInputSchema, ComponentDefinitionSchema } from '../components/component-definition';

export const CreatePieceInputSchema = z.object({
    identifier: z.string().min(2).max(64),
    name: z.string().min(1),
    components: z.array(ComponentDefinitionInputSchema).nullish(),
});

export const UpdatePieceInputSchema = CreatePieceInputSchema;

export const UpdateShapeInputSchema = CreatePieceInputSchema.extend({
    meta: KeyValuePairInputSchema.nullish(),
    variantComponents: z.array(ComponentDefinitionInputSchema).nullish(),
});

export const CreateShapeInputSchema = UpdateShapeInputSchema.extend({
    type: ItemTypeSchema,
});

export const PieceSchema = z.object({
    identifier: z.string().min(2).max(64),
    name: z.string().min(1),
    components: z.array(ComponentDefinitionSchema).optional(),
});

export const ShapeSchema = PieceSchema.extend({
    type: ItemTypeSchema,
    variantComponents: z.array(ComponentDefinitionSchema).optional(),
});

export type CreateShapeInput = z.infer<typeof UpdateShapeInputSchema>;
export type UpdateShapeInput = z.infer<typeof UpdateShapeInputSchema>;
export type CreatePieceInput = z.infer<typeof CreatePieceInputSchema>;
export type UpdatePieceInput = z.infer<typeof UpdatePieceInputSchema>;

export type Shape = z.infer<typeof ShapeSchema>;
export type Piece = z.infer<typeof PieceSchema>;
