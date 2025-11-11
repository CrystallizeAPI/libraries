import { z } from 'zod';
import { CustomerSchema } from './customer';
import { MetaSchema, MetadataSchema } from './metadata';
import { CartContextSchema } from './input/cart-context';
import { CartItemOriginSchema, CartStateSchema } from './cart-enum';
import { PriceSchema } from './price';
import { ImageSchema, ImageVariantSchema } from './images';
import { MechanismSchema } from './promotions';

// Product
export const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    path: z.string(),
    shortcuts: z.array(z.string()).optional(),
    topics: z.array(z.string()).default([]),
    vatType: z
        .object({
            percent: z.number(),
        })
        .optional(),
});

export const ProductVariantSchema = z.object({
    name: z.string(),
    sku: z.string(),
    product: ProductSchema,
    price: PriceSchema,
    compareAtPrice: PriceSchema.optional(),
    images: z.array(ImageSchema),
    attributes: z.record(z.string(), z.string().optional()),
});

export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type Product = z.infer<typeof ProductSchema>;

// Cart
export const CartItemSchema = z.object({
    quantity: z.number(),
    name: z.string(),
    context: z.object({
        taxRate: z.number().min(0).max(1).optional(),
        origin: CartItemOriginSchema,
        managed: z.boolean(),
    }),
    price: PriceSchema, // quanity * unit price
    images: z.array(ImageVariantSchema),
    variant: ProductVariantSchema,
    meta: MetaSchema.optional(),
});

export const CartSchema = MetadataSchema.extend({
    expiresAt: z.date(),
    staleAt: z.date().optional().nullable(),
    tenantIdentifier: z.string(),
    items: z.array(CartItemSchema),
    total: PriceSchema,
    state: CartStateSchema,
    customer: CustomerSchema.optional(),
    context: CartContextSchema,
    meta: MetaSchema.optional(),
    appliedPromotions: z
        .array(
            z.object({
                identifier: z.string(),
                name: z.string().optional().nullable(),
                mechanism: MechanismSchema.optional(),
            }),
        )
        .optional(),
    orderId: z.string().optional(),
});

export type Cart = z.infer<typeof CartSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
