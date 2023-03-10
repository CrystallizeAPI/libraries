import test from 'ava';
import { ZodError } from 'zod';
import { MinMaxComponentConfig, MinMaxComponentConfigSchema } from '../../src/shape';

interface testCase {
    name: string;
    min?: number | null;
    max?: number | null;
    error?: ZodError;
    expected?: MinMaxComponentConfig;
}

const testCases: testCase[] = [
    {
        name: 'parses a valid min value',
        min: 1,
        expected: {
            min: 1,
            max: undefined,
        },
    },
    {
        name: 'parses a valid max value',
        max: 1,
        expected: {
            min: undefined,
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
        name: 'parses when min and max are equal',
        min: 1,
        max: 1,
        expected: {
            min: 1,
            max: 1,
        },
    },
    {
        name: 'does not error when min is null',
        min: null,
        max: 1,
        expected: {
            min: null,
            max: 1,
        },
    },
    {
        name: 'does not error when max is null',
        min: 1,
        max: null,
        expected: {
            min: 1,
            max: 1,
        },
    },
    {
        name: 'errors when min is negative',
        min: -1,
        error: new ZodError([
            {
                code: 'too_small',
                minimum: 0,
                type: 'number',
                inclusive: true,
                message: 'Number must be greater than or equal to 0',
                path: ['min'],
            },
        ]),
    },
    {
        name: 'errors when max is less than 1',
        max: 0,
        error: new ZodError([
            {
                code: 'too_small',
                minimum: 1,
                type: 'number',
                inclusive: true,
                message: 'Number must be greater than or equal to 1',
                path: ['max'],
            },
        ]),
    },
    {
        name: 'errors when min is greater than max',
        min: 2,
        max: 1,
        error: new ZodError([
            {
                code: 'custom',
                message: 'Min cannot be greater than max',
                path: ['min'],
            },
        ]),
    },
];

testCases.forEach((tc) =>
    test(tc.name, (t) => {
        try {
            const actual = MinMaxComponentConfigSchema.parse({ min: tc.min, max: tc.max });
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
