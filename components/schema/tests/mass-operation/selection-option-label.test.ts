import { OperationsSchema } from '../../src/mass-operation/index';
import { SelectionConfigInputSchema } from '../../src/pim/index';
import { describe, expect, it } from 'vitest';

describe('Mass Operations - Selection option label', () => {
    const buildOperations = (options: Array<{ key: string; value: string; label?: string | null }>) => ({
        version: '0.0.1',
        operations: [
            {
                intent: 'shape/create',
                type: 'product',
                name: 'Shoe',
                identifier: 'shoe',
                components: [
                    {
                        id: 'material',
                        type: 'selection',
                        name: 'Material',
                        config: {
                            selection: {
                                options,
                            },
                        },
                    },
                ],
            },
        ],
    });

    it('keeps the label on options that have one and leaves the others without', () => {
        const result = OperationsSchema.safeParse(
            buildOperations([
                { key: 'lthr', value: 'L', label: 'Leather' },
                { key: 'wvn', value: 'W' },
            ]),
        );
        expect(result.success).toBe(true);
        if (!result.success) {
            return;
        }
        const options = result.data.operations[0]?.components?.[0]?.config?.selection?.options ?? [];
        expect(options[0]?.label).toBe('Leather');
        expect(options[1]?.label).toBeUndefined();
    });

    it('accepts a null label', () => {
        const result = OperationsSchema.safeParse(buildOperations([{ key: 'lthr', value: 'L', label: null }]));
        expect(result.success).toBe(true);
    });

    it('SelectionConfigInputSchema keeps the label', () => {
        const parsed = SelectionConfigInputSchema.parse({
            options: [{ key: 'lthr', value: 'L', label: 'Leather' }],
        });
        expect(parsed.options[0]?.label).toBe('Leather');
    });
});
