import { z } from 'zod';
import { DateTimeSchema, IdSchema } from '../../shared';

export const TopicSchema = z.object({
    createdAt: DateTimeSchema,
    displayColor: z.string().nullish(),
    id: IdSchema,
    language: z.string().min(1),
    name: z.string().nullish(),
    parentId: IdSchema.nullish(),
    path: z.string().min(1),
    updatedAt: DateTimeSchema.nullish(),
});
export type Topic = z.infer<typeof TopicSchema>;
