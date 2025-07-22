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
import { ModifyProductVariantStockOperationSchema } from './product-variant.js';
import {
    CreateCustomerGroupOperationSchema,
    CreateCustomerOperationSchema,
    UpdateCustomerGroupOperationSchema,
    UpdateCustomerOperationSchema,
    UpsertCustomerGroupOperationSchema,
    UpsertCustomerOperationSchema,
} from './customer.js';

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

    ModifyProductVariantStockOperationSchema,

    CreateCustomerGroupOperationSchema,
    UpdateCustomerGroupOperationSchema,
    UpsertCustomerGroupOperationSchema,

    CreateCustomerOperationSchema,
    UpdateCustomerOperationSchema,
    UpsertCustomerOperationSchema,
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

export type { ModifyProductVariantStockOperation } from './product-variant.js';

export type {
    CreateCustomerOperation,
    UpdateCustomerOperation,
    UpsertCustomerOperation,
    CreateCustomerGroupOperation,
    UpdateCustomerGroupOperation,
    UpsertCustomerGroupOperation,
} from './customer.js';
