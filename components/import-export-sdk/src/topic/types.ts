import { z } from 'zod';
import { BulkCreateTopicInputSchema, CreateTopicInputSchema, UpdateTopicInputSchema } from './schema';

export interface CreateChildTopicInput {
    name: string;
    children?: CreateChildTopicInput[];
    pathIdentifier?: string;
}

export type BulkCreateTopicInput = z.infer<typeof BulkCreateTopicInputSchema>;
export type CreateTopicInput = z.infer<typeof CreateTopicInputSchema>;
export type UpdateTopicInput = z.infer<typeof UpdateTopicInputSchema>;
