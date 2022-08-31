import { z } from 'zod';
import { ImageInputSchema } from '../images';

export const VideoInputSchema = z.object({
    key: z.string().min(1),
    thumbnails: z.array(ImageInputSchema).optional(),
    title: z.string().optional(),
});

export type VideoInput = z.infer<typeof VideoInputSchema>;
