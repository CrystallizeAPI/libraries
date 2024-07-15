import { VariablesType } from '@crystallize/js-api-client';
import {
    ComponentChoiceComponentConfig,
    ContentChunkComponentConfig,
    NextPimCreateShapeInputSchema,
    Shape,
    ShapeComponent,
    ShapeComponentInput,
    UpdateShapeInputSchema,
} from '@crystallize/schema';
import { ThinClient } from '../shared/thin-client.js';
import { createShapeMutation } from './mutations/create.js';
import { updateShapeMutation } from './mutations/update.js';
import { getShapeQuery } from './queries/get.js';

export { getShapeQuery } from './queries/get.js';
export { createShapeMutation } from './mutations/create.js';
export { updateShapeMutation } from './mutations/update.js';

interface ShapeOperation {
    exists: (client: ThinClient) => Promise<boolean>;
    execute: (client: ThinClient) => Promise<Shape | undefined>;
    enqueue: (massClient: ThinClient) => Promise<void>;
}

/**
 * shapeComponentToInput converts a provided ShapeComponent to the respective
 * ShapeComponentInput type. The only difference in structure between these two
 * types is the way `config` is mapped.
 *
 * @param component ShapeComponent
 * @returns ShapeComponentInput
 */
const shapeComponentToInput = (component: ShapeComponent): ShapeComponentInput => {
    if (!component.config) {
        return component as ShapeComponentInput;
    }

    if (component.type === 'contentChunk') {
        const config = component.config as ContentChunkComponentConfig;
        return {
            ...component,
            config: {
                contentChunk: {
                    ...config,
                    components: config.components.map(shapeComponentToInput),
                },
            },
        };
    }

    if (component.type === 'componentChoice') {
        const config = component.config as ComponentChoiceComponentConfig;
        return {
            ...component,
            config: {
                componentChoice: {
                    ...config,
                    choices: config.choices.map(shapeComponentToInput),
                },
            },
        };
    }

    return {
        ...component,
        config: {
            [component.type]: component.config,
        },
    };
};

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
            identifier: data.identifier,
        });
        const res = await client.nextPimApi(query, variables).then((res) => res?.shape);
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
                identifier: data.identifier,
                input: UpdateShapeInputSchema.parse({
                    ...data,
                    components: data.components?.map(shapeComponentToInput),
                    variantComponents: data.variantComponents?.map(shapeComponentToInput),
                }),
            });
        }

        return createShapeMutation({
            input: NextPimCreateShapeInputSchema.parse({
                ...data,
                components: data.components?.map(shapeComponentToInput),
                variantComponents: data.variantComponents?.map(shapeComponentToInput),
                tenantId,
            }),
        });
    };

    const execute = async (client: ThinClient): Promise<Shape | undefined> => {
        const { query, variables, type } = await determineMutation(client);

        return client.nextPimApi(query, variables).then((res) => {
            if (type === 'create') {
                return res?.createShape;
            }
            return res?.updateShape;
        });
    };

    const enqueue = async (client: ThinClient): Promise<void> => {
        const { query, variables } = await determineMutation(client);
        client.enqueue.nextPimApi(query, variables);
    };

    return {
        exists,
        execute,
        enqueue,
    };
};
