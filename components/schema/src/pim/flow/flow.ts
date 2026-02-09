import { z } from 'zod';
import { DateTimeSchema, KeyValuePairSchema } from '../../shared';

export const FlowStageActionTypeSchema = z.enum([
    'advance',
    'move',
    'publish',
    'removeFromFlow',
    'unpublish',
    'waitAbsolute',
    'waitIndividual',
    'waitRelative',
]);
export type FlowStageActionType = z.infer<typeof FlowStageActionTypeSchema>;

export const FlowTypeSchema = z.enum(['item']);
export type FlowType = z.infer<typeof FlowTypeSchema>;

export const FlowStageActionNotProcessedBehaviorSchema = z.enum(['skip', 'stall']);
export type FlowStageActionNotProcessedBehavior = z.infer<typeof FlowStageActionNotProcessedBehaviorSchema>;

export const FlowStageActionAdvanceSchema = z.object({
    action: z.literal('advance'),
});
export type FlowStageActionAdvance = z.infer<typeof FlowStageActionAdvanceSchema>;

export const FlowStageActionMoveSchema = z.object({
    action: z.literal('move'),
    targetStageIdentifier: z.string().min(1),
});
export type FlowStageActionMove = z.infer<typeof FlowStageActionMoveSchema>;

export const FlowStageActionPublishSchema = z.object({
    action: z.literal('publish'),
    onFailure: FlowStageActionMoveSchema.nullish(),
});
export type FlowStageActionPublish = z.infer<typeof FlowStageActionPublishSchema>;

export const FlowStageActionRemoveFromFlowSchema = z.object({
    action: z.literal('removeFromFlow'),
});
export type FlowStageActionRemoveFromFlow = z.infer<typeof FlowStageActionRemoveFromFlowSchema>;

export const FlowStageActionUnpublishSchema = z.object({
    action: z.literal('unpublish'),
    onFailure: FlowStageActionMoveSchema.nullish(),
});
export type FlowStageActionUnpublish = z.infer<typeof FlowStageActionUnpublishSchema>;

export const FlowStageActionWaitAbsoluteSchema = z.object({
    action: z.literal('waitAbsolute'),
    until: DateTimeSchema,
});
export type FlowStageActionWaitAbsolute = z.infer<typeof FlowStageActionWaitAbsoluteSchema>;

export const FlowStageActionWaitIndividualSchema = z.object({
    action: z.literal('waitIndividual'),
    onExpiredDatetime: FlowStageActionNotProcessedBehaviorSchema.nullish(),
    onMissingDatetime: FlowStageActionNotProcessedBehaviorSchema.nullish(),
});
export type FlowStageActionWaitIndividual = z.infer<typeof FlowStageActionWaitIndividualSchema>;

export const FlowStageActionWaitRelativeSchema = z.object({
    action: z.literal('waitRelative'),
    minutes: z.int().min(1),
});
export type FlowStageActionWaitRelative = z.infer<typeof FlowStageActionWaitRelativeSchema>;

export const FlowStageActionSchema = z.discriminatedUnion('action', [
    FlowStageActionAdvanceSchema,
    FlowStageActionMoveSchema,
    FlowStageActionPublishSchema,
    FlowStageActionRemoveFromFlowSchema,
    FlowStageActionUnpublishSchema,
    FlowStageActionWaitAbsoluteSchema,
    FlowStageActionWaitIndividualSchema,
    FlowStageActionWaitRelativeSchema,
]);
export type FlowStageAction = z.infer<typeof FlowStageActionSchema>;

export const ItemFlowRestrictionsSchema = z.object({
    acceptedShapeIdentifiers: z.array(z.string().min(1)).nullish(),
});
export type ItemFlowRestrictions = z.infer<typeof ItemFlowRestrictionsSchema>;

export const FlowRestrictionsSchema = ItemFlowRestrictionsSchema;
export type FlowRestrictions = z.infer<typeof FlowRestrictionsSchema>;

const BaseFlowSchema = z.object({
    createdAt: DateTimeSchema,
    identifier: z.string().min(1),
    meta: z.array(KeyValuePairSchema).nullish(),
    metaProperty: z.string().nullish(),
    name: z.string().min(1),
    restrictions: FlowRestrictionsSchema.nullish(),
    stageIdentifiers: z.array(z.string().min(1)),
    type: FlowTypeSchema,
    updatedAt: DateTimeSchema.nullish(),
});

export const FlowStageSchema = z.object({
    actions: z.array(FlowStageActionSchema).nullish(),
    createdAt: DateTimeSchema,
    flow: BaseFlowSchema,
    flowIdentifier: z.string().min(1),
    identifier: z.string().min(1),
    meta: z.array(KeyValuePairSchema).nullish(),
    metaProperty: z.string().nullish(),
    name: z.string().min(1),
    updatedAt: DateTimeSchema.nullish(),
});
export type FlowStage = z.infer<typeof FlowStageSchema>;

export const FlowSchema = BaseFlowSchema.extend({
    stages: z.array(FlowStageSchema),
});
export type Flow = z.infer<typeof FlowSchema>;
