import { z } from 'zod';
import { ComponentContentInputSchema, ImageContentInputSchema, VideoContentInputSchema } from '../components';
import { KeyValueInputSchema } from '../../shop';
import { IdSchema } from '../../shared';
import { SubscriptionContractTierTypeSchema } from '../subscription-contracts';

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

export const ProductVariantAttributeInputSchema = z.object({
    attribute: z.string(),
    value: z.string(),
});
export type ProductVariantAttributeInput = z.infer<typeof ProductVariantAttributeInputSchema>;

export const PriceVariantReferenceInputSchema = z.object({
    identifier: z.string(),
    price: z.number(),
});
export type PriceVariantReferenceInput = z.infer<typeof PriceVariantReferenceInputSchema>;

export const StockLocationReferenceInputSchema = z.object({
    identifier: z.string(),
    stock: z.number(),
    meta: z.array(KeyValueInputSchema).nullish(),
});
export type StockLocationReferenceInput = z.infer<typeof StockLocationReferenceInputSchema>;

export const SubscriptionPlanPhaseInputSchema = z.object({
    meteredVariables: z.array(
        z.object({
            id: IdSchema,
            tierType: SubscriptionContractTierTypeSchema,
            tiers: z.array(
                z.object({
                    price: z.number(),
                    threshold: z.number(),
                    priceVariants: z.array(PriceVariantReferenceInputSchema),
                }),
            ),
        }),
    ),
    priceVariants: z.array(PriceVariantReferenceInputSchema),
});
export type SubscriptionPlanPhaseInput = z.infer<typeof SubscriptionPlanPhaseInputSchema>;

export const SubscriptionPlanReferenceInputSchema = z.object({
    identifier: z.string(),
    periods: z.array(
        z.object({
            id: IdSchema,
            initial: SubscriptionPlanPhaseInputSchema.nullish(),
            recurring: SubscriptionPlanPhaseInputSchema,
        }),
    ),
});
export type SubscriptionPlanReferenceInput = z.infer<typeof SubscriptionPlanReferenceInputSchema>;

export const VariantInputSchema = z.object({
    sku: z.string(),
    externalReference: z.string().nullish(),
    components: z.array(ComponentContentInputSchema).nullish(),
    attributes: z.array(ProductVariantAttributeInputSchema).nullish(),
    isDefault: z.boolean().nullish(),
    name: z.string(),
    images: z.array(ImageContentInputSchema).nullish(),
    videos: z.array(VideoContentInputSchema).nullish(),
    priceVariants: z.array(PriceVariantReferenceInputSchema).nullish(),
    stockLocations: z.array(StockLocationReferenceInputSchema).nullish(),
    subscriptionPlans: z.array(SubscriptionPlanReferenceInputSchema).nullish(),
});
export type VariantInput = z.infer<typeof VariantInputSchema>;
