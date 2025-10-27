import { z } from 'zod';
import { ComponentContentInputSchema } from '../pim/components/component-content-input.js';
import {
    CreateDocumentInputSchema,
    CreateFolderInputSchema,
    CreateProductInputSchema,
    UpdateDocumentInputSchema,
    UpdateFolderInputSchema,
    UpdateProductInputSchema,
} from '../pim/index.js';
import { IdSchema } from '../shared/index.js';

export const CreateDocumentOperationSchema = CreateDocumentInputSchema.extend({
    intent: z.literal('document/create'),
    language: z.string().min(1),
});

export const UpdateDocumentOperationSchema = UpdateDocumentInputSchema.extend({
    intent: z.literal('document/update'),
    itemId: IdSchema,
    language: z.string().min(1),
});

export const UpsertDocumentOperationSchema = CreateDocumentInputSchema.extend({
    intent: z.literal('document/upsert'),
    language: z.string().min(1),
    itemId: IdSchema,
});

export const CreateFolderOperationSchema = CreateFolderInputSchema.extend({
    intent: z.literal('folder/create'),
    language: z.string().min(1),
});

export const UpdateFolderOperationSchema = UpdateFolderInputSchema.extend({
    intent: z.literal('folder/update'),
    language: z.string().min(1),
    itemId: IdSchema,
});

export const UpsertFolderOperationSchema = CreateFolderInputSchema.extend({
    intent: z.literal('folder/upsert'),
    language: z.string().min(1),
    itemId: IdSchema,
});

export const CreateProductOperationSchema = CreateProductInputSchema.extend({
    intent: z.literal('product/create'),
    language: z.string().min(1),
});

export const UpdateProductOperationSchema = UpdateProductInputSchema.extend({
    intent: z.literal('product/update'),
    language: z.string().min(1),
    itemId: IdSchema,
});

export const UpsertProductOperationSchema = CreateProductInputSchema.extend({
    intent: z.literal('product/upsert'),
    language: z.string().min(1),
    itemId: IdSchema,
});

export const UpdateItemComponentOperationSchema = z.object({
    intent: z.literal('item/updateComponent/item'),
    language: z.string().min(1),
    component: ComponentContentInputSchema,
    sku: z.never().optional(),
    itemId: IdSchema,
});

export const UpdateSkuComponentOperationSchema = UpdateItemComponentOperationSchema.omit({
    intent: true,
    itemId: true,
    sku: true,
}).extend({
    intent: z.literal('item/updateComponent/sku'),
    sku: z.string(),
    itemId: z.never().optional(),
});

export const PublishItemOperationSchema = z.object({
    intent: z.literal('item/publish'),
    itemId: IdSchema,
    language: z.string().min(1),
    includeDescendants: z.boolean().optional(),
});

export const UnPublishItemOperationSchema = PublishItemOperationSchema.omit({ intent: true }).merge(
    z.object({
        intent: z.literal('item/unpublish'),
    }),
);

export type UpdateItemComponentOperation = z.infer<typeof UpdateItemComponentOperationSchema>;
export type UpdateSkuComponentOperation = z.infer<typeof UpdateSkuComponentOperationSchema>;
export type PublishItemOperation = z.infer<typeof PublishItemOperationSchema>;
export type UnPublishItemOperation = z.infer<typeof UnPublishItemOperationSchema>;

export type CreateDocumentOperation = z.infer<typeof CreateDocumentOperationSchema>;
export type UpdateDocumentOperation = z.infer<typeof UpdateDocumentOperationSchema>;
export type UpsertDocumentOperation = z.infer<typeof UpsertDocumentOperationSchema>;

export type CreateFolderOperation = z.infer<typeof CreateFolderOperationSchema>;
export type UpdateFolderOperation = z.infer<typeof UpdateFolderOperationSchema>;
export type UpsertFolderOperation = z.infer<typeof UpsertFolderOperationSchema>;

export type CreateProductOperation = z.infer<typeof CreateProductOperationSchema>;
export type UpdateProductOperation = z.infer<typeof UpdateProductOperationSchema>;
export type UpsertProductOperation = z.infer<typeof UpsertProductOperationSchema>;
