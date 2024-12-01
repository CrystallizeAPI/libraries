import { z } from 'zod';

export const ShapeComponentTypeEnum = z.enum([
    'boolean',
    'componentChoice',
    'componentMultipleChoice',
    'contentChunk',
    'datetime',
    'gridRelations',
    'images',
    'itemRelations',
    'location',
    'numeric',
    'paragraphCollection',
    'piece',
    'propertiesTable',
    'richText',
    'selection',
    'singleLine',
    'videos',
    'files',
]);

export type ShapeComponentType = z.infer<typeof ShapeComponentTypeEnum>;
