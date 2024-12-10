import { z } from 'zod';

import { BooleanConfigInput, BooleanConfigInputSchema } from './types/boolean.js';
import { DatetimeConfigInput, DatetimeConfigInputSchema } from './types/datetime.js';
import { GridRelationsConfigInput, GridRelationsConfigInputSchema } from './types/grid-relations.js';
import { ImagesConfigInput, ImagesConfigInputSchema } from './types/images.js';
import { LocationConfigInput, LocationConfigInputSchema } from './types/location.js';
import { ParagraphCollectionConfigInput, ParagraphCollectionConfigInputSchema } from './types/paragraph-collection.js';
import { RichTextConfigInput, RichTextConfigInputSchema } from './types/rich-text.js';
import { SingleLineConfigInput, SingleLineConfigInputSchema } from './types/single-line.js';
import { VideosConfigInput, VideosConfigInputSchema } from './types/videos.js';
import { NumericConfigInput, NumericConfigInputSchema } from './types/numeric.js';
import { FilesConfigInput, FilesConfigInputSchema } from './types/files.js';
import { ItemRelationsConfigInput, ItemRelationsConfigInputSchema } from './types/item-relations.js';
import { PropertiesTableConfigInput, PropertiesTableConfigInputSchema } from './types/properties-table.js';
import { SelectionConfigInput, SelectionConfigInputSchema } from './types/selection.js';
import { GenericComponentConfigInputSchema } from './shared.js';
import { ComponentDefinitionInputSchema } from './component-definition.js';

export type NestableComponentConfigInput = {
    files?: FilesConfigInput;
    images?: ImagesConfigInput;
    videos?: VideosConfigInput;
    boolean?: BooleanConfigInput;
    datetime?: DatetimeConfigInput;
    gridRelations?: GridRelationsConfigInput;
    itemRelations?: ItemRelationsConfigInput;
    location?: LocationConfigInput;
    numeric?: NumericConfigInput;
    paragraphCollection?: ParagraphCollectionConfigInput;
    propertiesTable?: PropertiesTableConfigInput;
    richText?: RichTextConfigInput;
    selection?: SelectionConfigInput;
    singleLine?: SingleLineConfigInput;
    piece?: PieceConfigInput;
};

export const NestableComponentConfigInputSchema: z.ZodType<NestableComponentConfigInput> = z.lazy(() =>
    z.object({
        files: FilesConfigInputSchema.optional(),
        images: ImagesConfigInputSchema.optional(),
        videos: VideosConfigInputSchema.optional(),
        boolean: BooleanConfigInputSchema.optional(),
        datetime: DatetimeConfigInputSchema.optional(),
        gridRelations: GridRelationsConfigInputSchema.optional(),
        itemRelations: ItemRelationsConfigInputSchema.optional(),
        location: LocationConfigInputSchema.optional(),
        numeric: NumericConfigInputSchema.optional(),
        paragraphCollection: ParagraphCollectionConfigInputSchema.optional(),
        propertiesTable: PropertiesTableConfigInputSchema.optional(),
        richText: RichTextConfigInputSchema.optional(),
        selection: SelectionConfigInputSchema.optional(),
        singleLine: SingleLineConfigInputSchema.optional(),
        piece: PieceConfigInputSchema.optional(),
    }),
);

export type ComponentConfigInput = NestableComponentConfigInput & {
    componentChoice?: ChoiceConfigInput;
    componentMultipleChoice?: MultipleChoicesConfigInput;
    contentChunk?: ChunksConfigInput;
};

export const ComponentConfigInputSchema: z.ZodType<ComponentConfigInput> = z.lazy(() =>
    NestableComponentConfigInputSchema.and(
        z.object({
            componentChoice: ChoiceConfigInputSchema.optional(),
            componentMultipleChoice: MultipleChoicesConfigInputSchema.optional(),
            contentChunk: ChunksConfigInputSchema.optional(),
        }),
    ),
);

/*
 * Hoisting Nightmare debug prevention
 * Do not try to put those files elsewhere, because base on how you transpile the code, it may not work
 * as we have recursive imports here
 */
export const ChoiceConfigInputSchema = GenericComponentConfigInputSchema.extend({
    choices: z.array(ComponentDefinitionInputSchema),
});
export type ChoiceConfigInput = z.infer<typeof ChoiceConfigInputSchema>;

export const ChunksConfigInputSchema = GenericComponentConfigInputSchema.extend({
    components: z.array(ComponentDefinitionInputSchema),
    repeatable: z.boolean().optional(),
});
export type ChunksConfigInput = z.infer<typeof ChunksConfigInputSchema>;

export const MultipleChoicesConfigInputSchema = GenericComponentConfigInputSchema.extend({
    choices: z.array(ComponentDefinitionInputSchema),
    allowDuplicates: z.boolean().optional(),
});
export type MultipleChoicesConfigInput = z.infer<typeof MultipleChoicesConfigInputSchema>;

export const PieceConfigInputSchema = GenericComponentConfigInputSchema.extend({
    identifier: z.string().min(1),
});
export type PieceConfigInput = z.infer<typeof PieceConfigInputSchema>;
