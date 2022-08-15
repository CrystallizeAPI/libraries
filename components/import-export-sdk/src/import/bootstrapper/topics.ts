import { BootstrapperContext } from '../types';
import { topic } from '../../topic';

export const handleTopics = async ({ ctx }: { ctx: BootstrapperContext }) => {
    const { schema } = ctx;
    if (!schema?.topics?.length) {
        return;
    }

    for (const topicData of schema.topics) {
        await topic({ client: ctx.massClient, language: 'en', topic: topicData });
    }
};
