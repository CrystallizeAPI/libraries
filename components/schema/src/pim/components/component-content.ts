import { z } from 'zod';

import { BooleanContentSchema } from './types/boolean.js';
import { DatetimeContentSchema } from './types/datetime.js';
import { GridRelationsContentSchema } from './types/grid-relations.js';
import { ImagesContentSchema } from './types/images.js';
import { LocationContentSchema } from './types/location.js';
import { ParagraphCollectionContentSchema } from './types/paragraph-collection.js';
import { RichTextContentSchema } from './types/rich-text.js';
import { SingleLineContentSchema } from './types/single-line.js';
import { VideosContentSchema } from './types/videos.js';
import { NumericContentSchema } from './types/numeric.js';
import { FilesContentSchema } from './types/files.js';
import { ItemRelationsContentSchema } from './types/item-relations.js';
import { PropertiesTableContentSchema } from './types/properties-table.js';
import { SelectionContentSchema } from './types/selection.js';
import { ComponentSchema } from './component.js';

export const ChoiceContentSchema = z.object({
    get selectedComponent() {
        return ComponentSchema;
    },
});
export type ChoiceContent = z.infer<typeof ChoiceContentSchema>;

export const ChunksContentSchema = z.object({
    get chunks() {
        return z.array(z.array(ComponentSchema));
    },
});
export type ChunksContent = z.infer<typeof ChunksContentSchema>;

export const MultipleChoicesContentSchema = z.object({
    get selectedComponents() {
        return z.array(ComponentSchema);
    },
});
export type MultipleChoicesContent = z.infer<typeof MultipleChoicesContentSchema>;

export const PieceContentSchema = z.object({
    identifier: z.string(),
    get components() {
        return z.array(ComponentSchema);
    },
});
export type PieceContent = z.infer<typeof PieceContentSchema>;

export const ComponentContentSchema = z.union([
    FilesContentSchema,
    ImagesContentSchema,
    VideosContentSchema,
    BooleanContentSchema,
    DatetimeContentSchema,
    GridRelationsContentSchema,
    ItemRelationsContentSchema,
    LocationContentSchema,
    NumericContentSchema,
    ParagraphCollectionContentSchema,
    PropertiesTableContentSchema,
    RichTextContentSchema,
    SelectionContentSchema,
    SingleLineContentSchema,
    ChoiceContentSchema,
    ChunksContentSchema,
    MultipleChoicesContentSchema,
    PieceContentSchema,
]);
export type ComponentContent = z.infer<typeof ComponentContentSchema>;
