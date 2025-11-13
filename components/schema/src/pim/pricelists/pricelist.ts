import { z } from 'zod';
import { DateTimeSchema } from '../../shared';

export const PriceListModifierSchema = z.enum(['ABSOLUTE', 'PERCENTAGE', 'RELATIVE']);
export type PriceListModifier = z.infer<typeof PriceListModifierSchema>;

export const PriceListProductSelectionSchema = z.enum(['ALL_SKUS', 'SOME_SKUS']);
export type PriceListProductSelection = z.infer<typeof PriceListProductSelectionSchema>;

export const PriceListTargetAudienceTypeSchema = z.enum(['EVERYONE', 'SOME']);
export type PriceListTargetAudienceType = z.infer<typeof PriceListTargetAudienceTypeSchema>;

export const PriceListPriceVariantSchema = z.object({
    decimalPlaces: z.number().nullish(),
    identifier: z.string().min(1),
    modifier: z.number(),
});
export type PriceListPriceVariant = z.infer<typeof PriceListPriceVariantSchema>;

export const PriceListProductVariantSchema = z.object({
    sku: z.string().min(1),
    priceVariants: PriceListPriceVariantSchema.nullish(),
});
export type PriceListProductVariant = z.infer<typeof PriceListProductVariantSchema>;

export const PriceListSelectedProductVariantsSchema = z.object({
    type: PriceListProductSelectionSchema,
    variants: z.array(PriceListProductVariantSchema),
});
export type PriceListSelectedProductVariants = z.infer<typeof PriceListSelectedProductVariantsSchema>;

export const PriceListTargetAudienceSchema = z.object({
    type: PriceListTargetAudienceTypeSchema,
    customerGroupIdentifiers: z.array(z.string().min(1)).nullish(),
    customerIdentifiers: z.array(z.string().min(1)).nullish(),
    marketIdentifiers: z.array(z.string().min(1)).nullish(),
});
export type PriceListTargetAudience = z.infer<typeof PriceListTargetAudienceSchema>;

export const PriceListSchema = z.object({
    identifier: z.string().min(1),
    name: z.string().min(1),
    modifierType: PriceListModifierSchema,
    priceVariants: z.array(PriceListPriceVariantSchema),
    selectedProductVariants: PriceListSelectedProductVariantsSchema,
    targetAudience: PriceListTargetAudienceSchema,
    startDate: DateTimeSchema.nullish(),
    endDate: DateTimeSchema.nullish(),
    createdAt: DateTimeSchema,
    updatedAt: DateTimeSchema.nullish(),
});
export type PriceList = z.infer<typeof PriceListSchema>;
