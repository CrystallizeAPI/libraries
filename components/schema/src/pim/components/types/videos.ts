import { z } from 'zod';
import { MinMaxComponentConfigInputSchema, MinMaxComponentConfigSchema } from '../shared.js';
import { ImageContentInputSchema, ImagesContentSchema } from './images.js';
import { DateTimeSchema } from '../../../shared/index.js';

export const VideosConfigSchema = MinMaxComponentConfigSchema;
export const VideosConfigInputSchema = MinMaxComponentConfigInputSchema;

export type VideosConfig = z.infer<typeof VideosConfigSchema>;
export type VideosConfigInput = z.infer<typeof VideosConfigInputSchema>;

export const VideoContentSchema = z.object({
    id: z.string().optional(),
    thumbnails: z.array(ImagesContentSchema).optional(),
    title: z.string().nullish(),
    playlists: z.array(z.string()).nullish(),
    createdAt: DateTimeSchema.nullish(),
    updatedAt: DateTimeSchema.nullish(),
});
export type VideoContent = z.infer<typeof VideoContentSchema>;

export const VideosContentSchema = z.object({
    videos: z.array(VideoContentSchema).nullish(),
});
export type VideosContent = z.infer<typeof VideosContentSchema>;

export const VideoContentInputSchema = z.object({
    key: z.string().min(1),
    thumbnails: z.array(ImageContentInputSchema).optional(),
    title: z.string().optional(),
});
export type VideoContentInput = z.infer<typeof VideoContentInputSchema>;

export const VideosContentInputSchema = z.array(VideoContentInputSchema);
export type VideosContentInput = z.infer<typeof VideosContentInputSchema>;
