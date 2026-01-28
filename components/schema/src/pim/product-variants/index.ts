import { z } from 'zod';

export const ModifyProductVariantStockInputSchema = z.object({
    operation: z.enum(['decrease', 'increase', 'overwrite']),
    quantity: z.number().int().min(1),
    sku: z.string().min(1),
    stockLocationIdentifier: z.string().min(1),
});
export type ModifyProductVariantStockInput = z.infer<typeof ModifyProductVariantStockInputSchema>;

export const ModifyProductVariantPriceInputSchema = z.object({
    sku: z.string().min(1),
    priceVariantIdentifier: z.string().min(1),
    price: z.number().min(1),
});
export type ModifyProductVariantPriceInput = z.infer<typeof ModifyProductVariantPriceInputSchema>;
