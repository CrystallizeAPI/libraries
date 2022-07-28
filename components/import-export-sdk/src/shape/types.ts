import { z } from 'zod';
import { ShapeComponentSchema, CreateShapeInputSchema, UpdateShapeInputSchema } from './schema';

export type CreateShapeInput = z.infer<typeof CreateShapeInputSchema>;
export type UpdateShapeInput = z.infer<typeof UpdateShapeInputSchema>;
export type ShapeComponent = z.infer<typeof ShapeComponentSchema>;
