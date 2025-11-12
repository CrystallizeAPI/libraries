import { z } from 'zod';

import { BooleanConfigInputSchema } from './types/boolean';
import { DatetimeConfigInputSchema } from './types/datetime';
import { GridRelationsConfigInputSchema } from './types/grid-relations';
import { ImagesConfigInputSchema } from './types/images';
import { LocationConfigInputSchema } from './types/location';
import { ParagraphCollectionConfigInputSchema } from './types/paragraph-collection';
import { RichTextConfigInputSchema } from './types/rich-text';
import { SingleLineConfigInputSchema } from './types/single-line';
import { VideosConfigInputSchema } from './types/videos';
import { NumericConfigInputSchema } from './types/numeric';
import { FilesConfigInputSchema } from './types/files';
import { ItemRelationsConfigInputSchema } from './types/item-relations';
import { PropertiesTableConfigInputSchema } from './types/properties-table';
import { SelectionConfigInputSchema } from './types/selection';
import { GenericComponentConfigInputSchema } from './shared';
import { ComponentDefinitionInputSchema } from './component-definition';

export const ChoiceConfigInputSchema = GenericComponentConfigInputSchema.extend({
    get choices(): z.ZodArray<typeof ComponentDefinitionInputSchema> {
        return z.array(ComponentDefinitionInputSchema);
    },
});
export type ChoiceConfigInput = z.infer<typeof ChoiceConfigInputSchema>;

export const ChunksConfigInputSchema = GenericComponentConfigInputSchema.extend({
    get components(): z.ZodArray<typeof ComponentDefinitionInputSchema> {
        return z.array(ComponentDefinitionInputSchema);
    },
    repeatable: z.boolean().optional(),
});
export type ChunksConfigInput = z.infer<typeof ChunksConfigInputSchema>;

export const MultipleChoicesConfigInputSchema = GenericComponentConfigInputSchema.extend({
    get choices(): z.ZodArray<typeof ComponentDefinitionInputSchema> {
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
    get componentChoice(): z.ZodOptional<typeof ChoiceConfigInputSchema> {
        return ChoiceConfigInputSchema.optional();
    },
    get componentMultipleChoice(): z.ZodOptional<typeof MultipleChoicesConfigInputSchema> {
        return MultipleChoicesConfigInputSchema.optional();
    },
    get contentChunk(): z.ZodOptional<typeof ChunksConfigInputSchema> {
        return ChunksConfigInputSchema.optional();
    },
});
export type ComponentConfigInput = z.infer<typeof ComponentConfigInputSchema>;
