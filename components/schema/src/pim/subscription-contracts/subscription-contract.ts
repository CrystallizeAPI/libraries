import { z } from 'zod';
import { DateTimeSchema, IdSchema, KeyValuePairSchema } from '../../shared';
import { AddressSchema } from '../addresses';
import { PaymentSchema } from '../payment/payment';
import { CustomerSchema } from '../customers';

export const SubscriptionContractTierTypeSchema = z.enum(['graduated', 'volume']);
export type SubscriptionContractTierType = z.infer<typeof SubscriptionContractTierTypeSchema>;

export const SubscriptionContractStatusStateSchema = z.enum([
    'active',
    'paused',
    'cancelled',
    'pendingActivation',
    'pendingDeactivation',
]);
export type SubscriptionContractStatusState = z.infer<typeof SubscriptionContractStatusStateSchema>;

export const SubscriptionContractPeriodUnitSchema = z.enum(['day', 'week', 'month', 'year']);
export type SubscriptionContractPeriodUnit = z.infer<typeof SubscriptionContractPeriodUnitSchema>;

export const SubscriptionContractMeteredVariableReferenceSchema = z.object({
    id: IdSchema.optional(),
    identifier: z.string().optional(),
    name: z.string().optional(),
    unit: z.string().optional(),
    tierType: SubscriptionContractTierTypeSchema.optional(),
    tiers: z
        .array(
            z.object({
                currency: z.string().optional(),
                price: z.number().optional(),
                threshold: z.number().optional(),
            }),
        )
        .optional(),
});
export type SubscriptionContractMeteredVariableReference = z.infer<
    typeof SubscriptionContractMeteredVariableReferenceSchema
>;

export const SubscriptionContractItemSchema = z.object({
    sku: z.string().optional(),
    quantity: z.number().nullish(),
    name: z.string().nullish(),
    imageUrl: z.string().nullish(),
    meta: z.array(KeyValuePairSchema).nullish(),
});
export type SubscriptionContractItem = z.infer<typeof SubscriptionContractItemSchema>;

export const SubscriptionContractPhaseSchema = z.object({
    currency: z.string().optional(),
    price: z.number().optional(),
    period: z.int().optional(),
    unit: SubscriptionContractPeriodUnitSchema.optional(),
    meteredVariables: z.array(SubscriptionContractMeteredVariableReferenceSchema).nullish(),
    productVariants: z.array(SubscriptionContractItemSchema).nullish(),
});
export type SubscriptionContractPhase = z.infer<typeof SubscriptionContractPhaseSchema>;

export const SubscriptionContractStatusSchema = z.object({
    activateAt: DateTimeSchema.nullish(),
    activeUntil: DateTimeSchema.nullish(),
    renewAt: DateTimeSchema.nullish(),
    state: SubscriptionContractStatusStateSchema.optional(),
    phase: SubscriptionContractPhaseSchema.optional(),
});
export type SubscriptionContractStatus = z.infer<typeof SubscriptionContractStatusSchema>;

export const SubscriptionContractSchema = z.object({
    id: IdSchema.optional(),
    customerIdentifier: z.string().optional(),
    customer: CustomerSchema.optional(),
    signedAt: DateTimeSchema.nullish(),
    addresses: z.array(AddressSchema).nullish(),
    initial: SubscriptionContractPhaseSchema.nullish(),
    recurring: SubscriptionContractPhaseSchema.optional(),
    item: SubscriptionContractItemSchema.optional(),
    meta: z.array(KeyValuePairSchema).nullish(),
    subscriptionPlan: z
        .object({
            identifier: z.string().optional(),
            periodId: IdSchema.optional(),
            periodName: z.string().optional(),
        })
        .optional(),
    payment: PaymentSchema.optional(),
    status: SubscriptionContractStatusSchema.optional(),
});
export type SubscriptionContract = z.infer<typeof SubscriptionContractSchema>;
