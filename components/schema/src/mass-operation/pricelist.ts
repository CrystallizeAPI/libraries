import { z } from 'zod';
import { CreatePriceListInputSchema, UpdatePriceListInputSchema } from '../pim';
import { RefSchema } from '../shared';

export const CreatePriceListOperationSchema = CreatePriceListInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('pricelist/create'),
});
export type CreatePriceListOperation = z.infer<typeof CreatePriceListOperationSchema>;

export const UpdatePriceListOperationSchema = UpdatePriceListInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('pricelist/update'),
});
export type UpdatePriceListOperation = z.infer<typeof UpdatePriceListOperationSchema>;

export const UpsertPriceListOperationSchema = CreatePriceListInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('pricelist/upsert'),
});
export type UpsertPriceListOperation = z.infer<typeof UpsertPriceListOperationSchema>;
