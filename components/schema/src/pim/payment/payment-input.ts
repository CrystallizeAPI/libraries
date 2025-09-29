import { z } from 'zod';

export const PaymentProviderSchema = z.enum(['klarna', 'stripe', 'paypal', 'cash', 'custom']);
export type PaymentProvider = z.infer<typeof PaymentProviderSchema>;

// Klarna
export const KlarnaPaymentInputSchema = z.object({
    id: z.string().nullish(),
    merchantReference1: z.string().nullish(),
    merchantReference2: z.string().nullish(),
    metadata: z.string().nullish(),
    orderId: z.string().nullish(),
    recurringToken: z.string().nullish(),
    status: z.string().nullish(),
});
export type KlarnaPaymentInput = z.infer<typeof KlarnaPaymentInputSchema>;

// Paypal
export const PaypalPaymentInputSchema = z.object({
    id: z.string().nullish(),
    invoiceId: z.string().nullish(),
    metadata: z.string().nullish(),
    orderId: z.string().nullish(),
    subscriptionId: z.string().nullish(),
});
export type PaypalPaymentInput = z.infer<typeof PaypalPaymentInputSchema>;

// Stripe
export const StripePaymentInputSchema = z.object({
    stripe: z.string().nullish(),
    customerId: z.string().nullish(),
    orderId: z.string().nullish(),
    paymentMethod: z.string().nullish(),
    paymentMethodId: z.string().nullish(),
    paymentIntentId: z.string().nullish(),
    subscriptionId: z.string().nullish(),
    metadata: z.string().nullish(),
});
export type StripePaymentInput = z.infer<typeof StripePaymentInputSchema>;

// Cash
export const CashPaymentInputSchema = z.object({
    cash: z.string().nullish(),
});
export type CashPaymentInput = z.infer<typeof CashPaymentInputSchema>;

// Custom
export const CustomPaymentInputSchema = z.object({
    properties: z
        .array(
            z.object({
                property: z.string(),
                value: z.string().nullish(),
            }),
        )
        .optional(),
});
export type CustomPaymentInput = z.infer<typeof CustomPaymentInputSchema>;

export const PaymentInputSchema = z
    .object({
        provider: PaymentProviderSchema,
        klarna: KlarnaPaymentInputSchema.nullish(),
        paypal: PaypalPaymentInputSchema.nullish(),
        stripe: StripePaymentInputSchema.nullish(),
        cash: CashPaymentInputSchema.nullish(),
        custom: CustomPaymentInputSchema.nullish(),
    })
    .strict();
export type PaymentInput = z.infer<typeof PaymentInputSchema>;
