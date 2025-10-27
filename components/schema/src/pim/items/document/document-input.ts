import { z } from 'zod';
import { CreateItemInputSchema, UpdateItemInputSchema } from '../item-input';

export const CreateDocumentInputSchema = CreateItemInputSchema;
export type CreateDocumentItemInput = z.infer<typeof CreateItemInputSchema>;

export const UpdateDocumentInputSchema = UpdateItemInputSchema;
export type UpdateDocumentInput = z.infer<typeof UpdateDocumentInputSchema>;
