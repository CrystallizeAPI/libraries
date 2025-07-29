import { z } from 'zod';

export enum MechanismType {
    Percentage = 'percentage',
    Fixed = 'fixed',
    DynamicFixed = 'dynamic-fixed',
    XforY = 'x-for-y',
}

export const MechanismSchema = z
    .object({
        type: z.enum(MechanismType),
        value: z.number(),
    })
    .strict();

export type Mechanism = z.infer<typeof MechanismSchema>;
