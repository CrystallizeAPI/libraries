import { deepEqual } from 'assert';
import { ZodError } from 'zod';
import { MinMaxComponentConfigSchema } from '../../../src/schema/shape';

interface testCase {
    name: string;
    min?: number;
    max?: number;
    error?: ZodError;
}

const testCases: testCase[] = [
    {
        name: 'parses a valid min value',
        min: 1,
    },
    {
        name: 'parses a valid max value',
        max: 1,
    },
    {
        name: 'parses a valid min and max value',
        min: 1,
        max: 2,
    },
    {
        name: 'parses when min and max are equal',
        min: 1,
        max: 1,
    },
    {
        name: 'errors when min is negative',
        min: -1,
        error: new ZodError([
            {
                code: 'too_small',
                minimum: 0,
                type: 'number',
                inclusive: false,
                message: 'Number must be greater than 0',
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
    it(tc.name, () => {
        try {
            MinMaxComponentConfigSchema.parse({ min: tc.min, max: tc.max });
            if (tc.error) {
                fail();
            }
        } catch (err: any) {
            if (!tc.error) {
                fail();
            }
            deepEqual(err.issues, tc.error?.issues);
        }
    }),
);
