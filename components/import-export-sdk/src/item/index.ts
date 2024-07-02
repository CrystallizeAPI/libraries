import { VariablesType } from '@crystallize/js-api-client';
import {
    Item,
    CreateDocumentInputSchema,
    CreateFolderInputSchema,
    CreateProductInputSchema,
    UpdateDocumentInputSchema,
    UpdateFolderInputSchema,
    UpdateProductInputSchema,
} from '@crystallize/schema';

import { createDocumentMutation } from './mutations/createDocument.js';
import { createFolderMutation } from './mutations/createFolder.js';
import { createProductMutation } from './mutations/createProduct.js';
import { updateDocumentMutation } from './mutations/updateDocument.js';
import { updateFolderMutation } from './mutations/updateFolder.js';
import { updateProductMutation } from './mutations/updateProduct.js';
import { getItemQuery } from './queries/get.js';

import { ThinClient } from '../shared/thin-client.js';

export { createDocumentMutation } from './mutations/createDocument.js';
export { updateDocumentMutation } from './mutations/updateDocument.js';
export { createFolderMutation } from './mutations/createFolder.js';
export { updateFolderMutation } from './mutations/updateFolder.js';
export { createProductMutation } from './mutations/createProduct.js';
export { updateProductMutation } from './mutations/updateProduct.js';
export { getItemQuery } from './queries/get.js';

interface ItemOperation {
    exists: (client: ThinClient) => Promise<boolean>;
    execute: (client: ThinClient) => Promise<Item | undefined>;
    enqueue: (client: ThinClient) => Promise<void>;
}

export const item = (data: Item): ItemOperation => {
    const exists = async (client: ThinClient): Promise<boolean> => {
        if (!data.id) {
            return false;
        }

        const { query, variables } = getItemQuery({
            id: data.id,
            language: data.language,
            versionLabel: 'current',
        });
        return client.pimApi(query, variables).then((res) => !!res?.item?.get);
    };

    const determineMutation = async (
        client: ThinClient,
    ): Promise<{ query: string; variables: VariablesType; type: 'create' | 'update' }> => {
        const tenantId = client.config.tenantId;
        if (!tenantId) {
            throw new Error('Missing tenantId config in API client');
        }

        const existing = await exists(client);
        if (existing) {
            switch (data.type) {
                case 'product':
                    return updateProductMutation({
                        id: data.id,
                        language: data.language,
                        input: UpdateProductInputSchema.parse(data),
                    });
                case 'document':
                    return updateDocumentMutation({
                        id: data.id,
                        language: data.language,
                        input: UpdateDocumentInputSchema.parse(data),
                    });
                case 'folder':
                    return updateFolderMutation({
                        id: data.id,
                        language: data.language,
                        input: UpdateFolderInputSchema.parse(data),
                    });
            }
        }

        const createInput = {
            ...data,
            shapeIdentifier: data.shape?.identifier,
            tree: {
                // TODO: Get real id
                parentId: tenantId,
            },
            tenantId,
        };

        switch (data.type) {
            case 'product':
                return createProductMutation({
                    language: data.language,
                    input: CreateProductInputSchema.parse(createInput),
                });
            case 'document':
                return createDocumentMutation({
                    language: data.language,
                    input: CreateDocumentInputSchema.parse(createInput),
                });
            case 'folder':
                return createFolderMutation({
                    language: data.language,
                    input: CreateFolderInputSchema.parse(createInput),
                });
        }
    };

    const execute = async (client: ThinClient) => {
        const { query, variables, type } = await determineMutation(client);
        return client.pimApi(query, variables).then((res) => {
            return res?.[data.type]?.[type];
        });
    };

    const enqueue = async (massClient: ThinClient): Promise<void> => {
        const { query, variables } = await determineMutation(massClient);
        massClient.enqueue.pimApi(query, variables);
    };

    return {
        exists,
        execute,
        enqueue,
    };
};
