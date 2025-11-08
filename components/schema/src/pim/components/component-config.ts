import { z } from 'zod';

import { BooleanConfigSchema } from './types/boolean.js';
import { DatetimeConfigSchema } from './types/datetime.js';
import { GridRelationsConfigSchema } from './types/grid-relations.js';
import { ImagesConfigSchema } from './types/images.js';
import { LocationConfigSchema } from './types/location.js';
import { ParagraphCollectionConfigSchema } from './types/paragraph-collection.js';
import { RichTextConfigSchema } from './types/rich-text.js';
import { SingleLineConfigSchema } from './types/single-line.js';
import { VideosConfigSchema } from './types/videos.js';
import { NumericConfigSchema } from './types/numeric.js';
import { FilesConfigSchema } from './types/files.js';
import { ItemRelationsConfigSchema } from './types/item-relations.js';
import { PropertiesTableConfigSchema } from './types/properties-table.js';
import { SelectionConfigSchema } from './types/selection.js';
import { GenericComponentConfigSchema } from './shared.js';
import { ComponentDefinitionSchema } from './component-definition.js';

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
