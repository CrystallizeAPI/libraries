import { VariablesType } from '@crystallize/js-api-client';
import { UpdateShapeInputSchema, UpdateShapeInput } from '@crystallize/schema/shape';
import { Id } from '@crystallize/schema/shared';

interface UpdateProps {
    tenantId: Id;
    identifier: string;
    input: UpdateShapeInput;
}

const query = `
mutation UPDATE_SHAPE ($tenantId: ID!, $identifier: String!, $input: UpdateShapeInput!) {
    shape {
        update (tenantId: $tenantId, identifier: $identifier, input: $input) {
            identifier
            name
            type
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
    type: 'create' | 'update';
} => {
    const data = UpdateShapeInputSchema.parse(input);

    return {
        query,
        variables: {
            tenantId,
            identifier,
            input: data,
        },
        type: 'update',
    };
};
