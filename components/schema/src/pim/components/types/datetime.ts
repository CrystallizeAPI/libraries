import { z } from 'zod';
import { GenericComponentConfigInputSchema, GenericComponentConfigSchema } from '../shared.js';
import { DateTimeSchema } from '../../../shared/index.js';

export const DatetimeConfigSchema = GenericComponentConfigSchema;
export const DatetimeConfigInputSchema = GenericComponentConfigInputSchema;

export type DatetimeConfig = z.infer<typeof DatetimeConfigSchema>;
export type DatetimeConfigInput = z.infer<typeof DatetimeConfigInputSchema>;

export const DatetimeContentSchema = z.object({
    datetime: DateTimeSchema.optional(),
});
export type DatetimeContent = z.infer<typeof DatetimeContentSchema>;

export const DatetimeContentInputSchema = z.object({
    datetime: DateTimeSchema.optional(),
});
export type DatetimeContentInput = z.infer<typeof DatetimeContentInputSchema>;
