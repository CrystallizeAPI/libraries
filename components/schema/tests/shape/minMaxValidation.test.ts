import { ZodError } from 'zod';
import { MinMaxComponentConfig, MinMaxComponentConfigSchema } from '../../src/shape/index.js';

interface testCase {
    name: string;
    min?: number | null;
    max?: number | null;
    error?: ZodError;
    expected?: MinMaxComponentConfig;
}

const testCases: testCase[] = [
    {
        name: 'parses empty config',
        expected: {},
    },
    {
        name: 'parses a valid min value',
        min: 1,
        expected: {
            min: 1,
        },
    },
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
        name: 'parses when min and max are equal',
        min: 1,
        max: 1,
        expected: {
            min: 1,
            max: 1,
        },
    },
    {
        name: 'does not error when min is undefined',
        min: undefined,
        max: 1,
        expected: {
            max: 1,
        },
    },
    {
        name: 'does not error when max is undefined',
        min: 1,
        max: undefined,
        expected: {
            min: 1,
        },
    },
    {
        name: 'does not error when min is null',
        min: null,
        max: 1,
        expected: {
            max: 1,
        },
    },
    {
        name: 'does not error when max is null',
        min: 1,
        max: null,
        expected: {
            min: 1,
        },
    },
    {
        name: 'does not error when both min and max are null',
        min: null,
        max: null,
        expected: {},
    },
    {
        name: 'does not error when both min and max are 0',
        min: 0,
        max: 0,
        expected: {
            min: 0,
            max: 0,
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
                exact: false,
                message: 'Number must be greater than or equal to 0',
                path: ['min'],
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

test('minMaxValidation.test', () => {
    testCases.forEach((tc) => {
        const shouldBeSuccess = tc.expected !== undefined;
        const result: any = MinMaxComponentConfigSchema.safeParse({ min: tc.min, max: tc.max });

        if (result.success !== shouldBeSuccess) {
            console.log(tc, result);
        }
        expect(result.success).toBe(shouldBeSuccess);

        if (shouldBeSuccess) {
            expect(result?.data).toStrictEqual(tc.expected);
        } else {
            expect(result?.error).toStrictEqual(tc.error);
        }
    });
});
