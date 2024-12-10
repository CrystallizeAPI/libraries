import {
    UpdateItemComponentOperationSchema,
    UpdateItemComponentOperation,
    UpdateSkuComponentOperation,
    UpdateSkuComponentOperationSchema,
} from '../../src/mass-operation/item';
import { describe, expect, it } from 'vitest';

describe('Mass Operations - Update Component Operation', {}, async () => {
    it('should NOT fail if the component is valid with only itemId ', () => {
        const updateComponentOperation: UpdateItemComponentOperation = {
            intent: 'item/updateComponent/item',
            itemId: '604f7655a16b91dea030895b',
            language: 'en',
            component: {
                componentId: '456',
                boolean: {
                    value: true,
                },
            },
        };
        expect(UpdateItemComponentOperationSchema.safeParse(updateComponentOperation)).toEqual({
            success: true,
            data: updateComponentOperation,
        });
    });

    it('should NOT fail if the component is valid with only sku ', () => {
        const updateComponentOperation: UpdateSkuComponentOperation = {
            intent: 'item/updateComponent/sku',
            language: 'en',
            sku: 'asdasd',
            component: {
                componentId: '456',
                boolean: {
                    value: true,
                },
            },
        };
        expect(UpdateSkuComponentOperationSchema.safeParse(updateComponentOperation)).toEqual({
            success: true,
            data: updateComponentOperation,
        });
    });
});
