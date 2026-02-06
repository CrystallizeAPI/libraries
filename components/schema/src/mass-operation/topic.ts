import { z } from 'zod';
import { CreateTopicInputSchema, UpdateTopicInputSchema } from '../pim';
import { checkResourceIdentifierOrId, IdSchema, RefSchema, ResourceIdentifierSchema } from '../shared';

export const CreateTopicOperationSchema = CreateTopicInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('topic/create'),
    language: z.string(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});
export type CreateTopicOperation = z.infer<typeof CreateTopicOperationSchema>;

export const UpdateTopicOperationSchema = UpdateTopicInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('topic/update'),
    language: z.string(),
    topicId: IdSchema.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
}).superRefine(checkResourceIdentifierOrId);
export type UpdateTopicOperation = z.infer<typeof UpdateTopicOperationSchema>;

export const UpsertTopicOperationSchema = CreateTopicInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('topic/upsert'),
    language: z.string(),
    topicId: IdSchema.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
}).superRefine(checkResourceIdentifierOrId);
export type UpsertTopicOperation = z.infer<typeof UpsertTopicOperationSchema>;
