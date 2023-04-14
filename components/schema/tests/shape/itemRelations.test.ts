import { ZodError } from 'zod';
import { ItemRelationsComponentConfig, ItemRelationsComponentConfigSchema } from '../../src/shape/index.js';

interface testCase {
    name: string;
    min?: number | null;
    max?: number | null;
    error?: ZodError;
    expected?: ItemRelationsComponentConfig;
}

const testCases: testCase[] = [
    {
        name: 'parses a valid max value',
        max: 1,
        expected: {
            max: 1,
        },
    },
    {
        name: 'parses a valid min and max value',
        min: 1,
        max: 2,
        expected: {
            min: 1,
            max: 2,
        },
    },
    {
        name: 'errors when max is greater than 50 (current hard limit)',
        max: 51,
        error: new ZodError([
            {
                code: 'custom',
                message: 'Max may not be greater than 50',
                path: ['max'],
            },
        ]),
    },
];

test('itemRelations.test', () => {
    testCases.forEach((tc) => {
        const shouldBeSuccess = tc.expected !== undefined;
        const result: any = ItemRelationsComponentConfigSchema.safeParse({ min: tc.min, max: tc.max });
        expect(result.success).toBe(shouldBeSuccess);

        if (shouldBeSuccess) {
            expect(result?.data).toStrictEqual(tc.expected);
        } else {
            expect(result?.error).toStrictEqual(tc.error);
        }
    });
});
