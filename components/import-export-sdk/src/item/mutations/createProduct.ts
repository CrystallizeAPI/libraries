import { VariablesType } from '@crystallize/js-api-client';
import { CreateProductInput, CreateProductInputSchema } from '@crystallize/schema';

interface CreateProps {
    input: CreateProductInput;
    language: string;
}

const query = `
mutation CREATE_PRODUCT ($input: CreateProductInput!, $language: String!) {
    product {
        create(input: $input, language: $language) {
            id
            name
        }
    }
}
`;

export const createProductMutation = ({
    input,
    language,
}: CreateProps): {
    query: string;
    variables: VariablesType;
    type: 'create' | 'update';
} => {
    const data = CreateProductInputSchema.parse(input);

    return {
        query,
        variables: {
            language,
            input: data,
        },
        type: 'create',
    };
};
