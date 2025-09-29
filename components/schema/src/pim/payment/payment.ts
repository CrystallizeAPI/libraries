import { z } from 'zod';

// Klarna
export const KlarnaPaymentSchema = z.object({
    id: z.string().nullish(),
    merchantReference1: z.string().nullish(),
    merchantReference2: z.string().nullish(),
    metadata: z.string().nullish(),
    orderId: z.string().nullish(),
    recurringToken: z.string().nullish(),
    status: z.string().nullish(),
});
export type KlarnaPayment = z.infer<typeof KlarnaPaymentSchema>;

// Paypal
export const PaypalPaymentSchema = z.object({
    id: z.string().nullish(),
    invoiceId: z.string().nullish(),
    metadata: z.string().nullish(),
    orderId: z.string().nullish(),
    subscriptionId: z.string().nullish(),
});
export type PaypalPayment = z.infer<typeof PaypalPaymentSchema>;

// Stripe
export const StripePaymentSchema = z.object({
    stripe: z.string().nullish(),
    customerId: z.string().nullish(),
    orderId: z.string().nullish(),
    paymentMethod: z.string().nullish(),
    paymentMethodId: z.string().nullish(),
    paymentIntentId: z.string().nullish(),
    subscriptionId: z.string().nullish(),
    metadata: z.string().nullish(),
});
export type StripePayment = z.infer<typeof StripePaymentSchema>;

// Cash
export const CashPaymentSchema = z.object({
    cash: z.string().nullish(),
});
export type CashPayment = z.infer<typeof CashPaymentSchema>;

// Custom
export const CustomPaymentSchema = z.object({
    properties: z
        .array(
            z.object({
                property: z.string(),
                value: z.string().nullish(),
            }),
        )
        .optional(),
});
export type CustomPayment = z.infer<typeof CustomPaymentSchema>;

export const PaymentSchema = z.discriminatedUnion('provider', [
    z.object({
        provider: z.literal('klarna'),
        ...KlarnaPaymentSchema.shape,
    }),
    z.object({
        provider: z.literal('paypal'),
        ...PaypalPaymentSchema.shape,
    }),
    z.object({
        provider: z.literal('stripe'),
        ...StripePaymentSchema.shape,
    }),
    z.object({
        provider: z.literal('cash'),
        ...CashPaymentSchema.shape,
    }),
    z.object({
        provider: z.literal('custom'),
        ...CustomPaymentSchema.shape,
    }),
]);

export type Payment = z.infer<typeof PaymentSchema>;
