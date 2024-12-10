import { z } from 'zod';
import { ComponentTypeEnum } from '../../shared/index.js';
import { ComponentContentSchema } from './component-content.js';

export const ComponentSchema = z.object({
    componentId: z.string().min(1),
    name: z.string().min(1),
    type: ComponentTypeEnum,
    content: ComponentContentSchema,
});

export type Component = z.infer<typeof ComponentSchema>;
