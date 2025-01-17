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
import { GenericComponentConfig, GenericComponentConfigSchema } from './shared.js';
import { ComponentDefinition, ComponentDefinitionSchema } from './component-definition.js';

export type NestableComponentConfig =
    | FilesConfig
    | ImagesConfig
    | VideosConfig
    | BooleanConfig
    | DatetimeConfig
    | GridRelationsConfig
    | ItemRelationsConfig
    | LocationConfig
    | NumericConfig
    | ParagraphCollectionConfig
    | PropertiesTableConfig
    | RichTextConfig
    | SelectionConfig
    | SingleLineConfig

    // PieceConfig |
    | (GenericComponentConfig & {
          identifier: string;
          components: ComponentDefinition[];
      });

export const NestableComponentConfigSchema: z.ZodType<NestableComponentConfig> = z.lazy(() =>
    z.union([
        FilesConfigSchema,
        ImagesConfigSchema,
        VideosConfigSchema,
        BooleanConfigSchema,
        DatetimeConfigSchema,
        GridRelationsConfigSchema,
        ItemRelationsConfigSchema,
        LocationConfigSchema,
        NumericConfigSchema,
        ParagraphCollectionConfigSchema,
        PropertiesTableConfigSchema,
        RichTextConfigSchema,
        SelectionConfigSchema,
        SingleLineConfigSchema,
        GenericComponentConfigSchema.extend({
            identifier: z.string().min(1),
            components: z.array(ComponentDefinitionSchema),
        }),
    ]),
);

export type ComponentConfig =
    | NestableComponentConfig
    // ChoiceConfig
    | (GenericComponentConfig & {
          choices: ComponentDefinition[];
      })
    // MultipleChoicesConfig
    | (GenericComponentConfig & {
          choices: ComponentDefinition[];
          allowDuplicates: boolean;
      })
    // ChunksConfig
    | (GenericComponentConfig & {
          components: ComponentDefinition[];
          repeatable: boolean;
      });

/*
 * Hoisting Nightmare debug prevention
 * Do not try to put those files elsewhere, because base on how you transpile the code, it may not work
 * as we have recursive imports here
 *
 * Also we have to duplicate the schema here because of lazy loading
 */
export const ComponentConfigSchema: z.ZodType<ComponentConfig> = z.lazy(() =>
    z.union([
        FilesConfigSchema,
        ImagesConfigSchema,
        VideosConfigSchema,
        BooleanConfigSchema,
        DatetimeConfigSchema,
        GridRelationsConfigSchema,
        ItemRelationsConfigSchema,
        LocationConfigSchema,
        NumericConfigSchema,
        ParagraphCollectionConfigSchema,
        PropertiesTableConfigSchema,
        RichTextConfigSchema,
        SelectionConfigSchema,
        SingleLineConfigSchema,
        // Piece
        GenericComponentConfigSchema.extend({
            identifier: z.string().min(1),
            components: z.array(ComponentDefinitionSchema),
        }),
        // Choice
        GenericComponentConfigSchema.extend({
            choices: z.array(ComponentDefinitionSchema),
        }),

        // Multiple Choices
        GenericComponentConfigSchema.extend({
            choices: z.array(ComponentDefinitionSchema),
            allowDuplicates: z.boolean().optional(),
        }),

        //Chnunk
        GenericComponentConfigSchema.extend({
            components: z.array(ComponentDefinitionSchema),
            repeatable: z.boolean(),
        }),
    ]),
);

export const ChoiceConfigSchema = GenericComponentConfigSchema.extend({
    choices: z.array(ComponentDefinitionSchema),
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
