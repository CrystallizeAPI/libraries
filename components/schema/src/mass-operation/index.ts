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
import {
    CreatePieceOperationSchema,
    CreateShapeOperationSchema,
    UpdatePieceOperationSchema,
    UpdateShapeOperationSchema,
    UpsertPieceOperationSchema,
    UpsertShapeOperationSchema,
} from './shape.js';

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

    CreatePieceOperationSchema,
    UpdatePieceOperationSchema,
    UpsertPieceOperationSchema,
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
    UpdateItemOperation,
    UpsertItemOperation,
    PublishItemOperation,
    UnPublishItemOperation,
    UpdateItemComponentOperation,
    UpdateSkuComponentOperation,
} from './item.js';

export type {
    CreateShapeOperation,
    UpdateShapeOperation,
    UpsertShapeOperation,
    CreatePieceOperation,
    UpdatePieceOperation,
    UpsertPieceOperation,
} from './shape.js';
