import { z } from 'zod';
import { ComponentInput, ComponentInputSchema } from '..';

export type ContentChunkContentInput = {
    chunks: ComponentInput[][];
};

export const ContentChunkContentInputSchema: z.ZodType<ContentChunkContentInput> = z.lazy(() =>
    z.object({
        chunks: z.array(z.array(ComponentInputSchema).min(1)).min(1),
    }),
);
