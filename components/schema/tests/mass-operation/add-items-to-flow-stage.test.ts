import { describe, expect, it } from 'vitest';
import { AddItemsToFlowStageOperation, AddItemsToFlowStageOperationSchema } from '../../src/mass-operation/item';

describe('Mass Operations - Add Items To Flow Stage Operation', {}, async () => {
    it('should parse a valid add-items-to-flow-stage operation', () => {
        const operation: AddItemsToFlowStageOperation = {
            intent: 'item/flow/stage/addItems',
            stageIdentifier: 'in-review',
            moveFromFlowIdentifier: 'content-flow',
            items: [
                {
                    id: '604f7655a16b91dea030895b',
                    language: 'en',
                    version: 'draft',
                },
            ],
            actionConfig: [
                {
                    stageIdentifier: 'in-review',
                    waitIndividual: {
                        until: '2026-02-10T12:00:00.000Z',
                    },
                },
            ],
        };

        expect(AddItemsToFlowStageOperationSchema.safeParse(operation)).toEqual({
            success: true,
            data: operation,
        });
    });

    it('should fail when no items are provided', () => {
        const operation = {
            intent: 'item/flow/stage/addItems',
            stageIdentifier: 'in-review',
            items: [],
        };

        const result = AddItemsToFlowStageOperationSchema.safeParse(operation);
        expect(result.success).toBe(false);
    });
});
