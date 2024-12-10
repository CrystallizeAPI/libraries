import { z } from 'zod';

import { BooleanContent, BooleanContentSchema } from './types/boolean.js';
import { DatetimeContent, DatetimeContentSchema } from './types/datetime.js';
import { GridRelationsContent, GridRelationsContentSchema } from './types/grid-relations.js';
import { ImagesContent, ImagesContentSchema } from './types/images.js';
import { LocationContent, LocationContentSchema } from './types/location.js';
import { ParagraphCollectionContent, ParagraphCollectionContentSchema } from './types/paragraph-collection.js';
import { RichTextContent, RichTextContentSchema } from './types/rich-text.js';
import { SingleLineContent, SingleLineContentSchema } from './types/single-line.js';
import { VideosContent, VideosContentSchema } from './types/videos.js';
import { NumericContent, NumericContentSchema } from './types/numeric.js';
import { FilesContent, FilesContentSchema } from './types/files.js';
import { ItemRelationsContent, ItemRelationsContentSchema } from './types/item-relations.js';
import { PropertiesTableContent, PropertiesTableContentSchema } from './types/properties-table.js';
import { SelectionContent, SelectionContentSchema } from './types/selection.js';
import { ComponentSchema } from './component.js';

export type NestableComponentContent = {
    componentId: string;
    files?: FilesContent;
    images?: ImagesContent;
    videos?: VideosContent;
    boolean?: BooleanContent;
    datetime?: DatetimeContent;
    gridRelations?: GridRelationsContent;
    itemRelations?: ItemRelationsContent;
    location?: LocationContent;
    numeric?: NumericContent;
    paragraphCollection?: ParagraphCollectionContent;
    propertiesTable?: PropertiesTableContent;
    richText?: RichTextContent;
    selection?: SelectionContent;
    singleLine?: SingleLineContent;
    piece?: PieceContent;
};

export const NestableComponentContentSchema: z.ZodType<NestableComponentContent> = z.lazy(() =>
    z.object({
        componentId: z.string().min(1),
        files: FilesContentSchema.optional(),
        images: ImagesContentSchema.optional(),
        videos: VideosContentSchema.optional(),
        boolean: BooleanContentSchema.optional(),
        datetime: DatetimeContentSchema.optional(),
        gridRelations: GridRelationsContentSchema.optional(),
        itemRelations: ItemRelationsContentSchema.optional(),
        location: LocationContentSchema.optional(),
        numeric: NumericContentSchema.optional(),
        paragraphCollection: ParagraphCollectionContentSchema.optional(),
        propertiesTable: PropertiesTableContentSchema.optional(),
        richText: RichTextContentSchema.optional(),
        selection: SelectionContentSchema.optional(),
        singleLine: SingleLineContentSchema.optional(),
        piece: PieceContentSchema.optional(),
    }),
);

export type ComponentContent = NestableComponentContent & {
    componentChoice?: ChoiceContent;
    componentMultipleChoice?: MultipleChoicesContent;
    contentChunk?: ChunksContent;
};

export const ComponentContentSchema: z.ZodType<ComponentContent> = z.lazy(() =>
    NestableComponentContentSchema.and(
        z.object({
            componentChoice: ChoiceContentSchema.optional(),
            componentMultipleChoice: MultipleChoicesContentSchema.optional(),
            contentChunk: ChunksContentSchema.optional(),
        }),
    ),
);

/*
 * Hoisting Nightmare debug prevention
 * Do not try to put those files elsewhere, because base on how you transpile the code, it may not work
 * as we have recursive imports here
 */
export const ChoiceContentSchema = z.object({
    selectedComponent: ComponentSchema,
});
export type ChoiceContent = z.infer<typeof ChoiceContentSchema>;

export const ChunksContentSchema = z.object({
    chunks: z.array(z.array(ComponentSchema)),
});
export type ChunksContent = z.infer<typeof ChunksContentSchema>;

export const MultipleChoicesContentSchema = z.object({
    selectedComponents: z.array(ComponentSchema),
});
export type MultipleChoicesContent = z.infer<typeof MultipleChoicesContentSchema>;

export const PieceContentSchema = z.object({
    identifier: z.string(),
    components: z.array(ComponentSchema),
});
export type PieceContent = z.infer<typeof PieceContentSchema>;
