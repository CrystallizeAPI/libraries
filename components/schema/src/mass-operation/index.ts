import { z } from 'zod';

export const LoopingOperationOperationSchema = z.object({
    _ref: z.string().optional(),
});

// Helper function to extend any operation schema with base properties
export const withLoopingOperationProperties = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => {
    return LoopingOperationOperationSchema.extend(schema.shape);
};

import {
    PublishItemOperationSchema,
    UnPublishItemOperationSchema,
    UpdateItemComponentOperationSchema,
    UpdateSkuComponentOperationSchema,
    CreateDocumentOperationSchema,
    UpdateDocumentOperationSchema,
    UpsertDocumentOperationSchema,
    CreateFolderOperationSchema,
    UpdateFolderOperationSchema,
    UpsertFolderOperationSchema,
    CreateProductOperationSchema,
    UpdateProductOperationSchema,
    UpsertProductOperationSchema,
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

import { RegisterOrderOperationSchema, UpdateOrderOperationSchema, UpsertOrderOperationSchema } from './order.js';
import {
    CreateSubscriptionContractOperationSchema,
    UpdateSubscriptionContractOperationSchema,
    UpsertSubscriptionContractOperationSchema,
} from './subscription-contract.js';

export const OperationSchema = z.discriminatedUnion('intent', [
    withLoopingOperationProperties(CreateDocumentOperationSchema),
    withLoopingOperationProperties(UpdateDocumentOperationSchema),
    withLoopingOperationProperties(UpsertDocumentOperationSchema),

    withLoopingOperationProperties(CreateFolderOperationSchema),
    withLoopingOperationProperties(UpdateFolderOperationSchema),
    withLoopingOperationProperties(UpsertFolderOperationSchema),

    withLoopingOperationProperties(CreateProductOperationSchema),
    withLoopingOperationProperties(UpdateProductOperationSchema),
    withLoopingOperationProperties(UpsertProductOperationSchema),

    withLoopingOperationProperties(PublishItemOperationSchema),
    withLoopingOperationProperties(UnPublishItemOperationSchema),

    withLoopingOperationProperties(UpdateItemComponentOperationSchema),
    withLoopingOperationProperties(UpdateSkuComponentOperationSchema),

    withLoopingOperationProperties(CreateShapeOperationSchema),
    withLoopingOperationProperties(UpdateShapeOperationSchema),
    withLoopingOperationProperties(UpsertShapeOperationSchema),

    withLoopingOperationProperties(CreatePieceOperationSchema),
    withLoopingOperationProperties(UpdatePieceOperationSchema),
    withLoopingOperationProperties(UpsertPieceOperationSchema),

    withLoopingOperationProperties(ModifyProductVariantStockOperationSchema),

    withLoopingOperationProperties(CreateCustomerGroupOperationSchema),
    withLoopingOperationProperties(UpdateCustomerGroupOperationSchema),
    withLoopingOperationProperties(UpsertCustomerGroupOperationSchema),

    withLoopingOperationProperties(CreateCustomerOperationSchema),
    withLoopingOperationProperties(UpdateCustomerOperationSchema),
    withLoopingOperationProperties(UpsertCustomerOperationSchema),

    withLoopingOperationProperties(RegisterOrderOperationSchema),
    withLoopingOperationProperties(UpdateOrderOperationSchema),
    withLoopingOperationProperties(UpsertOrderOperationSchema),

    withLoopingOperationProperties(CreateSubscriptionContractOperationSchema),
    withLoopingOperationProperties(UpdateSubscriptionContractOperationSchema),
    withLoopingOperationProperties(UpsertSubscriptionContractOperationSchema),
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
    CreateDocumentOperation,
    UpdateDocumentOperation,
    UpsertDocumentOperation,
    CreateFolderOperation,
    UpdateFolderOperation,
    UpsertFolderOperation,
    CreateProductOperation,
    UpdateProductOperation,
    UpsertProductOperation,
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

export type { RegisterOrderOperation, UpdateOrderOperation, UpsertOrderOperation } from './order.js';
export type {
    CreateSubscriptionContractOperation,
    UpdateSubscriptionContractOperation,
    UpsertSubscriptionContractOperation,
} from './subscription-contract.js';
