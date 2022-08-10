import { z } from 'zod';

export type CreateChildTopicInput = {
    name: string;
    children?: CreateChildTopicInput[];
    pathIdentifier?: string;
};

export const CreateChildTopicInputSchema: z.ZodType<CreateChildTopicInput> = z.lazy(() =>
    z.object({
        name: z.string().min(1),
        children: z.array(CreateChildTopicInputSchema).optional(),
        pathIdentifier: z.string().optional(),
    }),
);

export const BulkCreateTopicInputSchema = z.object({
    name: z.string().min(1),
    children: z.array(CreateChildTopicInputSchema).optional(),
    parentId: z.string().optional(),
    pathIdentifier: z.string().optional(),
});

export const CreateTopicInputSchema = z.object({
    name: z.string().min(1),
    children: z.array(CreateChildTopicInputSchema).optional(),
    parentId: z.string().optional(),
    pathIdentifier: z.string().optional(),
    tenantId: z.string().min(1),
});

export const UpdateTopicInputSchema = z.object({
    name: z.string().optional(),
    parentId: z.string().optional(),
    pathIdentifier: z.string().optional(),
});

export type BulkCreateTopicInput = z.infer<typeof BulkCreateTopicInputSchema>;
export type CreateTopicInput = z.infer<typeof CreateTopicInputSchema>;
export type UpdateTopicInput = z.infer<typeof UpdateTopicInputSchema>;
