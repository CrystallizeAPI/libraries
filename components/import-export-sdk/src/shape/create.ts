import { z } from 'zod';
import { VariablesType } from '@crystallize/js-api-client';
import { CreateInputSchema } from './types';

interface CreateProps {
    input: z.infer<typeof CreateInputSchema>;
}

export const mutation = ({
    input,
}: CreateProps): {
    query: string;
    variables: VariablesType;
} => {
    return {
        query: `
            mutation CREATE_SHAPE($input: CreateShapeInput!) {
                shape(input: $input) {
                    identifier
                    name
                }
            }
        `,
        variables: {
            input,
        },
    };
};
