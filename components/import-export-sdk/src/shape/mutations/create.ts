import { VariablesType } from '@crystallize/js-api-client';
import { NextPimCreateShapeInput, NextPimCreateShapeInputSchema } from '@crystallize/schema';

interface CreateProps {
    input: NextPimCreateShapeInput;
}

const query = `
mutation CREATE_SHAPE ($input: CreateShapeInput!) {
    createShape(input: $input) {
        ... on Shape {
            identifier
            name
            type
        }
    }
}
`;

export const createShapeMutation = ({
    input,
}: CreateProps): {
    query: string;
    variables: VariablesType;
    type: 'create' | 'update';
} => {
    const data = NextPimCreateShapeInputSchema.parse(input);

    return {
        query,
        variables: {
            input: data,
        },
        type: 'create',
    };
};
