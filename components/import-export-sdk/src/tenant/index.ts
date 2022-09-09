import { VariablesType } from '@crystallize/js-api-client';
import { CreateTenantInput, CreateTenantInputSchema, Tenant } from '@crystallize/schema/tenant';
import { ThinClient } from '../shared/thin-client';
import { createTenantMutation } from './mutations/create';

export { createTenantMutation } from './mutations/create';
export { deleteTenantMutation } from './mutations/delete';

interface TenantOperation {
    exists: (client: ThinClient) => Promise<boolean>;
    execute: (client: ThinClient) => Promise<Tenant | undefined>;
    enqueue: (massClient: ThinClient) => Promise<void>;
}

/**
 * shape returns an object of shape operation functions.
 *
 * @param shape Shape to perform an operation on
 * @returns ShapeOperation
 */
export const tenant = (data: CreateTenantInput): TenantOperation => {
    const exists = async (client: ThinClient): Promise<boolean> => {
        return false;
    };

    const determineMutation = async (
        client: ThinClient,
    ): Promise<{ query: string; variables: VariablesType; type: 'create' | 'update' }> => {
        // TODO: Check exists and return update mutation

        return createTenantMutation({
            input: CreateTenantInputSchema.parse(data),
        });
    };

    const execute = async (client: ThinClient): Promise<Tenant | undefined> => {
        const { query, variables, type } = await determineMutation(client);
        return client.pimApi(query, variables).then((res) => res?.tenant?.[type]);
    };

    const enqueue = async (client: ThinClient): Promise<void> => {
        const { query, variables } = await determineMutation(client);
        client.enqueue.pimApi(query, variables);
    };

    return {
        exists,
        execute,
        enqueue,
    };
};
