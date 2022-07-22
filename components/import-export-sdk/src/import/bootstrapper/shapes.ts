import { ClientInterface, MassClientInterface } from '@crystallize/js-api-client';
import { createShapeMutation, updateShapeMutation } from '../../shape';
import { getExistingShapes } from '../queries/getExistingShapes';
import { BootstrapperContext, Shape, ShapeSchema } from '../types';

const handleShape = ({
    ctx,
    shape,
    existingShapes,
    massClient,
}: {
    ctx: BootstrapperContext;
    shape: ShapeSchema;
    existingShapes: Shape[];
    massClient: MassClientInterface;
}): void => {
    if (shape.identifier && existingShapes.find(({ identifier }) => identifier === shape.identifier)) {
        const { query, variables } = updateShapeMutation({
            tenantId: ctx.tenantId,
            identifier: shape.identifier,
            input: shape,
        });
        massClient.enqueue.pimApi(query, variables);
        return;
    }

    const { query, variables } = createShapeMutation({
        input: {
            ...shape,
            tenantId: ctx.tenantId,
        },
    });
    massClient.enqueue.pimApi(query, variables);
};

export const handleShapes = async ({
    ctx,
    client,
    massClient,
}: {
    ctx: BootstrapperContext;
    client: ClientInterface;
    massClient: MassClientInterface;
}) => {
    const { schema } = ctx;
    if (!schema?.shapes?.length) {
        return;
    }

    const existingShapes = await getExistingShapes({ ctx, client });
    schema.shapes.forEach((shape) => handleShape({ ctx, shape, existingShapes, massClient }));
};
