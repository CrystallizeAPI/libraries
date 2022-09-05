import { z } from 'zod';

export const ItemTypeEnum = z.enum(['product', 'document', 'folder']);

export type ItemType = z.infer<typeof ItemTypeEnum>;
