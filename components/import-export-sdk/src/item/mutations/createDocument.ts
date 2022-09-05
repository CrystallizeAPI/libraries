import { VariablesType } from '@crystallize/js-api-client';
import { CreateDocumentInput, CreateDocumentInputSchema } from '@crystallize/schema/item';

interface CreateProps {
    input: CreateDocumentInput;
    language: string;
}

const query = `
mutation CREATE_DOCUMENT ($input: CreateDocumentInput!, $language: String!) {
    document {
        create(input: $input, language: $language) {
            id
            name
        }
    }
}
`;

export const createDocumentMutation = ({
    input,
    language,
}: CreateProps): {
    query: string;
    variables: VariablesType;
    type: 'create' | 'update';
} => {
    const data = CreateDocumentInputSchema.parse(input);

    return {
        query,
        variables: {
            language,
            input: data,
        },
        type: 'create',
    };
};
