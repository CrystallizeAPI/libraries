import { z } from 'zod';

import { BooleanContentInputSchema } from './types/boolean.js';
import { DatetimeContentInputSchema } from './types/datetime.js';
import { GridRelationsContentInputSchema } from './types/grid-relations.js';
import { ImagesContentInputSchema } from './types/images.js';
import { LocationContentInputSchema } from './types/location.js';
import { ParagraphCollectionContentInputSchema } from './types/paragraph-collection.js';
import { RichTextContentInputSchema } from './types/rich-text.js';
import { SingleLineContentInputSchema } from './types/single-line.js';
import { VideosContentInputSchema } from './types/videos.js';
import { NumericContentInputSchema } from './types/numeric.js';
import { FilesContentInputSchema } from './types/files.js';
import { ItemRelationsContentInputSchema } from './types/item-relations.js';
import { PropertiesTableContentInputSchema } from './types/properties-table.js';
import { SelectionContentInputSchema } from './types/selection.js';

export const PieceContentInputSchema = z.object({
    identifier: z.string(),
    get components() {
        return z.array(ComponentContentInputSchema);
    },
});
export type PieceContentInput = z.infer<typeof PieceContentInputSchema>;

export const NestableComponentContentInputSchema = z.object({
    componentId: z.string().min(1),
    files: FilesContentInputSchema.nullish(),
    images: ImagesContentInputSchema.nullish(),
    videos: VideosContentInputSchema.nullish(),
    boolean: BooleanContentInputSchema.nullish(),
    datetime: DatetimeContentInputSchema.nullish(),
    gridRelations: GridRelationsContentInputSchema.nullish(),
    itemRelations: ItemRelationsContentInputSchema.nullish(),
    location: LocationContentInputSchema.nullish(),
    numeric: NumericContentInputSchema.nullish(),
    paragraphCollection: ParagraphCollectionContentInputSchema.nullish(),
    propertiesTable: PropertiesTableContentInputSchema.nullish(),
    richText: RichTextContentInputSchema.nullish(),
    selection: SelectionContentInputSchema.nullish(),
    singleLine: SingleLineContentInputSchema.nullish(),
    piece: PieceContentInputSchema.nullish(),
});

export const ChoiceContentInputSchema = NestableComponentContentInputSchema;
export type ChoiceContentInput = z.infer<typeof ChoiceContentInputSchema>;

export const ChunksContentInputSchema = z.object({
    get chunks() {
        return z.array(z.array(NestableComponentContentInputSchema));
    },
});
export type ChunksContentInput = z.infer<typeof ChunksContentInputSchema>;

export const MultipleChoicesContentInputSchema = z.array(NestableComponentContentInputSchema);
export type MultipleChoicesContentInput = z.infer<typeof MultipleChoicesContentInputSchema>;

export const ComponentContentInputSchema = NestableComponentContentInputSchema.extend({
    componentChoice: ChoiceContentInputSchema.nullish(),
    componentMultipleChoice: MultipleChoicesContentInputSchema.nullish(),
    contentChunk: ChunksContentInputSchema.nullish(),
});
export type ComponentContentInput = z.infer<typeof ComponentContentInputSchema>;

const plop: ComponentContentInput['piece'] = {
    components: [
        {
            componentId: 'string',
            singleLine: {
                text: 'string',
            },
        },
    ],
    identifier: 'string',
};
