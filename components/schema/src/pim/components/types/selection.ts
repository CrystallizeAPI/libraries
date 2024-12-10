import { z } from 'zod';
import { MinMaxComponentConfigInputSchema, MinMaxComponentConfigSchema } from '../shared.js';
import { KeyValuePairSchema } from '../../../shared/index.js';

// in the future that may be needed to split between config and input
const extraConfig = z.object({
    options: z.array(
        z.object({
            key: z.string(),
            value: z.string(),
            isPreselected: z.boolean().optional(),
        }),
    ),
});

export const SelectionConfigSchema = MinMaxComponentConfigSchema.and(extraConfig);
export const SelectionConfigInputSchema = MinMaxComponentConfigInputSchema.and(extraConfig);

export type SelectionConfig = z.infer<typeof SelectionConfigSchema>;
export type SelectionConfigInput = z.infer<typeof SelectionConfigInputSchema>;

export const SelectionContentSchema = z.object({
    options: z.array(KeyValuePairSchema),
});
export type SelectionContent = z.infer<typeof SelectionContentSchema>;

export const SelectionContentInputSchema = z.object({
    keys: z.array(z.string()),
});
export type SelectionContentInput = z.infer<typeof SelectionContentInputSchema>;
