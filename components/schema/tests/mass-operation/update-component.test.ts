import { never, ZodError } from 'zod';
import { UpdateCompomentOperation, UpdateCompomentOperationSchema } from '../../src/mass-operation/item';
import { describe, expect, it, test } from 'vitest';

describe('Mass Operations - Update Component Operation', {}, async () => {
    it('should NOT fail if the component is valid with only itemId ', () => {
        const updateComponentOperation: UpdateCompomentOperation = {
            action: 'updateComponent',
            concern: 'item',
            itemId: '604f7655a16b91dea030895b',
            language: 'en',
            component: {
                componentId: '456',
                boolean: {
                    value: true,
                },
            },
        };
        expect(UpdateCompomentOperationSchema.safeParse(updateComponentOperation)).toEqual({
            success: true,
            data: updateComponentOperation,
        });
    });

    it('should NOT fail if the component is valid with only sku ', () => {
        const updateComponentOperation: UpdateCompomentOperation = {
            action: 'updateComponent',
            concern: 'item',
            language: 'en',
            sku: 'asdasd',
            component: {
                componentId: '456',
                boolean: {
                    value: true,
                },
            },
        };
        expect(UpdateCompomentOperationSchema.safeParse(updateComponentOperation)).toEqual({
            success: true,
            data: updateComponentOperation,
        });
    });

    it('should fail if the component contains sku and itemId ', () => {
        // @ts-expect-error
        const updateComponentOperation: UpdateCompomentOperation = {
            action: 'updateComponent',
            concern: 'item',
            language: 'en',
            sku: 'asdasd',
            itemId: '604f7655a16b91dea030895b',
            component: {
                componentId: '456',
                boolean: {
                    value: true,
                },
            },
        };
        expect(UpdateCompomentOperationSchema.safeParse(updateComponentOperation)).toMatchObject({
            success: false,
        });
    });

    it('should fail if the component is invalid ', () => {
        // @ts-expect-error
        const updateComponentOperation: UpdateCompomentOperation = {
            action: 'updateComponent',
            concern: 'item',
            language: 'en',
            sku: 'asdasd',
            itemId: '604f655a16b91dea030895b', // mistake here
            component: {
                componentId: '456',
                boolean: {
                    value: true,
                },
            },
        };
        expect(UpdateCompomentOperationSchema.safeParse(updateComponentOperation)).toMatchObject({
            success: false,
        });
    });
});
