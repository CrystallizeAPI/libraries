import { ClientInterface } from '@crystallize/js-api-client';
import { z } from 'zod';

import { CreateTopicInputSchema, UpdateTopicInputSchema, MAX_CHILD_COUNT, TopicSchema, Topic } from '../schema/topic';
import { createTopicMutation } from './mutations/create';
import { updateTopicMutation } from './mutations/update';
import { getTopicQuery } from './queries/get';

export { bulkCreateTopicsMutation } from './mutations/bulkCreate';
export { createTopicMutation } from './mutations/create';
export { updateTopicMutation } from './mutations/update';
export { getTopicQuery } from './queries/get';

const countChildren = (children: Topic[]): number =>
    children.reduce((acc, child) => (child.children?.length ? acc + 1 + countChildren(child.children) : acc + 1), 0);

export const topic = async ({
    client,
    language,
    data,
}: {
    client: ClientInterface;
    language: string;
    data: z.infer<typeof TopicSchema>;
}): Promise<Topic> => {
    if (data.id) {
        const { query, variables } = await getTopicQuery({ id: data.id, language });
        const existingTopic: Topic | undefined = await client.pimApi(query, variables).then((res) => res?.topic?.get);
        if (existingTopic) {
            const { query, variables } = updateTopicMutation({
                id: data.id,
                language,
                input: UpdateTopicInputSchema.parse(data),
            });
            return client.pimApi(query, variables).then((res) => res?.topic?.update);
        }
    }

    if (!data.children?.length || countChildren(data.children) < MAX_CHILD_COUNT) {
        const { query, variables } = createTopicMutation({
            language,
            input: CreateTopicInputSchema.parse({
                ...data,
                tenantId: client.config.tenantId,
            }),
        });
        return client.pimApi(query, variables).then((res) => res?.topic?.create);
    }

    const { query, variables } = createTopicMutation({
        language,
        input: CreateTopicInputSchema.parse({
            ...data,
            tenantId: client.config.tenantId,
            children: [],
        }),
    });
    const { id }: Topic = await client.pimApi(query, variables).then((res) => res.topic.create);
    for (const child of data.children) {
        await topic({
            client,
            language,
            data: {
                ...child,
                parentId: id,
            },
        });
    }
    return {
        ...data,
        id,
    };
};
