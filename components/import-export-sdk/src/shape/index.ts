import { ClientInterface } from '@crystallize/js-api-client';

import { CreateShapeInputSchema, Shape, UpdateShapeInputSchema } from '../schema/shape';
import { createShapeMutation } from './mutations/create';
import { updateShapeMutation } from './mutations/update';
import { getShapeQuery } from './queries/get';

export { getShapeQuery } from './queries/get';
export { createShapeMutation } from './mutations/create';
export { updateShapeMutation } from './mutations/update';

export const shape = async ({ client, shape }: { client: ClientInterface; shape: Shape }) => {
    const tenantId = client.config.tenantId;
    if (!tenantId) {
        throw new Error('Missing tenantId config in API client');
    }

    const { query, variables } = getShapeQuery({ tenantId, identifier: shape.identifier });
    const existingShape: Shape | undefined = await client.pimApi(query, variables).then((res) => res?.shape?.get);
    if (existingShape) {
        const { query, variables } = updateShapeMutation({
            tenantId,
            identifier: shape.identifier,
            input: UpdateShapeInputSchema.parse(shape),
        });
        return client.pimApi(query, variables);
    } else {
        const { query, variables } = createShapeMutation({
            input: CreateShapeInputSchema.parse({
                ...shape,
                tenantId,
            }),
        });
        return client.pimApi(query, variables);
    }
};
