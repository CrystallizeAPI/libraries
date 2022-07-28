import { z } from 'zod';
import { CreateChildTopicInput } from '../types';

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
