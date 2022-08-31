import { ClientInterface } from '@crystallize/js-api-client';
import { CreateProductInputSchema, Item, UpdateProductInputSchema } from '../schema/item';
import { createProductMutation } from './mutations/createProduct';
import { updateProductMutation } from './mutations/updateProduct';
import { getItemQuery } from './queries/get';

export { createProductMutation } from './mutations/createProduct';
export { updateProductMutation } from './mutations/updateProduct';
export { getItemQuery } from './queries/get';

export const item = (item: Item): ((client: ClientInterface) => Promise<Item>) => {
    return async (client: ClientInterface) => {
        const tenantId = client.config.tenantId;
        if (!tenantId) {
            throw new Error('Missing tenantId config in API client');
        }

        let existingItem: Item | undefined;
        if (item.id) {
            const { query, variables } = getItemQuery({
                id: item.id,
                language: item.language,
                versionLabel: 'current',
            });
            existingItem = await client.pimApi(query, variables).then((res) => res?.item?.get);
        }

        if (existingItem) {
            const { query, variables } = updateProductMutation({
                id: existingItem.id,
                language: item.language,
                input: UpdateProductInputSchema.parse(item),
            });
            return client.pimApi(query, variables).then((res) => res?.product?.update);
        }

        const { query, variables } = createProductMutation({
            language: item.language,
            input: CreateProductInputSchema.parse({
                ...item,
                tenantId,
            }),
        });
        return client.pimApi(query, variables).then((res) => res?.product?.create);
    };
};
