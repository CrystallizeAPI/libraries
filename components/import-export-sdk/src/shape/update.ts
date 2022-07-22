import { z } from 'zod';
import { VariablesType } from '@crystallize/js-api-client';
import { UpdateInputSchema } from './types';

interface UpdateProps {
    tenantId: string;
    identifier: string;
    input: z.infer<typeof UpdateInputSchema>;
}

export const mutation = ({
    tenantId,
    identifier,
    input,
}: UpdateProps): {
    query: string;
    variables: VariablesType;
} => {
    return {
        query: `
            mutation UPDATE_SHAPE($tenantId: ID!, $identifier: String!, $input: CreateShapeInput!) {
                shape(tenantId: $tenantId, identifier: $identifier, input: $input) {
                    identifier
                    name
                }
            }
        `,
        variables: {
            tenantId,
            identifier,
            input,
        },
    };
};
