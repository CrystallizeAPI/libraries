import { z } from 'zod';
import { VariablesType } from '@crystallize/js-api-client';
import { ShapeUpdateInputSchema } from '../schema';
import { ShapeUpdateInput } from '../types';

interface UpdateProps {
    tenantId: string;
    identifier: string;
    input: ShapeUpdateInput;
}

const query = `
mutation UPDATE_SHAPE($tenantId: ID!, $identifier: String!, $input: UpdateShapeInput!) {
    shape {
        update (tenantId: $tenantId, identifier: $identifier, input: $input) {
            identifier
            name
        }
    }
}
`;

export const updateShapeMutation = ({
    tenantId,
    identifier,
    input,
}: UpdateProps): {
    query: string;
    variables: VariablesType;
} => {
    const data = ShapeUpdateInputSchema.parse(input);

    return {
        query,
        variables: {
            tenantId,
            identifier,
            input: data,
        },
    };
};
