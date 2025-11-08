import { z } from 'zod';
import { CreateSubscriptionContractInputSchema, UpdateSubscriptionContractInputSchema } from '../pim';
import { checkTuriOrId, RefSchema, TURISchema } from '../shared';

export const CreateSubscriptionContractOperationSchema = CreateSubscriptionContractInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('subscription-contract/create'),
    turi: TURISchema.optional(),
});
export type CreateSubscriptionContractOperation = z.infer<typeof CreateSubscriptionContractOperationSchema>;

export const UpdateSubscriptionContractOperationSchema = UpdateSubscriptionContractInputSchema.omit({ id: true })
    .extend({
        _ref: RefSchema.optional(),
        intent: z.literal('subscription-contract/update'),
        id: UpdateSubscriptionContractInputSchema.shape.id.optional(),
        turi: TURISchema.optional(),
    })
    .superRefine(checkTuriOrId);

export type UpdateSubscriptionContractOperation = z.infer<typeof UpdateSubscriptionContractOperationSchema>;

export const UpsertSubscriptionContractOperationSchema = CreateSubscriptionContractInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('subscription-contract/upsert'),
    id: UpdateSubscriptionContractInputSchema.shape.id.optional(),
    turi: TURISchema.optional(),
});

export type UpsertSubscriptionContractOperation = z.infer<typeof UpsertSubscriptionContractOperationSchema>;
