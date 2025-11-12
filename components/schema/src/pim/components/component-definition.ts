import { z } from 'zod';
import { ComponentTypeSchema } from '../../shared/index';
import { ComponentConfigInputSchema } from './component-config-input';
import { ComponentConfigSchema } from './component-config';

export const ComponentDefinitionSchema = z.object({
    id: z.string().min(1),
    type: ComponentTypeSchema,
    name: z.string().min(1),
    description: z.string().optional(),
    get config(): z.ZodOptional<typeof ComponentConfigSchema> {
        return ComponentConfigSchema.optional();
    },
});
export type ComponentDefinition = z.infer<typeof ComponentDefinitionSchema>;

export const ComponentDefinitionInputSchema = z.object({
    id: z.string().min(1),
    type: ComponentTypeSchema,
    name: z.string().min(1),
    description: z.string().optional(),
    get config(): z.ZodOptional<typeof ComponentConfigInputSchema> {
        return ComponentConfigInputSchema.optional();
    },
});

export type ComponentDefinitionInput = z.infer<typeof ComponentDefinitionInputSchema>;
