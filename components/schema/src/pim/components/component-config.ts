import { z } from 'zod';

import { BooleanConfigSchema } from './types/boolean';
import { DatetimeConfigSchema } from './types/datetime';
import { GridRelationsConfigSchema } from './types/grid-relations';
import { ImagesConfigSchema } from './types/images';
import { LocationConfigSchema } from './types/location';
import { ParagraphCollectionConfigSchema } from './types/paragraph-collection';
import { RichTextConfigSchema } from './types/rich-text';
import { SingleLineConfigSchema } from './types/single-line';
import { VideosConfigSchema } from './types/videos';
import { NumericConfigSchema } from './types/numeric';
import { FilesConfigSchema } from './types/files';
import { ItemRelationsConfigSchema } from './types/item-relations';
import { PropertiesTableConfigSchema } from './types/properties-table';
import { SelectionConfigSchema } from './types/selection';
import { GenericComponentConfigSchema } from './shared';
import { ComponentDefinitionSchema } from './component-definition';

export const ChoiceConfigSchema = GenericComponentConfigSchema.extend({
    get choices() {
        return z.array(ComponentDefinitionSchema);
    },
});
export type ChoiceConfig = z.infer<typeof ChoiceConfigSchema>;

export const ChunksConfigSchema = GenericComponentConfigSchema.extend({
    get components() {
        return z.array(ComponentDefinitionSchema);
    },
    repeatable: z.boolean(),
});
export type ChunksConfig = z.infer<typeof ChunksConfigSchema>;

export const MultipleChoicesConfigSchema = GenericComponentConfigSchema.extend({
    get choices() {
        return z.array(ComponentDefinitionSchema);
    },
    allowDuplicates: z.boolean().optional(),
});
export type MultipleChoicesConfig = z.infer<typeof MultipleChoicesConfigSchema>;

export const PieceConfigSchema = GenericComponentConfigSchema.extend({
    identifier: z.string().min(1),
    get components() {
        return z.array(ComponentDefinitionSchema);
    },
});
export type PieceConfig = z.infer<typeof PieceConfigSchema>;

export const ComponentConfigSchema = z.union([
    BooleanConfigSchema,
    ChoiceConfigSchema,
    MultipleChoicesConfigSchema,
    ChunksConfigSchema,
    DatetimeConfigSchema,
    FilesConfigSchema,
    GridRelationsConfigSchema,
    ImagesConfigSchema,
    ItemRelationsConfigSchema,
    LocationConfigSchema,
    NumericConfigSchema,
    ParagraphCollectionConfigSchema,
    PieceConfigSchema,
    PropertiesTableConfigSchema,
    RichTextConfigSchema,
    SelectionConfigSchema,
    SingleLineConfigSchema,
    VideosConfigSchema,
]);
export type ComponentConfig = z.infer<typeof ComponentConfigSchema>;
