import { z } from 'zod';

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
} from './item';
import {
    CreatePieceOperationSchema,
    CreateShapeOperationSchema,
    UpdatePieceOperationSchema,
    UpdateShapeOperationSchema,
    UpsertPieceOperationSchema,
    UpsertShapeOperationSchema,
} from './shape';
import { ModifyProductVariantStockOperationSchema } from './product-variant';
import {
    CreateCustomerGroupOperationSchema,
    CreateCustomerOperationSchema,
    UpdateCustomerGroupOperationSchema,
    UpdateCustomerOperationSchema,
    UpsertCustomerGroupOperationSchema,
    UpsertCustomerOperationSchema,
} from './customer';

import { RegisterOrderOperationSchema, UpdateOrderOperationSchema, UpsertOrderOperationSchema } from './order';
import {
    CreateSubscriptionContractOperationSchema,
    UpdateSubscriptionContractOperationSchema,
    UpsertSubscriptionContractOperationSchema,
} from './subscription-contract';

import { RegisterImageOperationSchema } from './asset';
import {
    CreatePriceListOperationSchema,
    UpdatePriceListOperationSchema,
    UpsertPriceListOperationSchema,
} from './pricelist';
import { CreateTopicOperationSchema, UpdateTopicOperationSchema, UpsertTopicOperationSchema } from './topic';
import { ModifyProductVariantPriceOperationSchema } from './product-variant';

export const OperationSchema = z.discriminatedUnion('intent', [
    CreateDocumentOperationSchema,
    UpdateDocumentOperationSchema,
    UpsertDocumentOperationSchema,

    CreateFolderOperationSchema,
    UpdateFolderOperationSchema,
    UpsertFolderOperationSchema,

    CreateProductOperationSchema,
    UpdateProductOperationSchema,
    UpsertProductOperationSchema,

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
    ModifyProductVariantPriceOperationSchema,
    RegisterImageOperationSchema,

    CreateCustomerGroupOperationSchema,
    UpdateCustomerGroupOperationSchema,
    UpsertCustomerGroupOperationSchema,

    CreateCustomerOperationSchema,
    UpdateCustomerOperationSchema,
    UpsertCustomerOperationSchema,

    RegisterOrderOperationSchema,
    UpdateOrderOperationSchema,
    UpsertOrderOperationSchema,

    CreateSubscriptionContractOperationSchema,
    UpdateSubscriptionContractOperationSchema,
    UpsertSubscriptionContractOperationSchema,

    CreatePriceListOperationSchema,
    UpdatePriceListOperationSchema,
    UpsertPriceListOperationSchema,

    CreateTopicOperationSchema,
    UpdateTopicOperationSchema,
    UpsertTopicOperationSchema,
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
} from './item';

export type {
    CreateShapeOperation,
    UpdateShapeOperation,
    UpsertShapeOperation,
    CreatePieceOperation,
    UpdatePieceOperation,
    UpsertPieceOperation,
} from './shape';

export type { ModifyProductVariantStockOperation } from './product-variant';

export type {
    CreateCustomerOperation,
    UpdateCustomerOperation,
    UpsertCustomerOperation,
    CreateCustomerGroupOperation,
    UpdateCustomerGroupOperation,
    UpsertCustomerGroupOperation,
} from './customer';

export type { RegisterOrderOperation, UpdateOrderOperation, UpsertOrderOperation } from './order';
export type {
    CreateSubscriptionContractOperation,
    UpdateSubscriptionContractOperation,
    UpsertSubscriptionContractOperation,
} from './subscription-contract';

export type { RegisterImageOperation } from './asset';
export type { CreatePriceListOperation, UpdatePriceListOperation, UpsertPriceListOperation } from './pricelist';
export type { CreateTopicOperation, UpdateTopicOperation, UpsertTopicOperation } from './topic';
