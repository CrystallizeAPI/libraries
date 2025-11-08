import { z } from 'zod';
import { CreatePieceInputSchema, CreateShapeInputSchema, UpdateShapeInputSchema } from '../pim/shapes/index.js';
import { RefSchema } from '../shared/index.js';

export const CreateShapeOperationSchema = CreateShapeInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('shape/create'),
});
export type CreateShapeOperation = z.infer<typeof CreateShapeOperationSchema>;

export const UpdateShapeOperationSchema = UpdateShapeInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('shape/update'),
});
export type UpdateShapeOperation = z.infer<typeof UpdateShapeOperationSchema>;

export const UpsertShapeOperationSchema = CreateShapeOperationSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('shape/upsert'),
});
export type UpsertShapeOperation = z.infer<typeof UpsertShapeOperationSchema>;

export const CreatePieceOperationSchema = CreatePieceInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('piece/create'),
});
export type CreatePieceOperation = z.infer<typeof CreatePieceOperationSchema>;

export const UpdatePieceOperationSchema = CreatePieceInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('piece/update'),
});
export type UpdatePieceOperation = z.infer<typeof UpdatePieceOperationSchema>;

export const UpsertPieceOperationSchema = CreatePieceInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('piece/upsert'),
});
export type UpsertPieceOperation = z.infer<typeof UpsertPieceOperationSchema>;
