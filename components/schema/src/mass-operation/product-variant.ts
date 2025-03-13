import { z } from 'zod';
import { ModifyProductVariantStockInputSchema } from '../pim';

export const ModifyProductVariantStockOperationSchema = ModifyProductVariantStockInputSchema.extend({
    intent: z.literal('product/variant/stock/modify'),
});

export type ModifyProductVariantStockOperation = z.infer<typeof ModifyProductVariantStockOperationSchema>;
