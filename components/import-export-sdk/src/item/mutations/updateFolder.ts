import { VariablesType } from '@crystallize/js-api-client';
import { UpdateFolderInput, UpdateFolderInputSchema } from '@crystallize/schema/item';
import { Id } from '@crystallize/schema/shared';

interface UpdateProps {
    id: Id;
    input: UpdateFolderInput;
    language: string;
}

const query = `
mutation UPDATE_FOLDER ($id: ID!, $input: UpdateFolderInput!, $language: String!) {
    folder {
        update(id: $id, input: $input, language: $language) {
            id
            name
        }
    }
}
`;

export const updateFolderMutation = ({
    id,
    input,
    language,
}: UpdateProps): {
    query: string;
    variables: VariablesType;
    type: 'create' | 'update';
} => {
    const data = UpdateFolderInputSchema.parse(input);

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
