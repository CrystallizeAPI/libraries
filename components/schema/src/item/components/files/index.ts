import { z } from 'zod';

export const FileInputSchema = z.object({
    key: z.string().min(1),
    title: z.string().optional(),
});

export type FileInput = z.infer<typeof FileInputSchema>;
