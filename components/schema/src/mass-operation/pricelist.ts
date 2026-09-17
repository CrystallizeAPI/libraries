import { z } from 'zod';
import { CreatePriceListInputSchema, PriceListProductVariantInputSchema, UpdatePriceListInputSchema } from '../pim';
import { RefSchema } from '../shared';

export const CreatePriceListOperationSchema = CreatePriceListInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('pricelist/create'),
});
export type CreatePriceListOperation = z.infer<typeof CreatePriceListOperationSchema>;

export const UpdatePriceListOperationSchema = UpdatePriceListInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('pricelist/update'),
});
export type UpdatePriceListOperation = z.infer<typeof UpdatePriceListOperationSchema>;

export const UpsertPriceListOperationSchema = CreatePriceListInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('pricelist/upsert'),
});
export type UpsertPriceListOperation = z.infer<typeof UpsertPriceListOperationSchema>;

export const UpsertPriceListSelectedProductVariantsOperationSchema = z.object({
    _ref: RefSchema.optional(),
    intent: z.literal('pricelist/selectedProductVariants/upsert'),
    identifier: z.string().min(1),
    variants: z.array(PriceListProductVariantInputSchema),
});
export type UpsertPriceListSelectedProductVariantsOperation = z.infer<
    typeof UpsertPriceListSelectedProductVariantsOperationSchema
>;

export const RemovePriceListSelectedProductVariantsOperationSchema = z.object({
    _ref: RefSchema.optional(),
    intent: z.literal('pricelist/selectedProductVariants/remove'),
    identifier: z.string().min(1),
    skus: z.array(z.string().min(1)),
});
export type RemovePriceListSelectedProductVariantsOperation = z.infer<
    typeof RemovePriceListSelectedProductVariantsOperationSchema
>;
