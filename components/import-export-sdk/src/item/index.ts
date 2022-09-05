import { VariablesType } from '@crystallize/js-api-client';
import { CreateProductInputSchema, Item, UpdateProductInputSchema } from '../schema/item';
import { ThinClient } from '../shared/thin-client';
import { createProductMutation } from './mutations/createProduct';
import { updateProductMutation } from './mutations/updateProduct';
import { getItemQuery } from './queries/get';

export { createProductMutation } from './mutations/createProduct';
export { updateProductMutation } from './mutations/updateProduct';
export { getItemQuery } from './queries/get';

interface ItemOperation {
    exists: (client: ThinClient) => Promise<boolean>;
    execute: (client: ThinClient) => Promise<Item | undefined>;
    enqueue: (client: ThinClient) => Promise<void>;
}

export const item = (data: Item): ItemOperation => {
    const exists = async (client: ThinClient): Promise<boolean> => {
        if (data.id) {
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

        if (await exists(client)) {
            return updateProductMutation({
                id: data.id,
                language: data.language,
                input: UpdateProductInputSchema.parse(item),
            });
        }

        return createProductMutation({
            language: data.language,
            input: CreateProductInputSchema.parse({
                ...item,
                tenantId,
            }),
        });
    };

    const execute = async (client: ThinClient) => {
        const { query, variables, type } = await determineMutation(client);
        return client.pimApi(query, variables).then((res) => res?.product?.[type]);
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
