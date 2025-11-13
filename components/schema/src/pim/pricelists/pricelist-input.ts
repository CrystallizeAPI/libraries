import { z } from 'zod';
import { DateTimeSchema } from '../../shared';
import {
    PriceListModifierSchema,
    PriceListProductSelectionSchema,
    PriceListTargetAudienceTypeSchema,
} from './pricelist';

export const PriceListPriceVariantInputSchema = z.object({
    decimalPlaces: z.number().nullish(),
    identifier: z.string().min(1),
    modifier: z.number(),
});
export type PriceListPriceVariantInput = z.infer<typeof PriceListPriceVariantInputSchema>;

export const PriceListProductVariantInputSchema = z.object({
    sku: z.string().min(1),
    priceVariants: PriceListPriceVariantInputSchema.nullish(),
});
export type PriceListProductVariantInput = z.infer<typeof PriceListProductVariantInputSchema>;

export const PriceListSelectedProductVariantsInputSchema = z.object({
    type: PriceListProductSelectionSchema,
    variants: z.array(PriceListProductVariantInputSchema).nullish(),
});
export type PriceListSelectedProductVariantsInput = z.infer<typeof PriceListSelectedProductVariantsInputSchema>;

export const PriceListTargetAudienceInputSchema = z.object({
    type: PriceListTargetAudienceTypeSchema,
    customerGroupIdentifiers: z.array(z.string().min(1)).nullish(),
    customerIdentifiers: z.array(z.string().min(1)).nullish(),
    marketIdentifiers: z.array(z.string().min(1)).nullish(),
});
export type PriceListTargetAudienceInput = z.infer<typeof PriceListTargetAudienceInputSchema>;

export const CreatePriceListInputSchema = z.object({
    identifier: z.string().min(1),
    name: z.string().min(1),
    modifierType: PriceListModifierSchema,
    priceVariants: z.array(PriceListPriceVariantInputSchema).min(1),
    selectedProductVariants: PriceListSelectedProductVariantsInputSchema,
    targetAudience: PriceListTargetAudienceInputSchema,
    startDate: DateTimeSchema.nullish(),
    endDate: DateTimeSchema.nullish(),
});
export type CreatePriceListInput = z.infer<typeof CreatePriceListInputSchema>;

export const UpdatePriceListInputSchema = CreatePriceListInputSchema.partial().extend({
    identifier: z.string().min(1),
});
export type UpdatePriceListInput = z.infer<typeof UpdatePriceListInputSchema>;
