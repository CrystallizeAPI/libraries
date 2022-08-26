import { z } from 'zod';
import { BooleanContentInput, BooleanContentInputSchema } from './boolean';
import { ContentChunkContentInput, ContentChunkContentInputSchema } from './contentChunk';
import { DatetimeContentInput, DatetimeContentInputSchema } from './datetime';
import { FileInput, FileInputSchema } from './files';
import { GridRelationsContentInput, GridRelationsContentInputSchema } from './gridRelations';
import { ImageInput, ImageInputSchema } from './images';
import { ItemRelationsContentInput, ItemRelationsContentInputSchema } from './itemRelations';
import { LocationContentInput, LocationContentInputSchema } from './location';
import { NumericComponentContentInput, NumericComponentContentInputSchema } from './numeric';
import { ParagraphCollectionContentInput, ParagraphCollectionContentInputSchema } from './paragraphCollection';
import { PropertiesTableContentInput } from './propertiesTable';
import { RichTextContentInput, RichTextContentInputSchema } from './richText';
import { SelectionComponentContentInput, SelectionComponentContentInputSchema } from './selection';
import { SingleLineContentInput, SingleLineContentInputSchema } from './singleLine';
import { VideoInput, VideoInputSchema } from './videos';

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
    z
        .object({
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
            richText: RichTextContentInputSchema.optional(),
            selection: SelectionComponentContentInputSchema.optional(),
            singleLine: SingleLineContentInputSchema.optional(),
        })
        .refine((obj) => Object.keys(obj).length === 1, {
            message: 'Must only provide 1 component input per component',
        }),
);
