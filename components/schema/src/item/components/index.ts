import { z } from 'zod';
import { BooleanContentInput, BooleanContentInputSchema } from './boolean/index.js';
import { ContentChunkContentInput, ContentChunkContentInputSchema } from './contentChunk/index.js';
import { DatetimeContentInput, DatetimeContentInputSchema } from './datetime/index.js';
import { FileInput, FileInputSchema } from './files/index.js';
import { GridRelationsContentInput, GridRelationsContentInputSchema } from './gridRelations/index.js';
import { ImageInput, ImageInputSchema } from './images/index.js';
import { ItemRelationsContentInput, ItemRelationsContentInputSchema } from './itemRelations/index.js';
import { LocationContentInput, LocationContentInputSchema } from './location/index.js';
import { NumericComponentContentInput, NumericComponentContentInputSchema } from './numeric/index.js';
import { ParagraphCollectionContentInput, ParagraphCollectionContentInputSchema } from './paragraphCollection/index.js';
import { PropertiesTableContentInput, PropertiesTableContentInputSchema } from './propertiesTable/index.js';
import { RichTextContentInput, RichTextContentInputSchema } from './richText/index.js';
import { SelectionComponentContentInput, SelectionComponentContentInputSchema } from './selection/index.js';
import { SingleLineContentInput, SingleLineContentInputSchema } from './singleLine/index.js';
import { VideoInput, VideoInputSchema } from './videos/index.js';

export type ComponentInput = {
    componentId: string;
    files?: FileInput[];
    images?: ImageInput[];
    videos?: VideoInput[];
    componentChoice?: ComponentInput;
    contentChunk?: ContentChunkContentInput;
    boolean?: BooleanContentInput;
    datetime?: DatetimeContentInput;
    gridRelations?: GridRelationsContentInput;
    itemRelations?: ItemRelationsContentInput;
    location?: LocationContentInput;
    numeric?: NumericComponentContentInput;
    paragraphCollection?: ParagraphCollectionContentInput;
    propertiesTable?: PropertiesTableContentInput;
    richText?: RichTextContentInput;
    selection?: SelectionComponentContentInput;
    singleLine?: SingleLineContentInput;
};

export const ComponentInputSchema: z.ZodType<ComponentInput> = z.lazy(() =>
    z.object({
        componentId: z.string().min(1),
        files: z.array(FileInputSchema).optional(),
        images: z.array(ImageInputSchema).optional(),
        videos: z.array(VideoInputSchema).optional(),
        componentChoice: ComponentInputSchema.optional(),
        contentChunk: ContentChunkContentInputSchema.optional(),
        boolean: BooleanContentInputSchema.optional(),
        datetime: DatetimeContentInputSchema.optional(),
        gridRelations: GridRelationsContentInputSchema.optional(),
        itemRelations: ItemRelationsContentInputSchema.optional(),
        location: LocationContentInputSchema.optional(),
        numeric: NumericComponentContentInputSchema.optional(),
        paragraphCollection: ParagraphCollectionContentInputSchema.optional(),
        propertiesTable: PropertiesTableContentInputSchema.optional(),
        richText: RichTextContentInputSchema.optional(),
        selection: SelectionComponentContentInputSchema.optional(),
        singleLine: SingleLineContentInputSchema.optional(),
    }),
);
