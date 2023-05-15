import { z } from 'zod';

export const LocationContentInputSchema = z.object({
    lat: z.number().optional(),
    long: z.number().optional(),
});

export type LocationContentInput = z.infer<typeof LocationContentInputSchema>;
