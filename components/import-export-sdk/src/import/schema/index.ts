import { z } from 'zod';
import { ShapeSchema } from '../../schema/shape';
import { TopicSchema } from '../../schema/topic';

export const ImportSpecSchema = z.object({
    shapes: z.array(ShapeSchema).optional(),
    topics: z.array(TopicSchema).optional(),
});
