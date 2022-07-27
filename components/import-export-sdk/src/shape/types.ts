import { z } from 'zod';
import { ShapeCreateInputSchema, ShapeUpdateInputSchema } from './schema';

export type ShapeCreateInput = z.infer<typeof ShapeCreateInputSchema>;
export type ShapeUpdateInput = z.infer<typeof ShapeUpdateInputSchema>;
