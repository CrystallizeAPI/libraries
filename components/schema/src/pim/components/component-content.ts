import { z } from 'zod';

import { BooleanContentSchema } from './types/boolean';
import { DatetimeContentSchema } from './types/datetime';
import { GridRelationsContentSchema } from './types/grid-relations';
import { ImagesContentSchema } from './types/images';
import { LocationContentSchema } from './types/location';
import { ParagraphCollectionContentSchema } from './types/paragraph-collection';
import { RichTextContentSchema } from './types/rich-text';
import { SingleLineContentSchema } from './types/single-line';
import { VideosContentSchema } from './types/videos';
import { NumericContentSchema } from './types/numeric';
import { FilesContentSchema } from './types/files';
import { ItemRelationsContentSchema } from './types/item-relations';
import { PropertiesTableContentSchema } from './types/properties-table';
import { SelectionContentSchema } from './types/selection';
import { ComponentSchema } from './component';

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
