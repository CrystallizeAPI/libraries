import { z } from 'zod';

export const TypeEnum = z.enum(['product', 'document', 'folder']);
export const ComponentTypeEnum = z.enum(['boolean', '...']);

export const ComponentInputSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    type: ComponentTypeEnum,
    description: z.string().optional(),
    // config
});

export const CreateInputSchema = z.object({
    identifier: z.string().optional(),
    name: z.string().min(1),
    tenantId: z.string().uuid(),
    type: TypeEnum,
    meta: z.record(z.string()).optional(),
    components: z.array(ComponentInputSchema).optional(),
});

export const UpdateInputSchema = z.object({
    name: z.string().min(1),
    type: TypeEnum,
    meta: z.record(z.string()).optional(),
    components: z.array(ComponentInputSchema).optional(),
});
