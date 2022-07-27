import { z } from 'zod';
import { ShapeComponentSchema } from './component';

export const ShapeTypeEnum = z.enum(['product', 'document', 'folder']);

export const ShapeCreateInputSchema = z.object({
    identifier: z.string().optional(),
    name: z.string().min(1),
    tenantId: z.string().min(1),
    type: ShapeTypeEnum,
    meta: z.record(z.string()).optional(),
    components: z.array(ShapeComponentSchema).optional(),
});

export const ShapeUpdateInputSchema = z.object({
    name: z.string().min(1),
    meta: z.record(z.string()).optional(),
    components: z.array(ShapeComponentSchema).optional(),
});
