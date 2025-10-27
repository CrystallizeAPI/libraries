import { z } from 'zod';
import { CreateItemInputSchema, UpdateItemInputSchema } from '../item-input';

export const CreateFolderInputSchema = CreateItemInputSchema;
export type CreateFolderItemInput = z.infer<typeof CreateItemInputSchema>;

export const UpdateFolderInputSchema = UpdateItemInputSchema;
export type UpdateFolderInput = z.infer<typeof UpdateFolderInputSchema>;
