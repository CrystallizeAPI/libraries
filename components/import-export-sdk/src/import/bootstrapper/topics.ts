import { bulkCreateTopicsMutation } from '../../topic/mutations/bulkCreate';
import { createTopicMutation } from '../../topic/mutations/create';
import { updateTopicMutation } from '../../topic/mutations/update';
import { CreateChildTopicInput } from '../../topic/types';
import { getExistingTopics } from '../queries/getExistingTopics';
import { BootstrapperContext, EventTypes, ExistingTopic, TopicChildImportSpec, TopicImportSpec } from '../types';

export const handleTopics = async ({ ctx }: { ctx: BootstrapperContext }) => {
    const { schema } = ctx;
    if (!schema?.topics?.length) {
        return;
    }

    const existingTopics = await getExistingTopics({ ctx });

    const existingParentTopics: TopicImportSpec[] = [];
    const nonExistingParentTopics: TopicImportSpec[] = [];

    const toCreateChildTopicInput = (topic: TopicChildImportSpec): CreateChildTopicInput => ({
        name: topic.name,
        pathIdentifier: topic.pathIdentifier,
        children: topic.children?.map(toCreateChildTopicInput),
    });

    schema.topics.forEach((topic) =>
        existingTopics.find(({ id }) => topic.id && topic.id === id)
            ? existingParentTopics.push(topic)
            : nonExistingParentTopics.push(topic),
    );

    const handleTopicChild = (topic: TopicChildImportSpec, parentId: string) => {
        if (existingTopics.find(({ id }) => topic.id && topic.id === id)) {
            const { query, variables } = updateTopicMutation({
                id: topic.id as string,
                language: ctx.tenant.defaults.language,
                input: {
                    name: topic.name,
                    pathIdentifier: topic.pathIdentifier,
                    parentId,
                },
            });
            ctx.massClient.enqueue.pimApi(query, variables);
            topic.children?.forEach((child) => handleTopicChild(child, topic.id as string));
            return;
        }

        const { query, variables } = createTopicMutation({
            language: ctx.tenant.defaults.language,
            input: {
                tenantId: ctx.tenant.id,
                name: topic.name,
                pathIdentifier: topic.pathIdentifier,
                parentId,
                children: topic.children?.map(toCreateChildTopicInput),
            },
        });
        ctx.massClient.enqueue.pimApi(query, variables);
    };

    existingParentTopics.forEach((topic) => {
        const { query, variables } = updateTopicMutation({
            id: topic.id as string,
            language: ctx.tenant.defaults.language,
            input: {
                name: topic.name,
                parentId: topic.parentId,
                pathIdentifier: topic.pathIdentifier,
            },
        });
        ctx.massClient.enqueue.pimApi(query, variables);
        topic.children?.forEach((child) => handleTopicChild(child, topic.id as string));
    });

    if (nonExistingParentTopics.length) {
        const { query, variables } = bulkCreateTopicsMutation({
            tenantId: ctx.tenant.id,
            language: ctx.tenant.defaults.language,
            input: nonExistingParentTopics,
        });
        ctx.massClient.enqueue.pimApi(query, variables);
    }
};
