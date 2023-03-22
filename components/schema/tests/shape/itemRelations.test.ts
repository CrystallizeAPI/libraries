import test from 'ava';
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

testCases.forEach((tc) =>
    test(tc.name, (t) => {
        try {
            const actual = ItemRelationsComponentConfigSchema.parse({ min: tc.min, max: tc.max });
            if (tc.error) {
                t.fail('validation should error');
            }
            t.deepEqual(actual, tc.expected);
        } catch (err: any) {
            if (!tc.error) {
                t.fail('validation should not error');
            }
            t.deepEqual(err.issues, tc.error?.issues);
        }
    }),
);
