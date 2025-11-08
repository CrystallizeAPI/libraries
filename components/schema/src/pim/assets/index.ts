import { z } from 'zod';

export const RegisterImageInputSchema = z.object({
    key: z.string().min(1),
    language: z.string().min(1).optional(),
});
export type RegisterImageInput = z.infer<typeof RegisterImageInputSchema>;
