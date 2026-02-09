import { z } from 'zod';
import { DateTimeSchema, IdSchema, KeyValuePairInputSchema, VersionLabelSchema } from '../../shared';
import { FlowStageActionNotProcessedBehaviorSchema, FlowStageActionTypeSchema, FlowTypeSchema } from './flow';

export const FlowStageMoveActionTypeSchema = z.enum(['advance', 'move', 'removeFromFlow']);
export type FlowStageMoveActionType = z.infer<typeof FlowStageMoveActionTypeSchema>;

export const FlowStageActionMoveInputSchema = z.object({
    targetStageIdentifier: z.string().min(1),
});
export type FlowStageActionMoveInput = z.infer<typeof FlowStageActionMoveInputSchema>;

export const FlowStageMoveActionInputSchema = z.object({
    action: FlowStageMoveActionTypeSchema,
    move: FlowStageActionMoveInputSchema.nullish(),
});
export type FlowStageMoveActionInput = z.infer<typeof FlowStageMoveActionInputSchema>;

export const FlowStageActionPublishInputSchema = z.object({
    onFailure: FlowStageMoveActionInputSchema.nullish(),
});
export type FlowStageActionPublishInput = z.infer<typeof FlowStageActionPublishInputSchema>;

export const FlowStageActionUnpublishInputSchema = z.object({
    onFailure: FlowStageMoveActionInputSchema.nullish(),
});
export type FlowStageActionUnpublishInput = z.infer<typeof FlowStageActionUnpublishInputSchema>;

export const FlowStageActionWaitAbsoluteInputSchema = z.object({
    until: DateTimeSchema,
});
export type FlowStageActionWaitAbsoluteInput = z.infer<typeof FlowStageActionWaitAbsoluteInputSchema>;

export const FlowStageActionWaitIndividualInputSchema = z.object({
    onExpiredDatetime: FlowStageActionNotProcessedBehaviorSchema.nullish(),
    onMissingDatetime: FlowStageActionNotProcessedBehaviorSchema.nullish(),
});
export type FlowStageActionWaitIndividualInput = z.infer<typeof FlowStageActionWaitIndividualInputSchema>;

export const FlowStageActionWaitRelativeInputSchema = z.object({
    days: z.int().nullish(),
    hours: z.int().nullish(),
    minutes: z.int().nullish(),
});
export type FlowStageActionWaitRelativeInput = z.infer<typeof FlowStageActionWaitRelativeInputSchema>;

export const FlowStageActionInputSchema = z.object({
    action: FlowStageActionTypeSchema,
    move: FlowStageActionMoveInputSchema.nullish(),
    publish: FlowStageActionPublishInputSchema.nullish(),
    unpublish: FlowStageActionUnpublishInputSchema.nullish(),
    waitAbsolute: FlowStageActionWaitAbsoluteInputSchema.nullish(),
    waitIndividual: FlowStageActionWaitIndividualInputSchema.nullish(),
    waitRelative: FlowStageActionWaitRelativeInputSchema.nullish(),
});
export type FlowStageActionInput = z.infer<typeof FlowStageActionInputSchema>;

export const ItemFlowRestrictionsInputSchema = z.object({
    acceptedShapeIdentifiers: z.array(z.string().min(1)).nullish(),
});
export type ItemFlowRestrictionsInput = z.infer<typeof ItemFlowRestrictionsInputSchema>;

export const FlowRestrictionsInputSchema = z.object({
    item: ItemFlowRestrictionsInputSchema.nullish(),
});
export type FlowRestrictionsInput = z.infer<typeof FlowRestrictionsInputSchema>;

export const EmbeddedFlowStageInputSchema = z.object({
    actions: z.array(FlowStageActionInputSchema).nullish(),
    identifier: z.string().min(1),
    meta: z.array(KeyValuePairInputSchema).nullish(),
    name: z.string().min(1),
});
export type EmbeddedFlowStageInput = z.infer<typeof EmbeddedFlowStageInputSchema>;

export const CreateFlowInputSchema = z.object({
    meta: z.array(KeyValuePairInputSchema).nullish(),
    name: z.string().min(1),
    restrictions: FlowRestrictionsInputSchema.nullish(),
    stages: z.array(EmbeddedFlowStageInputSchema),
    type: FlowTypeSchema,
});
export type CreateFlowInput = z.infer<typeof CreateFlowInputSchema>;

export const UpdateFlowInputSchema = z.object({
    meta: z.array(KeyValuePairInputSchema).nullish(),
    name: z.string().min(1).nullish(),
    restrictions: FlowRestrictionsInputSchema.nullish(),
    stages: z.array(EmbeddedFlowStageInputSchema).nullish(),
});
export type UpdateFlowInput = z.infer<typeof UpdateFlowInputSchema>;

export const FlowContentActionConfigWaitIndividualInputSchema = z.object({
    until: DateTimeSchema,
});
export type FlowContentActionConfigWaitIndividualInput = z.infer<
    typeof FlowContentActionConfigWaitIndividualInputSchema
>;

export const FlowContentActionConfigInputSchema = z.object({
    stageIdentifier: z.string().min(1).optional(),
    waitIndividual: FlowContentActionConfigWaitIndividualInputSchema.optional(),
});
export type FlowContentActionConfigInput = z.infer<typeof FlowContentActionConfigInputSchema>;

export const ItemFlowStageAssociationInputSchema = z.object({
    id: IdSchema,
    language: z.string().min(1).optional(),
    version: VersionLabelSchema.optional(),
});
export type ItemFlowStageAssociationInput = z.infer<typeof ItemFlowStageAssociationInputSchema>;
