import { OperationsSchema } from '../../src/mass-operation/index';
import { describe, expect, it } from 'vitest';

describe('Mass Operations - Multiple choice', {}, async () => {
    it('should pass', () => {
        const structure = {
            operations: {
                version: '0.0.1',
                operations: [
                    {
                        intent: 'shape/upsert',
                        type: 'document',
                        name: 'Landing page',
                        identifier: 'landing-page',
                        components: [
                            {
                                id: 'blocks',
                                type: 'componentMultipleChoice',
                                name: 'Blocks',
                                config: {
                                    componentMultipleChoice: {
                                        choices: [
                                            {
                                                id: 'banner',
                                                type: 'singleLine',
                                                name: 'Banner',
                                                description: 'A banner component',
                                            },
                                            {
                                                id: 'banner2',
                                                type: 'singleLine',
                                                name: 'Banner2',
                                                description: 'A banner component',
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        };
        const op = OperationsSchema.safeParse(structure.operations);
        expect(op.success).toBe(true);
    });
});
