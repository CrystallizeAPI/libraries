import { z } from 'zod';
import { SubscriptionContractPeriodUnitSchema, SubscriptionContractTierTypeSchema } from '../pim';

// we make it SubscriptionProductPriceVariantSchema as we don't handle priceForEveryone, priceFor, and priceList yet with Subscription Products
export const SubscriptionProductPriceVariantSchema = z.object({
    identifier: z.string().optional(),
    name: z.string().nullish(),
    price: z.number().nullish(),
    currency: z.string().nullish(),
    // priceForEveryone: not implemented yet
    // priceFor: not implemented yet
    // priceList: not implemented yet
});
export type SubscriptionProductPriceVariant = z.infer<typeof SubscriptionProductPriceVariantSchema>;

export const ProductVariantSubscriptionPlanTierSchema = z.object({
    threshold: z.int().optional(),
    priceVariants: z.array(SubscriptionProductPriceVariantSchema).nullish(),
});
export type ProductVariantSubscriptionPlanTier = z.infer<typeof ProductVariantSubscriptionPlanTierSchema>;

export const ProductVariantSubscriptionMeteredVariableSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    identifier: z.string().optional(),
    tiers: z.array(ProductVariantSubscriptionPlanTierSchema).optional(),
    tierType: SubscriptionContractTierTypeSchema.optional(),
});
export type ProductVariantSubscriptionMeteredVariable = z.infer<typeof ProductVariantSubscriptionMeteredVariableSchema>;

export const ProductVariantSubscriptionPlanPhasePricingSchema = z.object({
    period: z.int().optional(),
    unit: SubscriptionContractPeriodUnitSchema.optional(),
    priceVariants: z.array(SubscriptionProductPriceVariantSchema).optional(),
    meteredVariables: z.array(ProductVariantSubscriptionMeteredVariableSchema).optional(),
});
export type ProductVariantSubscriptionPlanPricing = z.infer<typeof ProductVariantSubscriptionPlanPhasePricingSchema>;

export const ProductVariantSubscriptionPlanPeriodSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    initial: ProductVariantSubscriptionPlanPhasePricingSchema.nullish(),
    recurring: ProductVariantSubscriptionPlanPhasePricingSchema.nullish(),
});
export type ProductVariantSubscriptionPlanPeriod = z.infer<typeof ProductVariantSubscriptionPlanPeriodSchema>;

export const ProductVariantSubscriptionPlanSchema = z.object({
    identifier: z.string().optional(),
    name: z.string().nullish(),
    periods: z.array(ProductVariantSubscriptionPlanPeriodSchema).optional(),
});
export type ProductVariantSubscriptionPlan = z.infer<typeof ProductVariantSubscriptionPlanSchema>;
