import { z } from 'zod';
import { ComponentContentInputSchema } from '../pim/components/component-content-input';
import {
    CreateDocumentInputSchema,
    CreateFolderInputSchema,
    CreateProductInputSchema,
    UpdateDocumentInputSchema,
    UpdateFolderInputSchema,
    UpdateProductInputSchema,
} from '../pim/index';
import { checkResourceIdentifierOrId, IdSchema, RefSchema, ResourceIdentifierSchema } from '../shared';

export const CreateDocumentOperationSchema = CreateDocumentInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('document/create'),
    language: z.string().min(1),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});

export const UpdateDocumentOperationSchema = UpdateDocumentInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('document/update'),
    language: z.string().min(1),
    itemId: IdSchema.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
}).superRefine(checkResourceIdentifierOrId);

export const UpsertDocumentOperationSchema = CreateDocumentInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('document/upsert'),
    language: z.string().min(1),
    itemId: IdSchema.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});

export const CreateFolderOperationSchema = CreateFolderInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('folder/create'),
    language: z.string().min(1),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});

export const UpdateFolderOperationSchema = UpdateFolderInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('folder/update'),
    language: z.string().min(1),
    itemId: IdSchema.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
}).superRefine(checkResourceIdentifierOrId);

export const UpsertFolderOperationSchema = CreateFolderInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('folder/upsert'),
    language: z.string().min(1),
    itemId: IdSchema.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});

export const CreateProductOperationSchema = CreateProductInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('product/create'),
    language: z.string().min(1),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});

export const UpdateProductOperationSchema = UpdateProductInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('product/update'),
    language: z.string().min(1),
    itemId: IdSchema.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
}).superRefine(checkResourceIdentifierOrId);

export const UpsertProductOperationSchema = CreateProductInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('product/upsert'),
    language: z.string().min(1),
    itemId: IdSchema.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});

export const UpdateItemComponentOperationSchema = z
    .object({
        _ref: RefSchema.optional(),
        intent: z.literal('item/updateComponent/item'),
        language: z.string().min(1),
        component: ComponentContentInputSchema,
        itemId: IdSchema.optional(),
        resourceIdentifier: ResourceIdentifierSchema.optional(),
    })
    .superRefine(checkResourceIdentifierOrId);

export const UpdateSkuComponentOperationSchema = z.object({
    _ref: RefSchema.optional(),
    intent: z.literal('item/updateComponent/sku'),
    language: z.string().min(1),
    component: ComponentContentInputSchema,
    sku: z.string(),
});

export const PublishItemOperationSchema = z.object({
    _ref: RefSchema.optional(),
    intent: z.literal('item/publish'),
    language: z.string().min(1),
    includeDescendants: z.boolean().optional(),
    itemId: IdSchema.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});

export const UnPublishItemOperationSchema = PublishItemOperationSchema.omit({ intent: true }).extend({
    intent: z.literal('item/unpublish'),
});

export const DeleteItemOperationSchema = z.object({
    _ref: RefSchema.optional(),
    intent: z.literal('item/delete'),
    itemId: IdSchema.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});

export type UpdateItemComponentOperation = z.infer<typeof UpdateItemComponentOperationSchema>;
export type UpdateSkuComponentOperation = z.infer<typeof UpdateSkuComponentOperationSchema>;
export type PublishItemOperation = z.infer<typeof PublishItemOperationSchema>;
export type UnPublishItemOperation = z.infer<typeof UnPublishItemOperationSchema>;
export type DeleteItemOperation = z.infer<typeof DeleteItemOperationSchema>;

export type CreateDocumentOperation = z.infer<typeof CreateDocumentOperationSchema>;
export type UpdateDocumentOperation = z.infer<typeof UpdateDocumentOperationSchema>;
export type UpsertDocumentOperation = z.infer<typeof UpsertDocumentOperationSchema>;

export type CreateFolderOperation = z.infer<typeof CreateFolderOperationSchema>;
export type UpdateFolderOperation = z.infer<typeof UpdateFolderOperationSchema>;
export type UpsertFolderOperation = z.infer<typeof UpsertFolderOperationSchema>;

export type CreateProductOperation = z.infer<typeof CreateProductOperationSchema>;
export type UpdateProductOperation = z.infer<typeof UpdateProductOperationSchema>;
export type UpsertProductOperation = z.infer<typeof UpsertProductOperationSchema>;
