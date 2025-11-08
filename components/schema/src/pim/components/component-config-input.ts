import { z } from 'zod';

import { BooleanConfigInputSchema } from './types/boolean.js';
import { DatetimeConfigInputSchema } from './types/datetime.js';
import { GridRelationsConfigInputSchema } from './types/grid-relations.js';
import { ImagesConfigInputSchema } from './types/images.js';
import { LocationConfigInputSchema } from './types/location.js';
import { ParagraphCollectionConfigInputSchema } from './types/paragraph-collection.js';
import { RichTextConfigInputSchema } from './types/rich-text.js';
import { SingleLineConfigInputSchema } from './types/single-line.js';
import { VideosConfigInputSchema } from './types/videos.js';
import { NumericConfigInputSchema } from './types/numeric.js';
import { FilesConfigInputSchema } from './types/files.js';
import { ItemRelationsConfigInputSchema } from './types/item-relations.js';
import { PropertiesTableConfigInputSchema } from './types/properties-table.js';
import { SelectionConfigInputSchema } from './types/selection.js';
import { GenericComponentConfigInputSchema } from './shared.js';
import { ComponentDefinitionInputSchema } from './component-definition.js';

export const ChoiceConfigInputSchema = GenericComponentConfigInputSchema.extend({
    get choices() {
        return z.array(ComponentDefinitionInputSchema);
    },
});
export type ChoiceConfigInput = z.infer<typeof ChoiceConfigInputSchema>;

export const ChunksConfigInputSchema = GenericComponentConfigInputSchema.extend({
    get components() {
        return z.array(ComponentDefinitionInputSchema);
    },
    repeatable: z.boolean().optional(),
});
export type ChunksConfigInput = z.infer<typeof ChunksConfigInputSchema>;

export const MultipleChoicesConfigInputSchema = GenericComponentConfigInputSchema.extend({
    get choices() {
        return z.array(ComponentDefinitionInputSchema);
    },
    allowDuplicates: z.boolean().optional(),
});
export type MultipleChoicesConfigInput = z.infer<typeof MultipleChoicesConfigInputSchema>;

export const PieceConfigInputSchema = GenericComponentConfigInputSchema.extend({
    identifier: z.string().min(1),
});
export type PieceConfigInput = z.infer<typeof PieceConfigInputSchema>;

export const NestableComponentConfigInputSchema = z.object({
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
});
export type NestableComponentConfigInput = z.infer<typeof NestableComponentConfigInputSchema>;

export const ComponentConfigInputSchema = NestableComponentConfigInputSchema.extend({
    componentChoice: ChoiceConfigInputSchema.optional(),
    componentMultipleChoice: MultipleChoicesConfigInputSchema.optional(),
    contentChunk: ChunksConfigInputSchema.optional(),
});
export type ComponentConfigInput = z.infer<typeof ComponentConfigInputSchema>;
