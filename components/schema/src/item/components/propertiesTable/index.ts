import { z } from 'zod';
import { KeyValuePairInputSchema } from '../../../shared/index.js';

export const PropertiesTableComponentSectionInputSchema = z.object({
    properties: z.array(KeyValuePairInputSchema).optional(),
    title: z.string().optional(),
});

export const PropertiesTableContentInputSchema = z.object({
    sections: z.array(PropertiesTableComponentSectionInputSchema).optional(),
});

export type PropertiesTableComponentSectionInput = z.infer<typeof PropertiesTableComponentSectionInputSchema>;
export type PropertiesTableContentInput = z.infer<typeof PropertiesTableContentInputSchema>;
