import { z } from 'zod';
import { DateTimeSchema, IdSchema } from '../../shared';
import { ComponentContentInputSchema } from '../components';

export const CreateItemInputSchema = z.object({
    name: z.string(),
    shapeIdentifier: z.string(),
    createdAt: DateTimeSchema.nullish(),
    externalReference: z.string().nullish(),
    topicIds: z.array(IdSchema).nullish(),
    components: z.array(ComponentContentInputSchema).nullish(),
    // we make it required here, even though in the API it can be null
    tree: z.object({
        parentId: IdSchema,
        position: z.number().min(0).nullish(),
    }),
});
export type CreateItemInput = z.infer<typeof CreateItemInputSchema>;

export const UpdateItemInputSchema = CreateItemInputSchema.omit({ shapeIdentifier: true, tree: true });
export type UpdatetemInputSchema = z.infer<typeof UpdateItemInputSchema>;
