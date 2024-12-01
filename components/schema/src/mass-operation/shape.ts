import { z } from 'zod';
import { NextPimCreateShapeInputSchema, UpdateShapeInputSchema } from '../shape/index.js';

export const CreateShapeOperationSchema = NextPimCreateShapeInputSchema.and(
    z.object({
        concern: z.literal('shape'),
        action: z.literal('create'),
    }),
);
export type CreateShapeOperation = z.infer<typeof CreateShapeOperationSchema>;

export const UpdateShapeOperationSchema = UpdateShapeInputSchema.and(
    z.object({
        concern: z.literal('shape'),
        action: z.literal('update'),
        identifier: z.string().min(1),
    }),
);
export type UpdateShapeOperation = z.infer<typeof UpdateShapeOperationSchema>;
