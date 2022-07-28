import { createShapeMutation, updateShapeMutation } from '../../shape';
import { getExistingShapes } from '../queries/getExistingShapes';
import { BootstrapperContext, ExistingShape, ShapeImportSpec } from '../types';

const handleShape = ({
    ctx,
    shape,
    existingShapes,
}: {
    ctx: BootstrapperContext;
    shape: ShapeImportSpec;
    existingShapes: ExistingShape[];
}): void => {
    if (shape.identifier && existingShapes.find(({ identifier }) => identifier === shape.identifier)) {
        const { query, variables } = updateShapeMutation({
            tenantId: ctx.tenant.id,
            identifier: shape.identifier,
            input: shape,
        });
        ctx.massClient.enqueue.pimApi(query, variables);
        return;
    }

    const { query, variables } = createShapeMutation({
        input: {
            ...shape,
            tenantId: ctx.tenant.id,
        },
    });
    ctx.massClient.enqueue.pimApi(query, variables);
};

export const handleShapes = async ({ ctx }: { ctx: BootstrapperContext }) => {
    const { schema } = ctx;
    if (!schema?.shapes?.length) {
        return;
    }

    const existingShapes = await getExistingShapes({ ctx });
    schema.shapes.forEach((shape) => handleShape({ ctx, shape, existingShapes }));
};
