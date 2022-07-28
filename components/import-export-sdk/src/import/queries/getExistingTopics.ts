import { BootstrapperContext, ExistingTopic, Topic } from '../types';

const query = `
    query GET_EXISTING_TOPICS($language: String!, $tenantId: ID!) {
        topic {
            getRootTopics(language: $language, tenantId: $tenantId) {
                id
                path
                descendants {
                  id
                  path
                }
            }
        }
    }
`;

export const getExistingTopics = async ({ ctx }: { ctx: BootstrapperContext }): Promise<ExistingTopic[]> => {
    const res = await ctx.massClient.pimApi(query, { tenantId: ctx.tenant.id, language: ctx.tenant.defaults.language });
    const topics: Topic[] | undefined = res?.topic?.getRootTopics;

    if (!topics) {
        return [];
    }

    if (ctx.logLevel === 'debug') {
        ctx.eventEmitter.emit('DEBUG', res);
    }

    return topics.flatMap((topic) => {
        if (!topic.descendants) {
            return topic;
        }

        return [topic, ...topic.descendants];
    });
};
