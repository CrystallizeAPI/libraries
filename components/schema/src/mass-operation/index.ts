import { z } from 'zod';
import {
    CreateItemOperationSchema,
    UpdateCompomentOperationSchema,
    UpdateItemOperationSchema,
    UpsertItemOperationSchema,
} from './item.js';

export const OperationSchema = z.union([
    CreateItemOperationSchema,
    UpdateItemOperationSchema,
    UpsertItemOperationSchema,
    UpdateCompomentOperationSchema,
]);

export const OperationsSchema = z.object({
    version: z.string().refine((value) => /^(\d+\.)?(\d+\.)?(\*|\d+)$/.test(value), {
        message: 'Version must be in Major.Minor.Patch format',
    }),
    operations: z.array(OperationSchema),
});

export type Operation = z.infer<typeof OperationSchema>;
export type Operations = z.infer<typeof OperationsSchema>;
