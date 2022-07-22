import { ClientInterface, MassClientInterface } from '@crystallize/js-api-client';
import { createMutation, updateMutation } from '../../shape';
import { getExistingShapes } from '../queries/getExistingShapes';
import { BootstrapperContext, CrystallizeJSONShapeSpec, Shape } from '../types';

const handleShape = ({
    ctx,
    shape,
    existingShapes,
    massClient,
}: {
    ctx: BootstrapperContext;
    shape: CrystallizeJSONShapeSpec;
    existingShapes: Shape[];
    massClient: MassClientInterface;
}): void => {
    if (shape.identifier && existingShapes.find(({ identifier }) => identifier === shape.identifier)) {
        const { query, variables } = updateMutation({
            tenantId: ctx.tenantId,
            identifier: shape.identifier,
            input: shape,
        });
        massClient.enqueue.pimApi(query, variables);
    }

    const { query, variables } = createMutation({
        input: shape,
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
    const { spec } = ctx;
    if (!spec?.shapes?.length) {
        return;
    }

    const existingShapes = await getExistingShapes({ ctx, client });
    spec.shapes.forEach((shape) => handleShape({ ctx, shape, existingShapes, massClient }));
};
