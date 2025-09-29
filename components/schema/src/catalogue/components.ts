import { z } from 'zod';

export const RichTextContentSchema = z.object({
    html: z.array(z.string()).nullish(),
    json: z.array(z.unknown()).nullish(),
    plainText: z.array(z.string()).nullish(),
});

export type RichTextContent = z.infer<typeof RichTextContentSchema>;

export const ComponentContentTypeSchema = z.enum([
    'BooleanContent',
    'ComponentChoiceContent',
    'ContentChunkContent',
    'ComponentMultipleChoiceContent',
    'DatetimeContent',
    'GridRelationsContent',
    'ImageContent',
    'ItemRelationsContent',
    'LocationContent',
    'NumericContent',
    'ParagraphCollectionContent',
    'PieceContent',
    'PropertiesTableContent',
    'RichTextContent',
    'SelectionContent',
    'SingleLineContent',
    'VideoContent',
    'FileContent',
]);

export type ComponentContentType = z.infer<typeof ComponentContentTypeSchema>;
