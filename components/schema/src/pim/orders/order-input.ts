import { z } from 'zod';
import { DateTimeSchema, IdSchema, KeyValuePairInputSchema } from '../../shared';
import { PaymentInputSchema } from '../payment/payment-input.js';
import { CreateCustomerInputSchema } from '../customers/customer-input';
import { OrderAppliedPromotionMechanismTypeSchema, OrderItemSubscriptionUnitSchema, OrderItemTypeSchema, OrderPaymentStatusSchema, OrderTypeSchema } from './order';

export const OrderAppliedPromotionInputSchema = z.object({
    identifier: z.string(),
    name: z.string(),
    meta: z.array(KeyValuePairInputSchema).nullish(),
    mechanism: z.object({
        type: OrderAppliedPromotionMechanismTypeSchema,
        value: z.number()
    })
});

export const OrderItemSubscriptionMeteredVariableInputSchema = z.object({
    id: z.string(),
    usage: z.number(),
    price: z.number(),
});
export type OrderItemSubscriptionMeteredVariableInput = z.infer<typeof OrderItemSubscriptionMeteredVariableInputSchema>;

export const OrderItemSubscriptionInputSchema = z.object({
    name: z.string().nullish(),
    period: z.number().min(0),
    unit: OrderItemSubscriptionUnitSchema,
    start: DateTimeSchema.nullish(),
    end: DateTimeSchema.nullish(),
    meteredVariables: z.array(OrderItemSubscriptionMeteredVariableInputSchema).nullish(),
});
export type OrderItemSubscriptionInput = z.infer<typeof OrderItemSubscriptionInputSchema>;

export const OrderPriceTaxInputSchema = z.object({
    name: z.string().nullish(),
    percent: z.number().nullish(),
    amount: z.number().nullish(),
});
export type OrderPriceTaxInput = z.infer<typeof OrderPriceTaxInputSchema>;

export const OrderPriceInputSchema = z.object({
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
    tax: OrderPriceTaxInputSchema.nullish(),
    taxBrackets: z.array(
        z.object({
            gross: z.number().nullish(),
            net: z.number().nullish(),
            tax: OrderPriceTaxInputSchema.nullish(),
        }),
    ).nullish(),
});
export type OrderPriceInput = z.infer<typeof OrderPriceInputSchema>;

export const OrderItemInputSchema = z
    .object({
        name: z.string(),
        sku: z.string().nullish(),
        productId: IdSchema.nullish(),
        imageUrl: z.string().nullish(),
        quantity: z.number().min(0),
        subscription: OrderItemSubscriptionInputSchema.nullish(),
        subscriptionContractId: IdSchema.nullish(),
        price: OrderPriceInputSchema.nullish(),
        subTotal: OrderPriceInputSchema.nullish(),
        meta: z.array(KeyValuePairInputSchema).nullish(),
        // order v2
        group: z.string().nullish(),
        type: OrderItemTypeSchema.nullish(),
    })
    .strict();
export type OrderItemInput = z.infer<typeof OrderItemInputSchema>;

export const OrderPipelineAssociationInputSchema = z.object({
    pipelineId: z.string(),
    stageId: z.string(),
});
export type OrderPipelineAssociationInput = z.infer<typeof OrderPipelineAssociationInputSchema>;
// ---

export const RegisterOrderInputSchema = z.object({
    additionalInformation: z.string().nullish(),
    cart: z.array(OrderItemInputSchema),
    createdAt: DateTimeSchema.nullish(),
    customer: CreateCustomerInputSchema,
    meta: z.array(KeyValuePairInputSchema).nullish(),
    payment: z.array(PaymentInputSchema).nullish(),
    pipelines: z.array(OrderPipelineAssociationInputSchema).nullish(),
    total: OrderPriceInputSchema.nullish(),
    // order v2
    appliedPromotions: z.array(OrderAppliedPromotionInputSchema).nullish(),
    paymentStatus: OrderPaymentStatusSchema.nullish(),
    relatedOrderIds: z.array(IdSchema).nullish(),
    type: OrderTypeSchema.nullish(),
    stockLocationIdentifier: z.string().nullish(),
});

export type RegisterOrderInput = z.infer<typeof RegisterOrderInputSchema>;

export const UpdateOrderInputSchema = RegisterOrderInputSchema.partial()
    .omit({
        pipelines: true,
        createdAt: true,
    })
    .extend({
        id: IdSchema,
    });
export type UpdateOrderInput = z.infer<typeof UpdateOrderInputSchema>;
