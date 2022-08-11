import { shape } from '../../shape';
import { BootstrapperContext } from '../types';

export const handleShapes = async ({ ctx }: { ctx: BootstrapperContext }) => {
    const { schema } = ctx;
    if (!schema?.shapes?.length) {
        return;
    }

    await Promise.all(
        schema.shapes.map((schema) =>
            shape({ client: ctx.massClient, shape: schema }).then(({ query, variables }) =>
                ctx.massClient.enqueue.pimApi(query, variables),
            ),
        ),
    );
};
