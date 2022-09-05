import { VariablesType } from '@crystallize/js-api-client';
import { CreateShapeInputSchema, Shape, UpdateShapeInputSchema } from '../schema/shape';
import { ThinClient } from '../shared/thin-client';
import { createShapeMutation } from './mutations/create';
import { updateShapeMutation } from './mutations/update';
import { getShapeQuery } from './queries/get';

export { getShapeQuery } from './queries/get';
export { getManyShapesQuery } from './queries/getMany';
export { createShapeMutation } from './mutations/create';
export { updateShapeMutation } from './mutations/update';

interface ShapeOperation {
    exists: (client: ThinClient) => Promise<boolean>;
    execute: (client: ThinClient) => Promise<Shape | undefined>;
    enqueue: (massClient: ThinClient) => Promise<void>;
}

/**
 * shape returns an object of shape operation functions.
 *
 * @param shape Shape to perform an operation on
 * @returns ShapeOperation
 */
export const shape = (data: Shape): ShapeOperation => {
    const exists = async (client: ThinClient): Promise<boolean> => {
        const tenantId = client.config.tenantId;
        if (!tenantId) {
            throw new Error('Missing tenantId config in API client');
        }
        const { query, variables } = getShapeQuery({
            tenantId,
            identifier: data.identifier,
        });
        const res = await client.pimApi(query, variables).then((res) => res?.shape?.get);
        return !!res;
    };

    const determineMutation = async (
        client: ThinClient,
    ): Promise<{ query: string; variables: VariablesType; type: 'create' | 'update' }> => {
        const tenantId = client.config.tenantId;
        if (!tenantId) {
            throw new Error('Missing tenantId config in API client');
        }

        if (await exists(client)) {
            return updateShapeMutation({
                tenantId,
                identifier: data.identifier,
                input: UpdateShapeInputSchema.parse(data),
            });
        }

        return createShapeMutation({
            input: CreateShapeInputSchema.parse({
                ...data,
                tenantId,
            }),
        });
    };

    const execute = async (client: ThinClient): Promise<Shape | undefined> => {
        const { query, variables, type } = await determineMutation(client);
        return client.pimApi(query, variables).then((res) => res?.shape?.[type]);
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
