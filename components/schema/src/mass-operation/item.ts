import { z } from 'zod';
import { ComponentInputSchema } from '../item/components/index.js';

export const CreateItemOperationSchema = z.object({
    concern: z.literal('item'),
    action: z.literal('create'),
    type: z.enum(['product', 'document', 'folder']),
    shape: z.string().min(1),
    language: z.string().min(1),
    topics: z.array(z.string()).optional(),
    components: z.array(ComponentInputSchema),
});

export const UpdateItemOperationSchema = CreateItemOperationSchema.omit({
    action: true,
    type: true,
    shape: true,
}).merge(
    z.object({
        action: z.literal('update'),
        itemId: z.string().min(1),
    }),
);

export const UpsertItemOperationSchema = UpdateItemOperationSchema.omit({ action: true }).merge(
    z.object({
        action: z.literal('upsert'),
    }),
);

export const UpdateCompomentOperationSchema = UpdateItemOperationSchema.omit({
    action: true,
    components: true,
    topics: true,
}).merge(
    z.object({
        action: z.literal('updateComponent'),
        component: ComponentInputSchema,
    }),
);

export const PublishItemOperationSchema = z.object({
    concern: z.literal('item'),
    action: z.literal('publish'),
    itemId: z.string().min(1),
    language: z.string().min(1),
    includeDescendants: z.boolean().optional(),
});

export const UnPublishItemOperationSchema = PublishItemOperationSchema.omit({ action: true }).merge(
    z.object({
        action: z.literal('unpublish'),
    }),
);

export type CreateItemOperation = z.infer<typeof CreateItemOperationSchema>;
export type UpdateItemOperation = z.infer<typeof UpdateItemOperationSchema>;
export type UpsertItemOperation = z.infer<typeof UpsertItemOperationSchema>;
export type UpdateCompomentOperation = z.infer<typeof UpdateCompomentOperationSchema>;
export type PublishItemOperation = z.infer<typeof PublishItemOperationSchema>;
export type UnPublishItemOperation = z.infer<typeof UnPublishItemOperationSchema>;
