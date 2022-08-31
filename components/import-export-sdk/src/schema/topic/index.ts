import { z } from 'zod';

export const MAX_CHILD_COUNT = 100;

export type CreateChildTopicInput = {
    name: string;
    children?: CreateChildTopicInput[];
    pathIdentifier?: string;
};

const validateChildren = (children?: CreateChildTopicInput[]): boolean => {
    if (!children?.length) {
        return true;
    }

    const countChildren = (children: CreateChildTopicInput[]): number =>
        children.reduce(
            (acc, child) => (child.children?.length ? acc + 1 + countChildren(child.children) : acc + 1),
            0,
        );

    return countChildren(children) <= MAX_CHILD_COUNT;
};

export const CreateChildTopicInputSchema: z.ZodType<CreateChildTopicInput> = z.lazy(() =>
    z.object({
        name: z.string().min(1),
        children: z.array(CreateChildTopicInputSchema).optional(),
        pathIdentifier: z.string().optional(),
    }),
);

const children = z.array(CreateChildTopicInputSchema).refine(validateChildren, {
    params: {
        code: 'MAX_CHILD_COUNT',
    },
    message: `Cannot provide more than ${MAX_CHILD_COUNT} descendants in a topic mutation`,
});

export const BulkCreateTopicInputSchema = z.object({
    name: z.string().min(1),
    children: children.optional(),
    parentId: z.string().optional(),
    pathIdentifier: z.string().optional(),
});

export const CreateTopicInputSchema = z.object({
    name: z.string().min(1),
    children: children.optional(),
    parentId: z.string().optional(),
    pathIdentifier: z.string().optional(),
    tenantId: z.string().min(1),
});

export const UpdateTopicInputSchema = z.object({
    name: z.string().optional(),
    parentId: z.string().optional(),
    pathIdentifier: z.string().optional(),
});

export type Topic = {
    language?: string;
    name: string;
    id?: string;
    parentId?: string;
    pathIdentifier?: string;
    children?: Topic[];
};

export const TopicSchema: z.ZodType<Topic> = z.lazy(() =>
    z.object({
        language: z.string().optional(),
        id: z.string().optional(),
        parentId: z.string().optional(),
        name: z.string().min(1),
        pathIdentifier: z.string().optional(),
        children: z.array(TopicSchema).optional(),
    }),
);

export type BulkCreateTopicInput = z.infer<typeof BulkCreateTopicInputSchema>;
export type CreateTopicInput = z.infer<typeof CreateTopicInputSchema>;
export type UpdateTopicInput = z.infer<typeof UpdateTopicInputSchema>;
