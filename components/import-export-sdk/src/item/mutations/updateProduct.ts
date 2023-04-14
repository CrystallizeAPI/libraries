import { VariablesType } from '@crystallize/js-api-client';
import { UpdateProductInput, UpdateProductInputSchema } from '@crystallize/schema';
import { Id } from '@crystallize/schema';

interface UpdateProps {
    id: Id;
    input: UpdateProductInput;
    language: string;
}

const query = `
mutation UPDATE_PRODUCT ($id: ID!, $input: UpdateProductInput!, $language: String!) {
    product {
        update(id: $id, input: $input, language: $language) {
            id
            name
        }
    }
}
`;

export const updateProductMutation = ({
    id,
    input,
    language,
}: UpdateProps): {
    query: string;
    variables: VariablesType;
    type: 'create' | 'update';
} => {
    const data = UpdateProductInputSchema.parse(input);

    return {
        query,
        variables: {
            id,
            language,
            input: data,
        },
        type: 'update',
    };
};
