import { z } from 'zod';
import { MinMaxComponentConfigInputSchema, MinMaxComponentConfigSchema } from '../shared';

export const ColorSpaceSchema = z.enum(['cmyk', 'hex', 'hsl', 'pantone', 'ral', 'rgb']);
export type ColorSpace = z.infer<typeof ColorSpaceSchema>;

const CmykSchema = z.object({
    c: z.number().int(),
    m: z.number().int(),
    y: z.number().int(),
    k: z.number().int(),
});

const HslSchema = z.object({
    h: z.number().int(),
    s: z.number().int(),
    l: z.number().int(),
    a: z.number().nullish(),
});

const RgbSchema = z.object({
    r: z.number().int(),
    g: z.number().int(),
    b: z.number().int(),
    a: z.number().nullish(),
});

// in the future that may be needed to split between entry and entry input
export const ColorEntrySchema = z.object({
    label: z.string().nullish(),
    hex: z.string().nullish(),
    pantone: z.string().nullish(),
    ral: z.string().nullish(),
    cmyk: CmykSchema.nullish(),
    hsl: HslSchema.nullish(),
    rgb: RgbSchema.nullish(),
});
export type ColorEntry = z.infer<typeof ColorEntrySchema>;
export const ColorEntryInputSchema = ColorEntrySchema;
export type ColorEntryInput = z.infer<typeof ColorEntryInputSchema>;

// in the future that may be needed to split between config and input
const extraConfig = z.object({
    requireLabel: z.boolean().optional(),
    customColorSpaces: z.array(ColorSpaceSchema).optional(),
    colorPresets: z.array(ColorEntrySchema).optional(),
});

export const ColorsConfigSchema = MinMaxComponentConfigSchema.and(extraConfig);
export const ColorsConfigInputSchema = MinMaxComponentConfigInputSchema.and(extraConfig);

export type ColorsConfig = z.infer<typeof ColorsConfigSchema>;
export type ColorsConfigInput = z.infer<typeof ColorsConfigInputSchema>;

export const ColorsContentSchema = z.object({
    colors: z.array(ColorEntrySchema).nullish(),
});
export type ColorsContent = z.infer<typeof ColorsContentSchema>;

export const ColorsContentInputSchema = z.object({
    colors: z.array(ColorEntryInputSchema).optional(),
});
export type ColorsContentInput = z.infer<typeof ColorsContentInputSchema>;
