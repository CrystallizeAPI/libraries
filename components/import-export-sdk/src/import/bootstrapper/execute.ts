import { BootstrapperContext, EventTypes, ExecutionOptions } from '../types';
import { handleShapes } from './shapes';
import { handleTopics } from './topics';

export const execute = async ({ ctx, options }: { ctx: BootstrapperContext; options?: ExecutionOptions }) => {
    const { schema } = ctx;

    if (schema.shapes?.length) {
        await handleShapes({ ctx });
    }

    if (schema.topics?.length) {
        await handleTopics({ ctx });
    }

    if (options?.dryRun) {
        ctx.eventEmitter.emit(EventTypes.end, {
            message: 'Dry run completed successfully',
        });
        return;
    }

    if (ctx.logLevel === 'debug') {
        ctx.eventEmitter.emit(EventTypes.debug, `Executing ${ctx.massClient.queue.length} mutations`);
    }

    await ctx.massClient.execute();
    ctx.eventEmitter.emit(EventTypes.end);
};
