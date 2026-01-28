import { z } from 'zod';
import { ModifyProductVariantPriceInputSchema, ModifyProductVariantStockInputSchema } from '../pim';
import { RefSchema } from '../shared';

export const ModifyProductVariantStockOperationSchema = ModifyProductVariantStockInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('product/variant/stock/modify'),
});

export type ModifyProductVariantStockOperation = z.infer<typeof ModifyProductVariantStockOperationSchema>;

export const ModifyProductVariantPriceOperationSchema = ModifyProductVariantPriceInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('product/variant/price/modify'),
});

export type ModifyProductVariantPriceOperation = z.infer<typeof ModifyProductVariantPriceOperationSchema>;
