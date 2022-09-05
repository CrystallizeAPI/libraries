import { CreateTopicInputSchema, UpdateTopicInputSchema, MAX_CHILD_COUNT, Topic } from '@crystallize/schema/topic';
import { ThinClient } from '../shared/thin-client';
import { createTopicMutation } from './mutations/create';
import { updateTopicMutation } from './mutations/update';
import { getTopicQuery } from './queries/get';

export { bulkCreateTopicsMutation } from './mutations/bulkCreate';
export { createTopicMutation } from './mutations/create';
export { updateTopicMutation } from './mutations/update';
export { getTopicQuery } from './queries/get';

const countChildren = (children: Topic[]): number =>
    children.reduce((acc, child) => (child.children?.length ? acc + 1 + countChildren(child.children) : acc + 1), 0);

interface TopicOperation {
    exists: (client: ThinClient) => Promise<boolean>;
    execute: (client: ThinClient) => Promise<Topic | undefined>;
}

export const topic = (data: Topic): TopicOperation => {
    const exists = async (client: ThinClient): Promise<boolean> => {
        if (!data.id) {
            return false;
        }

        const { query, variables } = await getTopicQuery({ id: data.id, language: data.language || 'en' });
        return client.pimApi(query, variables).then((res) => !!res?.topic?.get);
    };

    const execute = async (client: ThinClient): Promise<Topic | undefined> => {
        const { tenantId } = client.config;
        if (!tenantId) {
            throw new Error('Missing tenantId config in API client');
        }

        if (await exists(client)) {
            const { query, variables } = updateTopicMutation({
                id: data.id as string,
                language: data.language || 'en',
                input: UpdateTopicInputSchema.parse(data),
            });
            return client.pimApi(query, variables).then((res) => res?.topic?.update);
        }

        if (!data.children?.length || countChildren(data.children) < MAX_CHILD_COUNT) {
            const { query, variables } = createTopicMutation({
                language: data.language || 'en',
                input: CreateTopicInputSchema.parse({
                    ...data,
                    tenantId,
                }),
            });
            return client.pimApi(query, variables).then((res) => res?.topic?.create);
        }

        const { query, variables } = createTopicMutation({
            language: data.language || 'en',
            input: CreateTopicInputSchema.parse({
                ...data,
                tenantId,
                children: [],
            }),
        });
        const { id }: Topic = await client.pimApi(query, variables).then((res) => res.topic.create);

        for (const child of data.children) {
            await topic({
                ...child,
                parentId: id,
            }).execute(client);
        }

        return {
            ...data,
            id,
        };
    };

    return {
        exists,
        execute,
    };
};
