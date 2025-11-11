import { z } from 'zod';
import { ComponentTypeSchema } from '../../shared/index';
import { ComponentContentSchema } from './component-content';

export const ComponentSchema = z.object({
    componentId: z.string().min(1),
    name: z.string().min(1),
    type: ComponentTypeSchema,
    content: ComponentContentSchema,
});

export type Component = z.infer<typeof ComponentSchema>;
