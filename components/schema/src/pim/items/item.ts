import { z } from 'zod';
import { DateTimeSchema, IdSchema, ItemTypeSchema, VersionLabelSchema } from '../../shared';
import { ComponentContentSchema } from '../components';

const OwnerSchema = z.object({
    companyName: z.string().nullish(),
    email: z.string().nullish(),
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    id: IdSchema.optional(),
});

const TreeNode = z.object({
    parentId: IdSchema.optional(),
    position: z.number().optional(),
    path: z.string().optional(),
});

export const ItemSchema = z.object({
    availableVersions: z
        .array(
            z.object({
                createdAt: DateTimeSchema.optional(),
                id: IdSchema.nullish(),
                label: VersionLabelSchema.optional(),
                owner: OwnerSchema.nullish(),
            }),
        )
        .optional(),
    createdAt: DateTimeSchema.optional(),
    externalReference: z.string().nullish(),
    id: IdSchema.optional(),
    name: z.string().optional(),
    language: z.string().optional(),
    shapeIdentifier: z.string().optional(),
    updatedAt: DateTimeSchema.optional(),
    version: z
        .object({
            id: IdSchema.nullish(),
            label: VersionLabelSchema.optional(),
            createdAt: DateTimeSchema.optional(),
            owner: OwnerSchema.nullish(),
        })
        .optional(),
    type: ItemTypeSchema.optional(),

    // @todo: provide all the topic field definitions
    topics: z
        .array(
            z.object({
                id: IdSchema.optional(),
                name: z.string().nullish(),
                path: z.string().optional(),
                displayColor: z.string().nullish(),
            }),
        )
        .optional(),

    // @todo: do we add shape here ?
    // shape:

    // @todo: tree is not fully defined here
    tree: TreeNode.extend({
        itemId: IdSchema.optional(),
        aliases: z.array(z.string()).optional(),
        history: z.array(z.string()).optional(),
        shortcuts: z.array(TreeNode).optional(),
    }).optional(),

    components: z.array(ComponentContentSchema).optional(),
});
