import { z } from 'zod';
import {
    CreateDocumentShapeInputSchema,
    CreateFolderShapeInputSchema,
    CreateProductShapeInputSchema,
    UpdateShapeInputSchema,
} from '../pim/shape/index.js';

export const CreateDocumentShapeOperationSchema = CreateDocumentShapeInputSchema.extend({
    intent: z.literal('shape/create/document'),
});
export type CreateDocumentShapeOperation = z.infer<typeof CreateDocumentShapeOperationSchema>;

export const CreateFolderShapeOperationSchema = CreateFolderShapeInputSchema.extend({
    intent: z.literal('shape/create/folder'),
});
export type CreateFolderShapeOperation = z.infer<typeof CreateDocumentShapeOperationSchema>;

export const CreateProductShapeOperationSchema = CreateProductShapeInputSchema.extend({
    intent: z.literal('shape/create/product'),
});
export type CreateProductShapeOperation = z.infer<typeof CreateProductShapeOperationSchema>;

export const UpdateShapeOperationSchema = UpdateShapeInputSchema.extend({
    intent: z.literal('shape/update'),
    identifier: z.string().min(1),
});
export type UpdateShapeOperation = z.infer<typeof UpdateShapeOperationSchema>;
