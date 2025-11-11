import { z } from 'zod';
import { MinMaxComponentConfigInputSchema, MinMaxComponentConfigSchema } from '../shared';
import {
    DateTimeSchema,
    IdSchema,
    ItemTypeSchema,
    KeyValuePairSchema,
    OwnerSchema,
    VersionLabelSchema,
} from '../../../shared/index';

export const GridRelationsConfigSchema = MinMaxComponentConfigSchema;
export const GridRelationsConfigInputSchema = MinMaxComponentConfigInputSchema;

export type GridRelationsConfig = z.infer<typeof GridRelationsConfigSchema>;
export type GridRelationsConfigInput = z.infer<typeof GridRelationsConfigInputSchema>;

export const GridContentSchema = z.object({
    id: IdSchema.optional(),
    language: z.string().optional(),
    name: z.string().nullish(),
    version: z
        .object({
            id: IdSchema.optional(),
            label: VersionLabelSchema.optional(),
            createdAt: DateTimeSchema.nullish(),
            owner: OwnerSchema.optional(),
        })
        .optional(),
    meta: z.array(KeyValuePairSchema).nullish(),
    createdAt: DateTimeSchema.optional(),
    updatedAt: DateTimeSchema.nullish(),
    rows: z
        .array(
            z.object({
                columns: z
                    .array(
                        z.object({
                            itemId: IdSchema.nullish(),
                            itemType: ItemTypeSchema.nullish(),
                            meta: z.array(KeyValuePairSchema).nullish(),
                            layout: z
                                .object({
                                    rowspan: z.number(),
                                    colspan: z.number(),
                                })
                                .nullish(),
                        }),
                    )
                    .nullish(),
                meta: z.array(KeyValuePairSchema).nullish(),
            }),
        )
        .nullish(),
});
export type GridContent = z.infer<typeof GridContentSchema>;

export const GridRelationsContentSchema = z.object({
    gridIds: z.array(IdSchema).nullish(),
    grids: z.array(GridContentSchema).nullish(),
});
export type GridRelationsContent = z.infer<typeof GridRelationsContentSchema>;

export const GridRelationsContentInputSchema = z.object({
    gridIds: z.array(IdSchema),
});
export type GridRelationsContentInput = z.infer<typeof GridRelationsContentInputSchema>;
