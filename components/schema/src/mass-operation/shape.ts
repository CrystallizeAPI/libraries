import { z } from 'zod';
import { CreateShapeInputSchema, UpdateShapeInputSchema } from '../pim/shape/index.js';

export const CreateShapeOperationSchema = CreateShapeInputSchema.extend({
    intent: z.literal('shape/create'),
});
export type CreateShapeOperation = z.infer<typeof CreateShapeOperationSchema>;

export const UpdateShapeOperationSchema = UpdateShapeInputSchema.extend({
    intent: z.literal('shape/update'),
});
export type UpdateShapeOperation = z.infer<typeof UpdateShapeOperationSchema>;

export const UpsertShapeOperationSchema = CreateShapeOperationSchema.extend({
    intent: z.literal('shape/upsert'),
});
export type UpsertShapeOperation = z.infer<typeof UpsertShapeOperationSchema>;
