import { z } from 'zod';
import { ShapeComponentSchema, ShapeTypeEnum } from '../../shape';
import { TopicChildImportSpec } from '../types';

export const ShapeImportSpecSchema = z.object({
    identifier: z.string().min(1),
    name: z.string().min(1),
    type: ShapeTypeEnum,
    components: z.array(ShapeComponentSchema).optional(),
});

export const TopicChildImportSpecSchema: z.ZodType<TopicChildImportSpec> = z.lazy(() =>
    z.object({
        id: z.string().optional(),
        name: z.string().min(1),
        pathIdentifier: z.string().optional(),
        children: z.array(TopicChildImportSpecSchema).optional(),
    }),
);

export const TopicImportSpecSchema = z.object({
    id: z.string().optional(),
    parentId: z.string().optional(),
    name: z.string().min(1),
    pathIdentifier: z.string().optional(),
    children: z.array(TopicChildImportSpecSchema).optional(),
});

export const ImportSpecSchema = z.object({
    shapes: z.array(ShapeImportSpecSchema).optional(),
    topics: z.array(TopicImportSpecSchema).optional(),
});
