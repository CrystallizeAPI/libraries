import { z } from 'zod';
import { DateTimeSchema } from '../../../shared/index.js';

export const DatetimeContentInputSchema = z.object({
    datetime: DateTimeSchema,
});

export type DatetimeContentInput = z.infer<typeof DatetimeContentInputSchema>;
