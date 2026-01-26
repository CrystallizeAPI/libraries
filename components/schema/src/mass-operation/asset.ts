import { z } from 'zod';
import { RegisterImageInputSchema } from '../pim';
import { RefSchema } from '../shared';
import { ResourceIdentifierSchema } from '../shared';

export const RegisterImageOperationSchema = RegisterImageInputSchema.extend({
    intent: z.literal('image/register'),
    _ref: RefSchema.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});

export type RegisterImageOperation = z.infer<typeof RegisterImageOperationSchema>;
