import { z } from 'zod';
import { ModifyProductVariantPriceInputSchema, ModifyProductVariantStockInputSchema, VariantInputSchema } from '../pim';
import { IdSchema, RefSchema } from '../shared';

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

export const AddProductVariantOperationSchema = VariantInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('product/variant/create'),
    language: z.string().min(1),
    productId: IdSchema,
});
export type AddProductVariantOperation = z.infer<typeof AddProductVariantOperationSchema>;

export const UpdateProductVariantOperationSchema = VariantInputSchema.omit({ sku: true, isDefault: true })
    .partial()
    .extend({
        _ref: RefSchema.optional(),
        intent: z.literal('product/variant/update'),
        language: z.string().min(1),
        sku: z.string().min(1),
    });
export type UpdateProductVariantOperation = z.infer<typeof UpdateProductVariantOperationSchema>;

export const UpsertProductVariantOperationSchema = VariantInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('product/variant/upsert'),
    language: z.string().min(1),
    productId: IdSchema,
});
export type UpsertProductVariantOperation = z.infer<typeof UpsertProductVariantOperationSchema>;

export const DeleteProductVariantOperationSchema = z.object({
    _ref: RefSchema.optional(),
    intent: z.literal('product/variant/delete'),
    sku: z.string().min(1),
});
export type DeleteProductVariantOperation = z.infer<typeof DeleteProductVariantOperationSchema>;
