import { z } from 'zod';
import { DateTimeSchema } from '../shared';
import { CustomerSchema } from './from-core/customer';
import { MetaInputSchema, MetaSchema, id } from './from-core/metadata';

// Shop API `/order` endpoint (not copied from Core: these types only exist on the Shop API)

export const OrderTypeSchema = z.enum([
    'standard',
    'draft',
    'creditNote',
    'replacement',
    'backorder',
    'preOrder',
    'quote',
    'recurring',
    'split',
    'test',
]);
export type OrderType = z.infer<typeof OrderTypeSchema>;

export const OrderPaymentStatusSchema = z.enum(['paid', 'partiallyPaid', 'partiallyRefunded', 'refunded', 'unpaid']);
export type OrderPaymentStatus = z.infer<typeof OrderPaymentStatusSchema>;

export const OrderItemTypeSchema = z.enum([
    'standard',
    'subscription',
    'shipping',
    'fee',
    'promotion',
    'refund',
    'service',
    'digital',
    'bonus',
    'tax',
]);
export type OrderItemType = z.infer<typeof OrderItemTypeSchema>;

// Inputs

/** A generic payment record: `provider` is a free string, nothing is validated against a payment provider. */
export const OrderPaymentInputSchema = z.object({
    provider: z.string().optional(),
    transactionId: z.string().optional(),
    amount: z.number().optional(),
    method: z.string().optional(),
    createdAt: DateTimeSchema.optional(),
    meta: MetaInputSchema.optional(),
});
export type OrderPaymentInput = z.infer<typeof OrderPaymentInputSchema>;

export const OrderPipelineInputSchema = z.object({
    identifier: z.string(),
    stage: z.string().optional(),
});
export type OrderPipelineInput = z.infer<typeof OrderPipelineInputSchema>;

export const OrderFromCartInputSchema = z.object({
    type: OrderTypeSchema.optional(),
    paymentStatus: OrderPaymentStatusSchema.optional(),
    payments: z.array(OrderPaymentInputSchema).optional(),
    pipelines: z.array(OrderPipelineInputSchema).optional(),
    stockLocationIdentifier: z.string().optional(),
    relatedOrderIds: z.array(z.string()).optional(),
    additionalInformation: z.string().optional(),
});
export type OrderFromCartInput = z.infer<typeof OrderFromCartInputSchema>;

// Outputs

export const OrderPriceSchema = z.object({
    gross: z.number(),
    net: z.number(),
    taxAmount: z.number(),
    taxPercent: z.number(),
    currency: z.string(),
    discounts: z
        .array(
            z.object({
                percent: z.number(),
                amount: z.number(),
            }),
        )
        .nullish(),
});
export type OrderPrice = z.infer<typeof OrderPriceSchema>;

export const OrderTotalPriceSchema = OrderPriceSchema.extend({
    taxBreakdown: z
        .array(
            z.object({
                percent: z.number(),
                base: z.number(),
                amount: z.number(),
            }),
        )
        .nullish(),
});
export type OrderTotalPrice = z.infer<typeof OrderTotalPriceSchema>;

export const OrderItemSchema = z.object({
    name: z.string(),
    sku: z.string().nullish(),
    productId: z.string().nullish(),
    lineId: z.string().nullish(),
    quantity: z.number().nullish(),
    group: z.string().nullish(),
    type: OrderItemTypeSchema.nullish(),
    imageUrl: z.string().nullish(),
    price: OrderPriceSchema,
    subTotal: OrderPriceSchema,
    subscriptionContractId: z.string().nullish(),
    subscription: z
        .object({
            name: z.string().nullish(),
            start: z.string(),
            end: z.string(),
            period: z.number(),
            unit: z.string(),
            meteredVariables: z
                .array(
                    z.object({
                        identifier: z.string(),
                        price: z.number(),
                        usage: z.number(),
                    }),
                )
                .nullish(),
        })
        .nullish(),
    booking: z
        .object({
            start: z.string(),
            end: z.string(),
            unitId: z.string().nullish(),
        })
        .nullish(),
    resolvedTier: z
        .object({
            threshold: z.number(),
            price: z.number(),
        })
        .nullish(),
    meta: MetaSchema.nullish(),
});
export type OrderItem = z.infer<typeof OrderItemSchema>;

export const OrderPaymentSchema = z.object({
    provider: z.string().nullish(),
    transactionId: z.string().nullish(),
    amount: z.number().nullish(),
    method: z.string().nullish(),
    createdAt: z.string().nullish(),
    /**
     * A JSON object (`HashMap` scalar), e.g. `{ intentId: 'pi_123' }`,
     * NOT the `[{ key, value }]` list you send in `OrderPaymentInput.meta`.
     */
    meta: MetaSchema.nullish(),
});
export type OrderPayment = z.infer<typeof OrderPaymentSchema>;

export const OrderPipelineSchema = z.object({
    identifier: z.string().nullish(),
    stage: z.string().nullish(),
});
export type OrderPipeline = z.infer<typeof OrderPipelineSchema>;

/**
 * An order as returned by the Shop API `/order` endpoint.
 *
 * Orders created with `createFromCart` and payments written with `addPayments` / `setPayments`
 * are persisted just after the response is sent, so a read issued immediately after can lag behind.
 */
export const OrderSchema = z.object({
    id,
    /** The Core API order id. */
    coreId: z.string().nullish(),
    reference: z.string().nullish(),
    type: OrderTypeSchema.nullish(),
    additionalInformation: z.string().nullish(),
    stockLocationIdentifier: z.string().nullish(),
    relatedOrderIds: z.array(z.string()).nullish(),
    createdAt: z.string().nullish(),
    updatedAt: z.string().nullish(),
    context: z.record(z.string(), z.unknown()).nullish(),
    customer: CustomerSchema.nullish(),
    items: z.array(OrderItemSchema).nullish(),
    total: OrderTotalPriceSchema,
    paymentStatus: OrderPaymentStatusSchema.nullish(),
    payments: z.array(OrderPaymentSchema).nullish(),
    pipelines: z.array(OrderPipelineSchema).nullish(),
    appliedPromotions: z
        .array(
            z.object({
                identifier: z.string(),
                name: z.string().nullish(),
                mechanism: z
                    .object({
                        type: z.enum(['Percentage', 'Fixed', 'DynamicFixed', 'XforY']).nullish(),
                        value: z.number().nullish(),
                    })
                    .nullish(),
            }),
        )
        .nullish(),
    /** A JSON object (`HashMap` scalar), not a `[{ key, value }]` list. */
    meta: MetaSchema.nullish(),
});
export type Order = z.infer<typeof OrderSchema>;
