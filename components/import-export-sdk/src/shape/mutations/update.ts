import { VariablesType } from '@crystallize/js-api-client';
import { UpdateShapeInputSchema, UpdateShapeInput } from '@crystallize/schema';

interface UpdateProps {
    identifier: string;
    input: UpdateShapeInput;
}

const query = `
mutation UPDATE_SHAPE ($identifier: String!, $input: UpdateShapeInput!) {
    updateShape(identifier: $identifier, input: $input) {
        ... on Shape {
            identifier
            name
            type
        }
    }
}
`;

export const updateShapeMutation = ({
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
            identifier,
            input: data,
        },
        type: 'update',
    };
};
