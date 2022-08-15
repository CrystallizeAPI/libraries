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
    topic: topicData,
}: {
    client: ClientInterface;
    language: string;
    topic: z.infer<typeof TopicSchema>;
}) => {
    if (topicData.id) {
        const { query, variables } = await getTopicQuery({ id: topicData.id, language });
        const existingTopic: Topic | undefined = await client.pimApi(query, variables).then((res) => res?.topic?.get);
        if (existingTopic) {
            const { query, variables } = updateTopicMutation({
                id: topicData.id,
                language,
                input: UpdateTopicInputSchema.parse(topicData),
            });
            return client.pimApi(query, variables);
        }
    }

    if (!topicData.children?.length || countChildren(topicData.children) < MAX_CHILD_COUNT) {
        const { query, variables } = createTopicMutation({
            language,
            input: CreateTopicInputSchema.parse({
                ...topicData,
                tenantId: client.config.tenantId,
            }),
        });
        return client.pimApi(query, variables);
    }

    const { query, variables } = createTopicMutation({
        language,
        input: CreateTopicInputSchema.parse({
            ...topicData,
            tenantId: client.config.tenantId,
            children: [],
        }),
    });
    const { id } = await client.pimApi(query, variables).then((res) => res.topic.create);
    for (const child of topicData.children) {
        await topic({
            client,
            language,
            topic: {
                ...child,
                parentId: id,
            },
        });
    }
};
