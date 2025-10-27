import { z } from 'zod';
import { ItemSchema } from '../item';
import { ImageContentSchema, VideoContentSchema } from '../../components';
import { MetaSchema } from '../../../shop';
import { IdSchema } from '../../../shared';
import { SubscriptionContractPeriodUnitSchema, SubscriptionContractTierTypeSchema } from '../../subscription-contracts';

const PriceVariant = z.object({
    identifier: z.string().optional(),
    price: z.number().nullish(),
    name: z.string().nullish(),
    currency: z.string().nullish(),
});

const PhaseSchema = z.object({
    period: z.number().optional(),
    unit: SubscriptionContractPeriodUnitSchema.optional(),
    priceVariants: z.array(PriceVariant).nullish(),
    meteredVariables: z.array(
        z.object({
            id: IdSchema,
            identifier: z.string().optional(),
            name: z.string().optional(),
            tierType: SubscriptionContractTierTypeSchema.optional(),
            tiers: z.array(
                z.object({
                    price: z.number().optional(),
                    threshold: z.number().optional(),
                    priceVariants: z.array(
                        z.object({
                            identifier: z.string(),
                            price: z.number(),
                        }),
                    ),
                }),
            ),
        }),
    ),
});

const VariantSchema = z.object({
    attributes: z
        .array(
            z.object({
                attribute: z.string().optional(),
                value: z.string().optional(),
            }),
        )
        .nullish(),
    externalReference: z.string().nullish(),
    isDefault: z.boolean().optional(),
    name: z.string().optional(),
    sku: z.string().optional(),
    images: z.array(ImageContentSchema).nullish(),
    videos: z.array(VideoContentSchema).nullish(),
    priceVariants: z.array(PriceVariant).nullish(),
    stockLocations: z
        .array(
            z.object({
                identifier: z.string().optional(),
                stock: z.number().nullish(),
                meta: MetaSchema.nullish(),
                name: z.string().nullish(),
                settings: z
                    .object({
                        minimum: z.number().nullish(),
                        unlimited: z.boolean().nullish(),
                    })
                    .nullish(),
            }),
        )
        .nullish(),
    subscriptionPlans: z
        .array(
            z.object({
                identifier: z.string().optional(),
                name: z.string().nullish(),
                periods: z.array(
                    z.object({
                        id: IdSchema.optional(),
                        name: z.string().optional(),
                        initial: PhaseSchema.nullish(),
                        recurring: PhaseSchema.optional(),
                    }),
                ),
            }),
        )
        .nullish(),
});

export const ProductSchema = ItemSchema.extend({
    defaultVariant: VariantSchema.optional(),
    variants: z.array(VariantSchema).optional(),
    vatTypeId: IdSchema.optional(),
    vaType: z
        .object({
            id: IdSchema.optional(),
            name: z.string().optional(),
            percent: z.number().optional(),
        })
        .optional(),
});
export type Product = z.infer<typeof ProductSchema>;
