import { z } from 'zod';
import { CreateItemInputSchema, UpdateItemInputSchema } from '../item-input';
import { IdSchema } from '../../../shared';
import { VariantInputSchema } from '../../product-variants';

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
