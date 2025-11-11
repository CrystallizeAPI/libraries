import { z } from 'zod';
import { CustomerInputSchema } from './customer';
import { MetaInputSchema, id } from '../metadata';
import { PriceInputSchema } from './price';
import { CartContextSchema } from './cart-context';
import { ImageVariantSchema } from '../images';

export const CartSkuItemInputSchema = z.object({
    sku: z.string(),
    quantity: z.number().positive(),
    taxRate: z.number().min(0).max(1).optional(),
    meta: MetaInputSchema.optional(),
});
export type CartSkuItemInput = z.infer<typeof CartSkuItemInputSchema>;

export const CartItemInputSchema = CartSkuItemInputSchema.omit({
    taxRate: true,
}).extend({
    name: z.string(),
    images: ImageVariantSchema.array().optional(),
    variant: z.object({
        price: PriceInputSchema,
        attributes: z
            .array(
                z.object({
                    key: z.string(),
                    value: z.string().optional(),
                }),
            )
            .optional(),
        product: z.object({
            id: z.string(),
            path: z.string(),
            topics: z.array(z.string()).default([]),
        }),
    }),
});
export type CartItemInput = z.infer<typeof CartItemInputSchema>;

export enum OrderIntentFormat {
    Legacy = 'legacy',
    Core = 'core',
    Shop = 'shop',
}

export const CartInputSchema = z.object({
    id: id.optional(),
    items: z.array(CartSkuItemInputSchema).optional(),
    externalItems: z.array(CartItemInputSchema).optional(),
    customer: CustomerInputSchema.optional(),
    context: CartContextSchema,
    meta: MetaInputSchema.optional(),
});

export type CartInput = z.infer<typeof CartInputSchema>;
