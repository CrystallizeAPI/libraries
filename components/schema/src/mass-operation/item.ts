import { z } from 'zod';
import { IdSchema, ItemTypeSchema } from '../shared/index.js';
import { ComponentContentInputSchema } from '../pim/components/component-content-input.js';

export const CreateItemOperationSchema = z.object({
    intent: z.literal('item/create'),
    type: ItemTypeSchema,
    shape: z.string().min(1),
    language: z.string().min(1),
    topics: z.array(IdSchema).optional(),
    components: z.array(ComponentContentInputSchema),
});

export const UpdateItemOperationSchema = CreateItemOperationSchema.omit({
    intent: true,
    type: true,
    shape: true,
}).merge(
    z.object({
        intent: z.literal('item/update'),
        itemId: IdSchema,
    }),
);

export const UpsertItemOperationSchema = UpdateItemOperationSchema.omit({ intent: true }).merge(
    z.object({
        intent: z.literal('item/upsert'),
    }),
);

export const UpdateItemComponentOperationSchema = UpdateItemOperationSchema.omit({
    intent: true,
    itemId: true,
    components: true,
    topics: true,
}).extend({
    intent: z.literal('item/updateComponent/item'),
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

export type CreateItemOperation = z.infer<typeof CreateItemOperationSchema>;
export type UpdateItemOperation = z.infer<typeof UpdateItemOperationSchema>;
export type UpsertItemOperation = z.infer<typeof UpsertItemOperationSchema>;
export type UpdateItemComponentOperation = z.infer<typeof UpdateItemComponentOperationSchema>;
export type UpdateSkuComponentOperation = z.infer<typeof UpdateSkuComponentOperationSchema>;
export type PublishItemOperation = z.infer<typeof PublishItemOperationSchema>;
export type UnPublishItemOperation = z.infer<typeof UnPublishItemOperationSchema>;
