import { VariablesType } from '@crystallize/js-api-client';
import { CreateShapeInputSchema, CreateShapeInput } from '../../schema/shape';

interface CreateProps {
    input: CreateShapeInput;
}

const query = `
mutation CREATE_SHAPE ($input: CreateShapeInput!) {
    shape {
        create(input: $input) {
            identifier
            name
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
    const data = CreateShapeInputSchema.parse(input);

    return {
        query,
        variables: {
            input: data,
        },
        type: 'create',
    };
};
