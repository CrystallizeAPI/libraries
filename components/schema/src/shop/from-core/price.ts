import { z } from 'zod';

export const PriceSchema = z.object({
    gross: z.number(),
    net: z.number(),
    taxAmount: z.number(),
    currency: z.string(),
    discounts: z.array(
        z.object({
            percent: z.number(),
            amount: z.number(),
        }),
    ),
});
export type Price = z.infer<typeof PriceSchema>;
