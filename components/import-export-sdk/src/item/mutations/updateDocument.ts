import { VariablesType } from '@crystallize/js-api-client';
import { UpdateDocumentInput, UpdateDocumentInputSchema } from '@crystallize/schema';
import { Id } from '@crystallize/schema';

interface UpdateProps {
    id: Id;
    input: UpdateDocumentInput;
    language: string;
}

const query = `
mutation UPDATE_DOCUMENT ($id: ID!, $input: UpdateDocumentInput!, $language: String!) {
    document {
        update(id: $id, input: $input, language: $language) {
            id
            name
        }
    }
}
`;

export const updateDocumentMutation = ({
    id,
    input,
    language,
}: UpdateProps): {
    query: string;
    variables: VariablesType;
    type: 'create' | 'update';
} => {
    const data = UpdateDocumentInputSchema.parse(input);

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
