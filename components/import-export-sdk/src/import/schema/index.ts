import { z } from 'zod';
import { ShapeComponentSchema, ShapeTypeEnum } from '../../schema/shape';
import { TopicSchema } from '../../schema/topic';

export const ShapeImportSpecSchema = z.object({
    identifier: z.string().min(1),
    name: z.string().min(1),
    type: ShapeTypeEnum,
    components: z.array(ShapeComponentSchema).optional(),
});

export const ImportSpecSchema = z.object({
    shapes: z.array(ShapeImportSpecSchema).optional(),
    topics: z.array(TopicSchema).optional(),
});
