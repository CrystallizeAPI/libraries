import { z } from 'zod';
import { ItemSchema } from '../item';

export const DocumentSchema = ItemSchema;
export type Document = z.infer<typeof DocumentSchema>;
