import { z } from 'zod';
import {
    CreateItemOperationSchema,
    PublishItemOperationSchema,
    UnPublishItemOperationSchema,
    UpdateItemComponentOperationSchema,
    UpdateSkuComponentOperationSchema,
    UpdateItemOperationSchema,
    UpsertItemOperationSchema,
} from './item.js';
import { CreateShapeOperationSchema, UpdateShapeOperationSchema, UpsertShapeOperationSchema } from './shape.js';

export const OperationSchema = z.discriminatedUnion('intent', [
    CreateItemOperationSchema,
    UpdateItemOperationSchema,
    UpsertItemOperationSchema,
    PublishItemOperationSchema,
    UnPublishItemOperationSchema,
    UpdateItemComponentOperationSchema,
    UpdateSkuComponentOperationSchema,
    CreateShapeOperationSchema,
    UpdateShapeOperationSchema,
    UpsertShapeOperationSchema,
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
    UpdateItemComponentOperation,
    UpdateSkuComponentOperation,
    UpdateItemOperation,
    UpsertItemOperation,
} from './item.js';

export type { CreateShapeOperation, UpdateShapeOperation, UpsertShapeOperation } from './shape.js';
