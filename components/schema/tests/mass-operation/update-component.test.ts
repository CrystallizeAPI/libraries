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

    it('should NOT fail with a valid colors component', () => {
        const updateComponentOperation: UpdateItemComponentOperation = {
            intent: 'item/updateComponent/item',
            itemId: '604f7655a16b91dea030895b',
            language: 'en',
            component: {
                componentId: 'brand-colors',
                colors: {
                    colors: [
                        {
                            label: 'Primary',
                            hex: '#ff5733',
                            rgb: { r: 255, g: 87, b: 51, a: 1 },
                            hsl: { h: 11, s: 100, l: 60 },
                            cmyk: { c: 0, m: 66, y: 80, k: 0 },
                            pantone: '171 C',
                            ral: 'RAL 2002',
                        },
                        {
                            hex: '#000000',
                        },
                    ],
                },
            },
        };
        expect(UpdateItemComponentOperationSchema.safeParse(updateComponentOperation)).toEqual({
            success: true,
            data: updateComponentOperation,
        });
    });

    it('should fail if a colors component has an invalid entry', () => {
        const updateComponentOperation = {
            intent: 'item/updateComponent/item',
            itemId: '604f7655a16b91dea030895b',
            language: 'en',
            component: {
                componentId: 'brand-colors',
                colors: {
                    colors: [
                        {
                            rgb: { r: 'not-a-number', g: 87, b: 51 },
                        },
                    ],
                },
            },
        };
        expect(UpdateItemComponentOperationSchema.safeParse(updateComponentOperation).success).toBe(false);
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
