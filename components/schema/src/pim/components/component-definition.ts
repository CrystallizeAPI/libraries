import { z } from 'zod';
import { ComponentTypeEnum } from '../../shared/index.js';
import { ComponentConfigInputSchema } from './component-config-input.js';
import { ComponentConfigSchema } from './component-config.js';

export const ComponentDefinitionSchema = z.object({
    id: z.string().min(1),
    type: ComponentTypeEnum,
    name: z.string().min(1),
    description: z.string().optional(),
    config: ComponentConfigSchema.optional(),
});
export type ComponentDefinition = z.infer<typeof ComponentDefinitionSchema>;

export const ComponentDefinitionInputSchema = z.object({
    id: z.string().min(1),
    type: ComponentTypeEnum,
    name: z.string().min(1),
    description: z.string().optional(),
    config: ComponentConfigInputSchema.optional(),
});

export type ComponentDefinitionInput = z.infer<typeof ComponentDefinitionInputSchema>;
