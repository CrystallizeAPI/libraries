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
import { Component, ComponentSchema } from './component.js';
import { ComponentType, ComponentTypeEnum } from '../../shared/index.js';

type IComponent = {
    componentId: string;
    name: string;
    type: ComponentType;
    content: ComponentContent;
};
export type NestableComponentContent =
    | FilesContent
    | ImagesContent
    | VideosContent
    | BooleanContent
    | DatetimeContent
    | GridRelationsContent
    | ItemRelationsContent
    | LocationContent
    | NumericContent
    | ParagraphCollectionContent
    | PropertiesTableContent
    | RichTextContent
    | SelectionContent
    | SingleLineContent
    // PieceContent |
    | {
          identifier: string;
          components: IComponent[];
      };

export const NestableComponentContentSchema: z.ZodType<NestableComponentContent> = z.lazy(() =>
    z.union([
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
        z.object({
            identifier: z.string().min(1),
            components: z.array(
                z.object({
                    componentId: z.string().min(1),
                    name: z.string().min(1),
                    type: ComponentTypeEnum,
                    content: ComponentContentSchema,
                }),
            ),
        }),
    ]),
);

/*
 * Hoisting Nightmare debug prevention
 * Do not try to put those files elsewhere, because base on how you transpile the code, it may not work
 * as we have recursive imports here
 *
 * Also we have to duplicate the schema here because of lazy loading
 */
export type ComponentContent =
    | NestableComponentContent
    | {
          selectedComponent: IComponent;
      }
    | {
          selectedComponents: IComponent[];
      }
    | {
          chunks: IComponent[][];
      };
export const ComponentContentSchema: z.ZodType<ComponentContent> = z.lazy(() =>
    z.union([
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
        z.object({
            identifier: z.string().min(1),
            components: z.array(ComponentSchema),
        }),
        z.object({
            selectedComponent: ComponentSchema,
        }),
        z.object({
            selectedComponents: z.array(ComponentSchema),
        }),
        z.object({
            chunks: z.array(z.array(ComponentSchema)),
        }),
    ]),
);

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
