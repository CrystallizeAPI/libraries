import { z } from 'zod';
import { ItemSchema } from '../item';

export const FolderSchema = ItemSchema;
export type Folder = z.infer<typeof FolderSchema>;
