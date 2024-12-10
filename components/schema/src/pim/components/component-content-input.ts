import { z } from 'zod';

import { BooleanContentInput, BooleanContentInputSchema } from './types/boolean.js';
import { DatetimeContentInput, DatetimeContentInputSchema } from './types/datetime.js';
import { GridRelationsContentInput, GridRelationsContentInputSchema } from './types/grid-relations.js';
import { ImagesContentInput, ImagesContentInputSchema } from './types/images.js';
import { LocationContentInput, LocationContentInputSchema } from './types/location.js';
import {
    ParagraphCollectionContentInput,
    ParagraphCollectionContentInputSchema,
} from './types/paragraph-collection.js';
import { RichTextContentInput, RichTextContentInputSchema } from './types/rich-text.js';
import { SingleLineContentInput, SingleLineContentInputSchema } from './types/single-line.js';
import { VideosContentInput, VideosContentInputSchema } from './types/videos.js';
import { NumericContentInput, NumericContentInputSchema } from './types/numeric.js';
import { FilesContentInput, FilesContentInputSchema } from './types/files.js';
import { ItemRelationsContentInput, ItemRelationsContentInputSchema } from './types/item-relations.js';
import { PropertiesTableContentInput, PropertiesTableContentInputSchema } from './types/properties-table.js';
import { SelectionContentInput, SelectionContentInputSchema } from './types/selection.js';

export type NestableComponentContentInput = {
    componentId: string;
    files?: FilesContentInput;
    images?: ImagesContentInput;
    videos?: VideosContentInput;
    boolean?: BooleanContentInput;
    datetime?: DatetimeContentInput;
    gridRelations?: GridRelationsContentInput;
    itemRelations?: ItemRelationsContentInput;
    location?: LocationContentInput;
    numeric?: NumericContentInput;
    paragraphCollection?: ParagraphCollectionContentInput;
    propertiesTable?: PropertiesTableContentInput;
    richText?: RichTextContentInput;
    selection?: SelectionContentInput;
    singleLine?: SingleLineContentInput;
    piece?: PieceContentInput;
};

export const NestableComponentContentInputSchema: z.ZodType<NestableComponentContentInput> = z.lazy(() =>
    z.object({
        componentId: z.string().min(1),
        files: FilesContentInputSchema.optional(),
        images: ImagesContentInputSchema.optional(),
        videos: VideosContentInputSchema.optional(),
        boolean: BooleanContentInputSchema.optional(),
        datetime: DatetimeContentInputSchema.optional(),
        gridRelations: GridRelationsContentInputSchema.optional(),
        itemRelations: ItemRelationsContentInputSchema.optional(),
        location: LocationContentInputSchema.optional(),
        numeric: NumericContentInputSchema.optional(),
        paragraphCollection: ParagraphCollectionContentInputSchema.optional(),
        propertiesTable: PropertiesTableContentInputSchema.optional(),
        richText: RichTextContentInputSchema.optional(),
        selection: SelectionContentInputSchema.optional(),
        singleLine: SingleLineContentInputSchema.optional(),
        piece: PieceContentInputSchema.optional(),
    }),
);

export type ComponentContentInput = NestableComponentContentInput & {
    componentChoice?: ChoiceContentInput;
    componentMultipleChoice?: MultipleChoicesContentInput;
    contentChunk?: ChunksContentInput;
};

export const ComponentContentInputSchema: z.ZodType<ComponentContentInput> = z.lazy(() =>
    NestableComponentContentInputSchema.and(
        z.object({
            componentChoice: ChoiceContentInputSchema.optional(),
            componentMultipleChoice: MultipleChoicesContentInputSchema.optional(),
            contentChunk: ChunksContentInputSchema.optional(),
        }),
    ),
);

/*
 * Hoisting Nightmare debug prevention
 * Do not try to put those files elsewhere, because base on how you transpile the code, it may not work
 * as we have recursive imports here
 */
export const ChoiceContentInputSchema = NestableComponentContentInputSchema;
export type ChoiceContentInput = z.infer<typeof ChoiceContentInputSchema>;
export const ChunksContentInputSchema = z.object({
    chunks: z.array(z.array(NestableComponentContentInputSchema)),
});
export type ChunksContentInput = z.infer<typeof ChunksContentInputSchema>;
export const MultipleChoicesContentInputSchema = z.array(NestableComponentContentInputSchema);
export type MultipleChoicesContentInput = z.infer<typeof MultipleChoicesContentInputSchema>;

export const PieceContentInputSchema = z.object({
    identifier: z.string(),
    components: z.array(NestableComponentContentInputSchema),
});
export type PieceContentInput = z.infer<typeof PieceContentInputSchema>;
