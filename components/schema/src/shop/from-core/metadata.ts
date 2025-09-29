import { z } from 'zod';

export const id = z.string().uuid();

export const DatedModelSchema = z.object({
    createdAt: z.date(),
    updatedAt: z.date().optional(),
});

export type DatedModel = z.infer<typeof DatedModelSchema>;

export const MetadataSchema = DatedModelSchema.extend({
    id,
});
export type Metadata = z.infer<typeof MetadataSchema>;

export const MetaSchema = z.record(z.string(), z.string().optional());
export type Meta = z.infer<typeof MetaSchema>;

export const KeyValueInputSchema = z.object({
    key: z.string(),
    value: z.string(),
});

export const MetaInputSchema = z.array(KeyValueInputSchema);
export type MetaInput = z.infer<typeof MetaInputSchema>;
export type KeyValueInput = z.infer<typeof KeyValueInputSchema>;
