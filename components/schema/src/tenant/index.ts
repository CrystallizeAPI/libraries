import { z } from 'zod';
import { CreateShapeInputSchema, ShapeSchema } from '../shape/index.js';
import { IdSchema } from '../shared/index.js';

export const TenantDefaultsInputSchema = z.object({
    currency: z.string().optional(),
    language: z.string().optional(),
});

export const CreateTenantInputSchema = z.object({
    identifier: z.string().min(1),
    name: z.string().min(1),
    defaults: TenantDefaultsInputSchema.optional(),
    shapes: z.array(CreateShapeInputSchema).optional(),
});

export const TenantDefaultsSchema = z.object({
    currency: z.string().min(1),
    language: z.string().min(1),
});

export const TenantSchema = z.object({
    id: IdSchema,
    identifier: z.string().min(1),
    name: z.string().min(1),
    defaults: TenantDefaultsSchema,
    shapes: z.array(ShapeSchema).optional(),
});

export type TenantDefaultsInput = z.infer<typeof TenantDefaultsInputSchema>;
export type CreateTenantInput = z.infer<typeof CreateTenantInputSchema>;

export type TenantDefaults = z.infer<typeof TenantDefaultsSchema>;
export type Tenant = z.infer<typeof TenantSchema>;
