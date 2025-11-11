import { z } from 'zod';
import { GenericComponentConfigInputSchema, GenericComponentConfigSchema } from '../shared';
import { KeyValuePairInputSchema, KeyValuePairSchema } from '../../../shared/index';

// in the future that may be needed to split between config and input
const extraConfig = z.object({
    sections: z
        .array(
            z.object({
                title: z.string().optional(),
                keys: z.array(z.string()),
            }),
        )
        .optional(),
});
export const PropertiesTableConfigSchema = GenericComponentConfigSchema.merge(extraConfig);
export const PropertiesTableConfigInputSchema = GenericComponentConfigInputSchema.merge(extraConfig);

export type PropertiesTableConfig = z.infer<typeof PropertiesTableConfigSchema>;
export type PropertiesTableConfigInput = z.infer<typeof PropertiesTableConfigInputSchema>;

export const PropertiesTableContentSchema = z.object({
    sections: z
        .array(
            z.object({
                title: z.string().nullish(),
                properties: z.array(KeyValuePairSchema).nullish(),
            }),
        )
        .nullish(),
});
export type PropertiesTableContent = z.infer<typeof PropertiesTableContentSchema>;

export const PropertiesTableSectionContentInputSchema = z.object({
    title: z.string().optional(),
    properties: z.array(KeyValuePairInputSchema).optional(),
});

export type PropertiesTableSectionContentInput = z.infer<typeof PropertiesTableSectionContentInputSchema>;
export const PropertiesTableContentInputSchema = z.object({
    sections: z.array(PropertiesTableSectionContentInputSchema).optional(),
});
export type PropertiesTableContentInput = z.infer<typeof PropertiesTableContentInputSchema>;
