import { z } from 'zod';

export const ShapeTypeEnum = z.enum(['product', 'document', 'folder']);
export const ShapeComponentTypeEnum = z.enum([
    'boolean',
    'componentChoice',
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

export type ShapeType = z.infer<typeof ShapeTypeEnum>;
export type ShapeComponentType = z.infer<typeof ShapeComponentTypeEnum>;
