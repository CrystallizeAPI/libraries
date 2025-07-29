import { z } from 'zod';
import { CreateSubscriptionContractInputSchema, UpdateSubscriptionContractInputSchema } from '../pim';

export const CreateSubscriptionContractOperationSchema = CreateSubscriptionContractInputSchema.extend({
    intent: z.literal('subscription-contract/create'),
});
export type CreateSubscriptionContractOperation = z.infer<typeof CreateSubscriptionContractOperationSchema>;

export const UpdateSubscriptionContractOperationSchema = UpdateSubscriptionContractInputSchema.extend({
    intent: z.literal('subscription-contract/update'),
});
export type UpdateSubscriptionContractOperation = z.infer<typeof UpdateSubscriptionContractOperationSchema>;

export const UpsertSubscriptionContractOperationSchema = CreateSubscriptionContractInputSchema.extend({
    intent: z.literal('subscription-contract/upsert'),
    id: UpdateSubscriptionContractOperationSchema.shape.id.optional(),
});
export type UpsertSubscriptionContractOperation = z.infer<typeof UpsertSubscriptionContractOperationSchema>;
