import { z } from 'zod';
import { AddressInputSchema } from '../addresses';
import { PaymentInputSchema } from '../payment';
import { DateTimeSchema, IdSchema, KeyValuePairInputSchema } from '../../shared';
import { SubscriptionContractPeriodUnitSchema, SubscriptionContractTierTypeSchema } from './subscription-contract';

export const SubscriptionContractMeteredVariableTierInputSchema = z.object({
    currency: z.string(),
    price: z.number(),
    threshold: z.number(),
});
export type SubscriptionContractMeteredVariableTierInput = z.infer<
    typeof SubscriptionContractMeteredVariableTierInputSchema
>;

export const SubscriptionContractMeteredVariableReferenceInputSchema = z.object({
    identifier: z.string(),
    tierType: SubscriptionContractTierTypeSchema,
    tiers: z.array(SubscriptionContractMeteredVariableTierInputSchema),
});

export type SubscriptionContractMeteredVariableReferenceInput = z.infer<
    typeof SubscriptionContractMeteredVariableReferenceInputSchema
>;

export const SubscriptionContractItemInputSchema = z.object({
    sku: z.string(),
    quantity: z.number().nullish(),
    name: z.string().nullish(),
    imageUrl: z.string().nullish(),
    meta: z.array(KeyValuePairInputSchema).nullish(),
});
export type SubscriptionContractItemInput = z.infer<typeof SubscriptionContractItemInputSchema>;

export const SubscriptionContractPhaseInputSchema = z.object({
    currency: z.string(),
    price: z.number(),
    period: z.int().optional(),
    unit: SubscriptionContractPeriodUnitSchema.optional(),
    meteredVariables: z.array(SubscriptionContractMeteredVariableReferenceInputSchema).nullish(),
    productVariants: z.array(SubscriptionContractItemInputSchema).nullish(),
});
export type SubscriptionContractPhaseInput = z.infer<typeof SubscriptionContractPhaseInputSchema>;

export const SubscriptionContractStatusInputSchema = z.object({
    activateAt: DateTimeSchema.nullish(),
    activeUntil: DateTimeSchema.nullish(),
    renewAt: DateTimeSchema.nullish(),
});
export type SubscriptionContractStatusInput = z.infer<typeof SubscriptionContractStatusInputSchema>;

export const CreateSubscriptionContractInputSchema = z.object({
    customerIdentifier: z.string(),
    addresses: z.array(AddressInputSchema).optional(),
    payment: PaymentInputSchema.optional(),
    subscriptionPlan: z.object({
        identifier: z.string(),
        periodId: IdSchema,
        periodName: z.string(),
    }),
    status: SubscriptionContractStatusInputSchema,
    item: SubscriptionContractItemInputSchema,
    signedAt: DateTimeSchema.nullish(),
    initial: SubscriptionContractPhaseInputSchema.nullish(),
    recurring: SubscriptionContractPhaseInputSchema,
    meta: z.array(KeyValuePairInputSchema).nullish(),
});
export type CreateSubscriptionContractInput = z.infer<typeof CreateSubscriptionContractInputSchema>;

export const UpdateSubscriptionContractInputSchema = CreateSubscriptionContractInputSchema.partial()
    .omit({
        customerIdentifier: true,
        status: true,
    })
    .extend({
        id: IdSchema,
        status: SubscriptionContractStatusInputSchema.optional(),
    });
export type UpdateSubscriptionContractInput = z.infer<typeof UpdateSubscriptionContractInputSchema>;
