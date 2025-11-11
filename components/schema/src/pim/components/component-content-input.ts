import { z } from 'zod';

import { BooleanContentInputSchema } from './types/boolean';
import { DatetimeContentInputSchema } from './types/datetime';
import { GridRelationsContentInputSchema } from './types/grid-relations';
import { ImagesContentInputSchema } from './types/images';
import { LocationContentInputSchema } from './types/location';
import { ParagraphCollectionContentInputSchema } from './types/paragraph-collection';
import { RichTextContentInputSchema } from './types/rich-text';
import { SingleLineContentInputSchema } from './types/single-line';
import { VideosContentInputSchema } from './types/videos';
import { NumericContentInputSchema } from './types/numeric';
import { FilesContentInputSchema } from './types/files';
import { ItemRelationsContentInputSchema } from './types/item-relations';
import { PropertiesTableContentInputSchema } from './types/properties-table';
import { SelectionContentInputSchema } from './types/selection';

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
