import { z } from 'zod';
import { ImageSchema } from './images';
import { TopicSchema } from './topics';
import { ProductVariantSubscriptionPlanSchema } from './subscription';
import { DateTimeSchema, KeyValuePairSchema } from '../shared';

export const ItemSchema = z.object({
    id: z.string().optional(),
    name: z.string().nullish(),
    path: z.string().nullish(),
    externalReference: z.string().nullish(),
    topics: z.array(TopicSchema).optional(),
    shapeIdentifier: z.string().optional(),
    language: z.string().optional(),
});
export type Item = z.infer<typeof ItemSchema>;

export const VatInfoSchema = z.object({
    name: z.string().nullish(),
    percent: z.number().nullish(),
});
export type VatInfo = z.infer<typeof VatInfoSchema>;

export const ProductVariantPriceModifierTypeSchema = z.enum(['PERCENTAGE', 'RELATIVE', 'ABSOLUTE']);
export type ProductVariantPriceModifierType = z.infer<typeof ProductVariantPriceModifierTypeSchema>;

export const ProductVariantPriceListSchema = z.object({
    startDate: DateTimeSchema.nullish(),
    endDate: DateTimeSchema.nullish(),
    price: z.number().nullish(),
    identifier: z.string().optional(),
    modifier: z.number().optional(),
    modifierType: ProductVariantPriceModifierTypeSchema.optional(),
});
export type ProductVariantPriceList = z.infer<typeof ProductVariantPriceListSchema>;

export const ProductPriceVariantSchema = z.object({
    identifier: z.string().optional(),
    name: z.string().nullish(),
    price: z.number().nullish(),
    currency: z.string().nullish(),
    priceForEveryone: ProductVariantPriceListSchema.optional(),
    priceFor: ProductVariantPriceListSchema.optional(),
    priceList: ProductVariantPriceListSchema.nullish(),
});
export type ProductPriceVariant = z.infer<typeof ProductPriceVariantSchema>;

export const ProductStockLocationSchema = z.object({
    identifier: z.string().optional(),
    name: z.string().optional(),
    stock: z.number().nullish(),
    meta: z.array(KeyValuePairSchema).nullish(),
});
export type ProductStockLocation = z.infer<typeof ProductStockLocationSchema>;

export const ProductVariantAttributeSchema = z.object({
    attribute: z.string().optional(),
    value: z.string().nullish(),
});
export type ProductVariantAttribute = z.infer<typeof ProductVariantAttributeSchema>;

export const ProductVariantSchema = z.object({
    name: z.string().nullish(),
    images: z.array(ImageSchema).optional(),
    firstImage: ImageSchema.nullish(),
    sku: z.string().optional(),
    priceVariants: z.array(ProductPriceVariantSchema).nullish(),
    stockLocations: z.array(ProductStockLocationSchema).nullish(),
    attributes: z.array(ProductVariantAttributeSchema).nullish(),
    externalReference: z.string().nullish(),
    isDefault: z.boolean().nullish(),
    subscriptionPlans: z.array(ProductVariantSubscriptionPlanSchema).optional(),
});
export type ProductVariant = z.infer<typeof ProductVariantSchema>;

export const ProductSchema = ItemSchema.extend({
    vatType: VatInfoSchema.nullish(),
    variants: z.array(ProductVariantSchema).nullish(),
    defaultVariant: ProductVariantSchema.nullish(),
});
export type Product = z.infer<typeof ProductSchema>;
