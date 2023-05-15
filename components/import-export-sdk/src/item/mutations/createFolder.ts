import { VariablesType } from '@crystallize/js-api-client';
import { CreateFolderInput, CreateFolderInputSchema } from '@crystallize/schema';

interface CreateProps {
    input: CreateFolderInput;
    language: string;
}

const query = `
mutation CREATE_FOLDER ($input: CreateFolderInput!, $language: String!) {
    folder {
        create(input: $input, language: $language) {
            id
            name
        }
    }
}
`;

export const createFolderMutation = ({
    input,
    language,
}: CreateProps): {
    query: string;
    variables: VariablesType;
    type: 'create' | 'update';
} => {
    const data = CreateFolderInputSchema.parse(input);

    return {
        query,
        variables: {
            language,
            input: data,
        },
        type: 'create',
    };
};
