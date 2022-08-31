import { z } from 'zod';
import { basicShapeSchema, Shape, ShapeSchema } from '../shape';
import { DateTimeSchema, Id, IdSchema } from '../shared';
import { Topic, TopicSchema } from '../topic';
import { ComponentInputSchema } from './components';
import { ItemType, ItemTypeEnum } from './enums';

export type Item = {
    id: Id;
    tenantId: Id;
    language: string;
    createdAt?: string;
    updatedAt?: string;
    type: ItemType;
    name?: string;
    externalReference?: string;
    shape?: z.infer<typeof basicShapeSchema>;
    components?: any[];
    topics?: Topic[];
    relatingItems?: Item[];
    tree?: {
        path?: string;
    };
};

export const ItemSchema: z.ZodType<Item> = z.lazy(() =>
    z.object({
        id: IdSchema,
        tenantId: IdSchema,
        language: z.string().min(1),
        createdAt: DateTimeSchema.optional(),
        updatedAt: DateTimeSchema.optional(),
        type: ItemTypeEnum,
        name: z.string().optional(),
        externalReference: z.string().optional(),
        components: z.array(z.any()).optional(),
        shape: basicShapeSchema.optional(),
        topics: z.array(TopicSchema).optional(),
        relatingItems: z.array(ItemSchema).optional(),
        tree: z
            .object({
                path: z.string().optional(),
            })
            .optional(),
    }),
);

const createItemInputSchema = z.object({
    tenantId: IdSchema,
    name: z.string().min(1),
    shapeIdentifier: z.string().min(1),
    createdAt: DateTimeSchema.optional(),
    externalReference: z.string().optional(),
    components: z.array(ComponentInputSchema).optional(),
    topicIds: z.array(IdSchema).optional(),
    tree: z.object({
        parentId: IdSchema,
        position: z.number().positive().optional(),
    }),
});

const updateItemInputSchema = z.object({
    name: z.string().optional(),
    createdAt: DateTimeSchema.optional(),
    externalReference: z.string().optional(),
    components: z.array(ComponentInputSchema).optional(),
    topicIds: z.array(IdSchema).optional(),
});

export const ProductVariantAttributeInputSchema = z.object({
    attribute: z.string().min(1),
    value: z.string().min(1),
});

export const CreateProductVariantInputSchema = z.object({
    isDefault: z.boolean(),
    sku: z.string().min(1),
    name: z.string().optional(),
    price: z.number().optional(),
    stock: z.number().optional(),
    attributes: z.array(ProductVariantAttributeInputSchema).optional(),
    components: z.array(ComponentInputSchema).optional(),
    externalReference: z.string().optional(),
});

export const UpdateProductVariantInputSchema = z.object({
    isDefault: z.boolean().optional(),
    sku: z.string().optional(),
    name: z.string().optional(),
    price: z.number().optional(),
    stock: z.number().optional(),
    attributes: z.array(ProductVariantAttributeInputSchema).optional(),
    components: z.array(ComponentInputSchema).optional(),
    externalReference: z.string().optional(),
});

export const CreateDocumentInputSchema = createItemInputSchema;
export const CreateFolderInputSchema = createItemInputSchema;
export const CreateProductInputSchema = createItemInputSchema.extend({
    variants: z.array(CreateProductVariantInputSchema).min(1),
    vatTypeId: IdSchema,
});
export const UpdateDocumentInputSchema = updateItemInputSchema;
export const UpdateFolderInputSchema = updateItemInputSchema;
export const UpdateProductInputSchema = updateItemInputSchema.extend({
    variants: z.array(UpdateProductVariantInputSchema).optional(),
    vatTypeId: IdSchema.optional(),
});

export type ProductVariantAttributeInput = z.infer<typeof ProductVariantAttributeInputSchema>;
export type CreateProductVariantInput = z.infer<typeof CreateProductVariantInputSchema>;
export type UpdateProductVariantInput = z.infer<typeof UpdateProductVariantInputSchema>;

export type CreateDocumentInput = z.infer<typeof CreateDocumentInputSchema>;
export type CreateFolderInput = z.infer<typeof CreateFolderInputSchema>;
export type CreateProductInput = z.infer<typeof CreateProductInputSchema>;

export type UpdateDocumentInput = z.infer<typeof UpdateDocumentInputSchema>;
export type UpdateFolderInput = z.infer<typeof UpdateFolderInputSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductInputSchema>;
