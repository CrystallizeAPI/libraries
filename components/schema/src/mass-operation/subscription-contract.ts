import { z } from 'zod';
import { CreateSubscriptionContractInputSchema, UpdateSubscriptionContractInputSchema } from '../pim';
import { checkResourceIdentifierOrId, RefSchema, ResourceIdentifierSchema } from '../shared';

export const CreateSubscriptionContractOperationSchema = CreateSubscriptionContractInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('subscription-contract/create'),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});
export type CreateSubscriptionContractOperation = z.infer<typeof CreateSubscriptionContractOperationSchema>;

export const UpdateSubscriptionContractOperationSchema = UpdateSubscriptionContractInputSchema.omit({ id: true })
    .extend({
        _ref: RefSchema.optional(),
        intent: z.literal('subscription-contract/update'),
        id: UpdateSubscriptionContractInputSchema.shape.id.optional(),
        resourceIdentifier: ResourceIdentifierSchema.optional(),
    })
    .superRefine(checkResourceIdentifierOrId);

export type UpdateSubscriptionContractOperation = z.infer<typeof UpdateSubscriptionContractOperationSchema>;

export const UpsertSubscriptionContractOperationSchema = CreateSubscriptionContractInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('subscription-contract/upsert'),
    id: UpdateSubscriptionContractInputSchema.shape.id.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});

export type UpsertSubscriptionContractOperation = z.infer<typeof UpsertSubscriptionContractOperationSchema>;
