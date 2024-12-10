import { z } from 'zod';
import { MinMaxComponentConfigInputSchema, MinMaxComponentConfigSchema } from '../shared.js';
import {
    DateTimeSchema,
    IdSchema,
    ItemTypeEnum,
    KeyValuePairSchema,
    OwnerSchema,
    VersionLabelEnum,
} from '../../../shared/index.js';

export const GridRelationsConfigSchema = MinMaxComponentConfigSchema;
export const GridRelationsConfigInputSchema = MinMaxComponentConfigInputSchema;

export type GridRelationsConfig = z.infer<typeof GridRelationsConfigSchema>;
export type GridRelationsConfigInput = z.infer<typeof GridRelationsConfigInputSchema>;

export const GridContentSchema = z.object({
    id: IdSchema,
    language: z.string(),
    name: z.string().optional(),
    version: z
        .object({
            id: IdSchema,
            label: VersionLabelEnum,
            createdAt: DateTimeSchema,
            owner: OwnerSchema.optional(),
        })
        .optional(),
    meta: z.array(KeyValuePairSchema).optional(),
    createdAt: DateTimeSchema,
    updatedAt: DateTimeSchema.optional(),
    rows: z
        .array(
            z.object({
                columns: z
                    .array(
                        z.object({
                            itemId: IdSchema,
                            itemType: ItemTypeEnum,
                            meta: z.array(KeyValuePairSchema).optional(),
                            layout: z.object({
                                rowspan: z.number(),
                                colspan: z.number(),
                            }),
                        }),
                    )
                    .optional(),
                meta: z.array(KeyValuePairSchema).optional(),
            }),
        )
        .optional(),
});
export type GridContent = z.infer<typeof GridContentSchema>;

export const GridRelationsContentSchema = z.object({
    gridIds: z.array(IdSchema).optional(),
    grids: z.array(GridContentSchema).optional(),
});
export type GridRelationsContent = z.infer<typeof GridRelationsContentSchema>;

export const GridRelationsContentInputSchema = z.object({
    gridIds: z.array(IdSchema),
});
export type GridRelationsContentInput = z.infer<typeof GridRelationsContentInputSchema>;
