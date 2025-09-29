import { z } from 'zod';

export const defaultCartContext = {
    price: {
        decimals: 0,
        pricesHaveTaxesIncludedInCrystallize: false,
        selectedVariantIdentifier: 'default',
        currency: 'eur',
        discountOnNetPrices: false,
        markets: [],
    },
    language: 'en',
    ttl: 3600 * 24 * 30, // 30 days
    staleTtl: 3600, // 1 hour
};

export const CartContextSchema = z
    .object({
        price: z.object({
            decimals: z.number(),
            pricesHaveTaxesIncludedInCrystallize: z.boolean(),
            currency: z.string(),
            taxRate: z.number().min(0).max(1).optional(),
            selectedVariantIdentifier: z.string(),
            fallbackVariantIdentifiers: z.array(z.string()).optional(),
            compareAtVariantIdentifier: z.string().optional(),
            discountOnNetPrices: z.boolean(),
            markets: z.array(z.string()),
            voucherCode: z.string().optional(), // deprecated
            voucherCodes: z.array(z.string()).optional(),
            customerGroup: z.string().optional(), // deprecated
            customerGroups: z.array(z.string()).optional(),
        }),
        language: z.string(),
        ttl: z.number(),
        staleTtl: z.number().optional().nullable(),
    })
    .default(defaultCartContext);
export type CartContext = z.infer<typeof CartContextSchema>;
