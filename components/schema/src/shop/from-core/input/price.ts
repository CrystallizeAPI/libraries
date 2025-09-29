import { z } from 'zod';

export const PriceInputSchema = z.object({
    gross: z.number(),
    net: z.number(),
    discounts: z.array(
        z.object({
            amount: z.number(),
        }),
    ),
});
export type PriceInput = z.infer<typeof PriceInputSchema>;
