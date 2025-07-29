import { z } from 'zod';
import { DateTimeSchema, IdSchema } from '../shared';

export const TopicSchema = z.object({
    id: IdSchema.optional(),
    name: z.string().optional(),
    path: z.string().optional(),
    language: z.string().nullish(),
    parentId: IdSchema.nullish(),
    get parent() {
        return TopicSchema.nullish();
    },
    get children() {
        return z.array(TopicSchema).nullish();
    },
    childCount: z.number().optional(),
    createdAt: DateTimeSchema.nullish(),
});
export type Topic = z.infer<typeof TopicSchema>;
