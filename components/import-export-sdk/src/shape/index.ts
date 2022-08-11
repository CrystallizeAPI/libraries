import { ClientInterface } from '@crystallize/js-api-client';
import { z } from 'zod';

import { ShapeImportSpecSchema } from '../import/schema';
import { CreateShapeInputSchema, UpdateShapeInputSchema } from '../schema/shape';
import { create } from './mutations/create';
import { update } from './mutations/update';
import { get } from './queries/get';

export { get } from './queries/get';
export { create } from './mutations/create';
export { update } from './mutations/update';

export const shape = async ({
    client,
    shape,
}: {
    client: ClientInterface;
    shape: z.infer<typeof ShapeImportSpecSchema>;
}) => {
    const tenantId = client.config.tenantId || '';

    if (await get({ client, tenantId, identifier: shape.identifier })) {
        return update({
            tenantId,
            identifier: shape.identifier,
            input: UpdateShapeInputSchema.parse(shape),
        });
    }

    return create({
        input: CreateShapeInputSchema.parse({
            ...shape,
            tenantId,
        }),
    });
};
