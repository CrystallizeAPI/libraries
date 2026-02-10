import { z } from 'zod';

import { checkResourceIdentifierOrId, IdSchema, RefSchema, ResourceIdentifierSchema } from '../shared';

const itemIdAndResourceIdentifierSchemaFields = {
    itemId: IdSchema.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
};

const createShortcutsFields = {
    _ref: RefSchema.optional(),
    ...itemIdAndResourceIdentifierSchemaFields,
    shortcuts: z.array(
        z.object({
            parentId: IdSchema,
            position: z.number().int().min(0).optional(),
        }),
    ),
};

export const AddItemTreeNodeShortcutsOperationSchema = z
    .object({
        intent: z.literal('item/paths/addShortcuts'),
        ...createShortcutsFields,
    })
    .superRefine(checkResourceIdentifierOrId);

export const SetItemTreeNodeShortcutsOperationSchema = z
    .object({
        intent: z.literal('item/paths/setShortcuts'),
        ...createShortcutsFields,
    })
    .superRefine(checkResourceIdentifierOrId);

export const RemoveItemTreeNodeShortcutsOperationSchema = z
    .object({
        _ref: RefSchema.optional(),
        intent: z.literal('item/paths/removeShortcuts'),
        ...itemIdAndResourceIdentifierSchemaFields,
        parentIds: z.array(IdSchema),
    })
    .superRefine(checkResourceIdentifierOrId);

const withPathsFields = {
    _ref: RefSchema.optional(),
    ...itemIdAndResourceIdentifierSchemaFields,
    language: z.string().min(1),
    paths: z.array(z.string().min(1)),
};

export const AddItemTreeNodeAliasesOperationSchema = z
    .object({
        intent: z.literal('item/paths/addAliases'),
        ...withPathsFields,
    })
    .superRefine(checkResourceIdentifierOrId);

export const SetItemTreeNodeAliasesOperationSchema = z
    .object({
        intent: z.literal('item/paths/setAliases'),
        ...withPathsFields,
    })
    .superRefine(checkResourceIdentifierOrId);

export const RemoveItemTreeNodeAliasesOperationSchema = z
    .object({
        intent: z.literal('item/paths/removeAliases'),
        ...withPathsFields,
    })
    .superRefine(checkResourceIdentifierOrId);

export const AddItemTreeNodeHistoryOperationSchema = z
    .object({
        intent: z.literal('item/paths/addHistory'),
        ...withPathsFields,
    })
    .superRefine(checkResourceIdentifierOrId);

export const SetItemTreeNodeHistoryOperationSchema = z
    .object({
        intent: z.literal('item/paths/setHistory'),
        ...withPathsFields,
    })
    .superRefine(checkResourceIdentifierOrId);

export const RemoveItemTreeNodeHistoryOperationSchema = z
    .object({
        intent: z.literal('item/paths/removeHistory'),
        ...withPathsFields,
    })
    .superRefine(checkResourceIdentifierOrId);

export type AddItemTreeNodeShortcutsOperation = z.infer<typeof AddItemTreeNodeShortcutsOperationSchema>;
export type AddItemTreeNodeAliasesOperation = z.infer<typeof AddItemTreeNodeAliasesOperationSchema>;
export type AddItemTreeNodeHistoryOperation = z.infer<typeof AddItemTreeNodeHistoryOperationSchema>;

export type RemoveItemTreeNodeShortcutsOperation = z.infer<typeof RemoveItemTreeNodeShortcutsOperationSchema>;
export type RemoveItemTreeNodeAliasesOperation = z.infer<typeof RemoveItemTreeNodeAliasesOperationSchema>;
export type RemoveItemTreeNodeHistoryOperation = z.infer<typeof RemoveItemTreeNodeHistoryOperationSchema>;

export type SetItemTreeNodeShortcutsOperation = z.infer<typeof SetItemTreeNodeShortcutsOperationSchema>;
export type SetItemTreeNodeAliasesOperation = z.infer<typeof SetItemTreeNodeAliasesOperationSchema>;
export type SetItemTreeNodeHistoryOperation = z.infer<typeof SetItemTreeNodeHistoryOperationSchema>;
