import { z } from 'zod';

export const IdSchema = z.string().min(24).max(24);
export const KeyValuePairSchema = z.record(z.string());
export const DateTimeSchema = z.string().refine(
    (str) => Date.parse(str),
    (str) => ({ message: `${str} is not a valid date` }),
);

export const KeyValuePairInputSchema = z.object({
    key: z.string().min(1),
    value: z.string().optional(),
});

export type Id = z.infer<typeof IdSchema>;
export type KeyValuePair = z.infer<typeof KeyValuePairSchema>;

export type KeyValuePairInput = z.infer<typeof KeyValuePairInputSchema>;
