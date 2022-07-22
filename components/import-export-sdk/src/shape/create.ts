import { z } from 'zod';
import { VariablesType } from '@crystallize/js-api-client';
import { ShapeCreateInputSchema } from './types';

interface CreateProps {
    input: z.infer<typeof ShapeCreateInputSchema>;
}

const query = `
mutation CREATE_SHAPE($input: CreateShapeInput!) {
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
} => {
    const data = ShapeCreateInputSchema.parse(input);

    return {
        query,
        variables: {
            input: data,
        },
    };
};
