import { z } from 'zod';
import { RegisterImageInputSchema } from '../pim';
import { RefSchema } from '../shared';

export const RegisterImageOperationSchema = RegisterImageInputSchema.extend({
    intent: z.literal('image/register'),
    _ref: RefSchema.optional(),
});

export type RegisterImageOperation = z.infer<typeof RegisterImageOperationSchema>;
