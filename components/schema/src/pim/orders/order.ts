import { z } from 'zod';
import { DateTimeSchema, IdSchema, KeyValuePairSchema } from '../../shared';
import { CustomerSchema } from '../customers';
import { PaymentSchema } from '../payment/payment';

export const OrderAppliedPromotionMechanismTypeSchema = z.enum([
    'custom',
    'dynamicFixed',
    'fixed',
    'percentage',
    'xForY',
]);
export type OrderAppliedPromotionMechanismType = z.infer<typeof OrderAppliedPromotionMechanismTypeSchema>;

export const OrderItemTypeSchema = z.enum([
    'bonus',
    'digital',
    'fee',
    'promotion',
    'refund',
    'service',
    'shipping',
    'standard',
    'subscription',
    'tax',
]);
export type OrderItemType = z.infer<typeof OrderItemTypeSchema>;

export const OrderPaymentStatusSchema = z.enum(['paid', 'partiallyPaid', 'partiallyRefunded', 'refunded', 'unpaid']);
export type OrderPaymentStatus = z.infer<typeof OrderPaymentStatusSchema>;

export const OrderTypeSchema = z.enum([
    'backorder',
    'creditNote',
    'draft',
    'preOrder',
    'quote',
    'recurring',
    'replacement',
    'split',
    'standard',
    'test',
]);
export type OrderType = z.infer<typeof OrderTypeSchema>;

export const OrderPriceTaxSchema = z.object({
    name: z.string().nullish(),
    percent: z.number().nullish(),
    amount: z.number().nullish(),
});
export type OrderPriceTax = z.infer<typeof OrderPriceTaxSchema>;

export const OrderConfirmationSchema = z.object({
    id: z.string(),
    createdAt: DateTimeSchema,
});
export type OrderConfirmation = z.infer<typeof OrderConfirmationSchema>;

export const OrderPriceSchema = z.object({
    gross: z.number().nullish(),
    net: z.number().nullish(),
    currency: z.string(),
    discounts: z
        .array(
            z.object({
                percent: z.number(),
            }),
        )
        .nullish(),
    tax: z
        .object({
            name: z.string().nullish(),
            percent: z.number().nullish(),
        })
        .nullish(),
    taxBreakdown: z
        .array(
            z.object({
                gross: z.number().nullish(),
                net: z.number().nullish(),
                tax: z
                    .object({
                        name: z.string().nullish(),
                        percent: z.number().nullish(),
                    })
                    .nullish(),
            }),
        )
        .nullish(),
});
export type OrderPrice = z.infer<typeof OrderPriceSchema>;

export const OrderItemSubscriptionMeteredVariableSchema = z.object({
    id: z.string(),
    usage: z.number(),
    price: z.number(),
});
export type OrderItemSubscriptionMeteredVariable = z.infer<typeof OrderItemSubscriptionMeteredVariableSchema>;

export const OrderItemSubscriptionUnitSchema = z.enum(['minute', 'hour', 'day', 'week', 'month', 'year']);
export type OrderItemSubscriptionUnit = z.infer<typeof OrderItemSubscriptionUnitSchema>;

export const OrderItemSubscriptionSchema = z.object({
    name: z.string().optional(),
    period: z.number().min(0),
    unit: OrderItemSubscriptionUnitSchema,
    start: DateTimeSchema.optional(),
    end: DateTimeSchema.optional(),
    meteredVariables: z.array(OrderItemSubscriptionMeteredVariableSchema).optional(),
});
export type OrderItemSubscription = z.infer<typeof OrderItemSubscriptionSchema>;

export const OrderItemSchema = z.object({
    name: z.string().optional(),
    sku: z.string().optional(),
    productId: z.string().optional(),
    imageUrl: z.string().optional(),
    quantity: z.number().min(0),
    subscriptionContractId: z.string().optional(),
    price: OrderPriceSchema.optional(),
    subTotal: OrderPriceSchema.optional(),
    meta: z.array(KeyValuePairSchema).optional(),
    subscription: OrderItemSubscriptionSchema.optional(),
    // order v2
    group: z.string().optional(),
    type: OrderItemTypeSchema.optional(),
});
export type OrderItem = z.infer<typeof OrderItemSchema>;

export const OrderPipelineStageSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    createdAt: DateTimeSchema.nullish(),
    placeNewOrders: z.boolean().optional(),
});
export type OrderPipelineStage = z.infer<typeof OrderPipelineStageSchema>;

export const OrderPipelineSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    createdAt: DateTimeSchema.nullish(),
    states: z.array(OrderPipelineStageSchema).optional(),
});
export type OrderPipeline = z.infer<typeof OrderPipelineSchema>;

export const OrderPipelineAssociationSchema = z.object({
    pipelineId: IdSchema.optional(),
    stageId: IdSchema.optional(),
    pipeline: OrderPipelineSchema.optional,
    stage: OrderPipelineStageSchema.optional(),
});
export type OrderPipelineAssociation = z.infer<typeof OrderPipelineAssociationSchema>;

export const OrderSchema = z.object({
    id: IdSchema.optional(),
    reference: z.string().nullish(),
    createdAt: DateTimeSchema.nullish(),
    updatedAt: DateTimeSchema.nullish(),
    additionalInformation: z.string().nullish(),
    cart: z.array(OrderItemSchema).optional(),
    customer: CustomerSchema.optional(),
    payment: z.array(PaymentSchema).nullish(),
    total: OrderPriceSchema.nullish(),
    pipelines: z.array(OrderPipelineAssociationSchema).nullish(),
    meta: z.array(KeyValuePairSchema).nullish(),
    // order v2
    appliedPromotions: z
        .array(
            z.object({
                identifier: z.string().optional(),
                name: z.string().optional(),
                meta: z.array(KeyValuePairSchema).optional(),
                mechanism: z
                    .object({
                        type: OrderAppliedPromotionMechanismTypeSchema.optional(),
                        value: z.number().optional(),
                    })
                    .optional(),
            }),
        )
        .nullish(),
    paymentStatus: OrderPaymentStatusSchema.nullish(),
    relatedOrderIds: z.array(IdSchema).nullish(),
    type: OrderTypeSchema.nullish(),
    stockLocationIdentifier: z.string().nullish(),
});
export type Order = z.infer<typeof OrderSchema>;
