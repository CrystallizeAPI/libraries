import { ClientInterface, MassClientInterface, VariablesType } from '@crystallize/js-api-client';
import { CreateShapeInputSchema, Shape, UpdateShapeInputSchema } from '../schema/shape';
import { createShapeMutation } from './mutations/create';
import { updateShapeMutation } from './mutations/update';
import { getShapeQuery } from './queries/get';

export { getShapeQuery } from './queries/get';
export { createShapeMutation } from './mutations/create';
export { updateShapeMutation } from './mutations/update';

interface Operation {
    execute: (client: ClientInterface) => Promise<Shape | undefined>;
    enqueue: (massClient: MassClientInterface) => Promise<void>;
}

export const shape = (shape: Shape): Operation => {
    const determineMutation = async (
        client: ClientInterface,
    ): Promise<{ query: string; variables: VariablesType; type: 'create' | 'update' }> => {
        const tenantId = client.config.tenantId;
        if (!tenantId) {
            throw new Error('Missing tenantId config in API client');
        }

        const { query, variables } = getShapeQuery({
            tenantId,
            identifier: shape.identifier,
        });
        const existingShape: Shape | undefined = await client.pimApi(query, variables).then((res) => res?.shape?.get);

        if (existingShape) {
            return updateShapeMutation({
                tenantId,
                identifier: shape.identifier,
                input: UpdateShapeInputSchema.parse(shape),
            });
        }

        return createShapeMutation({
            input: CreateShapeInputSchema.parse({
                ...shape,
                tenantId,
            }),
        });
    };

    const execute = async (client: ClientInterface): Promise<Shape | undefined> => {
        const { query, variables, type } = await determineMutation(client);
        return client.pimApi(query, variables).then((res) => res?.shape?.[type]);
    };

    const enqueue = async (massClient: MassClientInterface): Promise<void> => {
        const { query, variables } = await determineMutation(massClient);
        massClient.enqueue.pimApi(query, variables);
    };

    return {
        execute,
        enqueue,
    };
};
