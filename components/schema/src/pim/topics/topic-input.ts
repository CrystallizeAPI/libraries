import { z } from 'zod';
import { IdSchema } from '../../shared';

export const CreateChildTopicInputSchema = z.object({
    get children(): z.ZodOptional<z.ZodNullable<z.ZodArray<typeof CreateChildTopicInputSchema>>> {
        return z.array(CreateChildTopicInputSchema).nullish();
    },
    name: z.string(),
    pathIdentifier: z.string().nullish(),
});
export type CreateChildTopicInput = z.infer<typeof CreateChildTopicInputSchema>;

export const CreateTopicInputSchema = z.object({
    children: z.array(CreateChildTopicInputSchema).nullish(),
    displayColor: z.string().nullish(),
    name: z.string(),
    parentId: IdSchema.nullish(),
    pathIdentifier: z.string().nullish(),
});
export type CreateTopicInput = z.infer<typeof CreateTopicInputSchema>;

export const UpdateTopicInputSchema = z.object({
    displayColor: z.string().nullish(),
    name: z.string().nullish(),
    parentId: IdSchema.nullish(),
    pathIdentifier: z.string().nullish(),
});
export type UpdateTopicInput = z.infer<typeof UpdateTopicInputSchema>;
