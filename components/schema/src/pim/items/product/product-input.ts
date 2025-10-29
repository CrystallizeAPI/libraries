import { z } from 'zod';
import { CreateItemInputSchema, UpdateItemInputSchema, UpdatetemInputSchema } from '../item-input';
import { IdSchema } from '../../../shared';
import { ComponentContentInputSchema, ImageContentInputSchema, VideoContentInputSchema } from '../../components';
import { KeyValueInputSchema } from '../../../shop';
import { SubscriptionContractTierTypeSchema } from '../../subscription-contracts';

const PhaseInputSchema = z.object({
    meteredVariables: z.array(
        z.object({
            id: IdSchema,
            tierType: SubscriptionContractTierTypeSchema,
            tiers: z.array(
                z.object({
                    price: z.number(),
                    threshold: z.number(),
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
    priceVariants: z.array(
        z.object({
            identifier: z.string(),
            price: z.number(),
        }),
    ),
});

export const VariantInputSchema = z.object({
    sku: z.string(),
    externalReference: z.string().nullish(),
    components: z.array(ComponentContentInputSchema).nullish(),
    attributes: z
        .array(
            z.object({
                attribute: z.string(),
                value: z.string(),
            }),
        )
        .nullish(),
    isDefault: z.boolean().nullish(),
    name: z.string(),
    images: z.array(ImageContentInputSchema).nullish(),
    videos: z.array(VideoContentInputSchema).nullish(),
    priceVariants: z
        .array(
            z.object({
                identifier: z.string(),
                price: z.number(),
            }),
        )
        .nullish(),
    stockLocations: z
        .array(
            z.object({
                identifier: z.string(),
                stock: z.number(),
                meta: z.array(KeyValueInputSchema).nullish(),
            }),
        )
        .nullish(),
    subscriptionPlans: z
        .array(
            z.object({
                identifier: z.string(),
                periods: z.array(
                    z.object({
                        id: IdSchema,
                        initial: PhaseInputSchema.nullish(),
                        recurring: PhaseInputSchema,
                    }),
                ),
            }),
        )
        .nullish(),
});

export const CreateProductInputSchema = CreateItemInputSchema.extend({
    vatTypeId: IdSchema,
    variants: z.array(VariantInputSchema).min(1),
});
export type CreateProductInput = z.infer<typeof CreateProductInputSchema>;

export const UpdateProductInputSchema = UpdateItemInputSchema.extend({
    vatTypeId: IdSchema,
    variants: z.array(VariantInputSchema).min(1),
}).partial();
export type UpdateProductInput = z.infer<typeof UpdateProductInputSchema>;
