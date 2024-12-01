import { z } from 'zod';
import {
    CreateItemOperationSchema,
    PublishItemOperationSchema,
    UnPublishItemOperationSchema,
    UpdateComponentOperationSchema,
    UpdateItemOperationSchema,
    UpsertItemOperationSchema,
} from './item.js';
import { CreateShapeOperationSchema, UpdateShapeOperationSchema } from './shape.js';

export const OperationSchema = z.union([
    CreateItemOperationSchema,
    UpdateItemOperationSchema,
    UpsertItemOperationSchema,
    UpdateComponentOperationSchema,
    PublishItemOperationSchema,
    UnPublishItemOperationSchema,
    CreateShapeOperationSchema,
    UpdateShapeOperationSchema,
]);

export const OperationsSchema = z.object({
    version: z.string().refine((value) => /^(\d+\.)?(\d+\.)?(\*|\d+)$/.test(value), {
        message: 'Version must be in Major.Minor.Patch format',
    }),
    operations: z.array(OperationSchema),
});

export type Operation = z.infer<typeof OperationSchema>;
export type Operations = z.infer<typeof OperationsSchema>;
export type {
    CreateItemOperation,
    PublishItemOperation,
    UnPublishItemOperation,
    UpdateComponentOperation,
    UpdateItemOperation,
    UpsertItemOperation,
} from './item.js';

export type { CreateShapeOperation, UpdateShapeOperation } from './shape.js';
