import { z } from 'zod';

import { BooleanConfig, BooleanConfigSchema } from './types/boolean.js';
import { DatetimeConfig, DatetimeConfigSchema } from './types/datetime.js';
import { GridRelationsConfig, GridRelationsConfigSchema } from './types/grid-relations.js';
import { ImagesConfig, ImagesConfigSchema } from './types/images.js';
import { LocationConfig, LocationConfigSchema } from './types/location.js';
import { ParagraphCollectionConfig, ParagraphCollectionConfigSchema } from './types/paragraph-collection.js';
import { RichTextConfig, RichTextConfigSchema } from './types/rich-text.js';
import { SingleLineConfig, SingleLineConfigSchema } from './types/single-line.js';
import { VideosConfig, VideosConfigSchema } from './types/videos.js';
import { NumericConfig, NumericConfigSchema } from './types/numeric.js';
import { FilesConfig, FilesConfigSchema } from './types/files.js';
import { ItemRelationsConfig, ItemRelationsConfigSchema } from './types/item-relations.js';
import { PropertiesTableConfig, PropertiesTableConfigSchema } from './types/properties-table.js';
import { SelectionConfig, SelectionConfigSchema } from './types/selection.js';
import { GenericComponentConfigSchema } from './shared.js';
import { ComponentDefinitionInputSchema, ComponentDefinitionSchema } from './component-definition.js';

export type NestableComponentConfig = {
    files?: FilesConfig;
    images?: ImagesConfig;
    videos?: VideosConfig;
    boolean?: BooleanConfig;
    datetime?: DatetimeConfig;
    gridRelations?: GridRelationsConfig;
    itemRelations?: ItemRelationsConfig;
    location?: LocationConfig;
    numeric?: NumericConfig;
    paragraphCollection?: ParagraphCollectionConfig;
    propertiesTable?: PropertiesTableConfig;
    richText?: RichTextConfig;
    selection?: SelectionConfig;
    singleLine?: SingleLineConfig;
    piece?: PieceConfig;
};

export const NestableComponentConfigSchema: z.ZodType<NestableComponentConfig> = z.lazy(() =>
    z.object({
        files: FilesConfigSchema.optional(),
        images: ImagesConfigSchema.optional(),
        videos: VideosConfigSchema.optional(),
        boolean: BooleanConfigSchema.optional(),
        datetime: DatetimeConfigSchema.optional(),
        gridRelations: GridRelationsConfigSchema.optional(),
        itemRelations: ItemRelationsConfigSchema.optional(),
        location: LocationConfigSchema.optional(),
        numeric: NumericConfigSchema.optional(),
        paragraphCollection: ParagraphCollectionConfigSchema.optional(),
        propertiesTable: PropertiesTableConfigSchema.optional(),
        richText: RichTextConfigSchema.optional(),
        selection: SelectionConfigSchema.optional(),
        singleLine: SingleLineConfigSchema.optional(),
        piece: PieceConfigSchema.optional(),
    }),
);

export type ComponentConfig = NestableComponentConfig & {
    componentChoice?: ChoiceConfig;
    componentMultipleChoice?: MultipleChoicesConfig;
    contentChunk?: ChunksConfig;
};

export const ComponentConfigSchema: z.ZodType<ComponentConfig> = z.lazy(() =>
    NestableComponentConfigSchema.and(
        z.object({
            componentChoice: ChoiceConfigSchema.optional(),
            componentMultipleChoice: MultipleChoicesConfigSchema.optional(),
            contentChunk: ChunksConfigSchema.optional(),
        }),
    ),
);

/*
 * Hoisting Nightmare debug prevention
 * Do not try to put those files elsewhere, because base on how you transpile the code, it may not work
 * as we have recursive imports here
 */
export const ChoiceConfigSchema = GenericComponentConfigSchema.extend({
    choices: z.array(ComponentDefinitionInputSchema),
});
export type ChoiceConfig = z.infer<typeof ChoiceConfigSchema>;

export const ChunksConfigSchema = GenericComponentConfigSchema.extend({
    components: z.array(ComponentDefinitionSchema),
    repeatable: z.boolean(),
});
export type ChunksConfig = z.infer<typeof ChunksConfigSchema>;

export const MultipleChoicesConfigSchema = GenericComponentConfigSchema.extend({
    choices: z.array(ComponentDefinitionSchema),
    allowDuplicates: z.boolean().optional(),
});
export type MultipleChoicesConfig = z.infer<typeof MultipleChoicesConfigSchema>;

export const PieceConfigSchema = GenericComponentConfigSchema.extend({
    identifier: z.string().min(1),
    components: z.array(ComponentDefinitionSchema),
});
export type PieceConfig = z.infer<typeof PieceConfigSchema>;
