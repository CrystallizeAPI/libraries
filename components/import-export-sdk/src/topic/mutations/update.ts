import { VariablesType } from '@crystallize/js-api-client';
import { UpdateTopicInputSchema } from '../schema';
import { UpdateTopicInput } from '../types';

interface UpdateProps {
    id: string;
    language: string;
    input: UpdateTopicInput;
}

const query = `
mutation UPDATE_TOPIC($id: ID!, $language: String!, $input: UpdateTopicInput!) {
    topic {
        update(id: $id, language: $language, input: $input) {
            id
        }
    }
}
`;

export const updateTopicMutation = ({
    id,
    language,
    input,
}: UpdateProps): {
    query: string;
    variables: VariablesType;
} => {
    const data = UpdateTopicInputSchema.parse(input);

    return {
        query,
        variables: {
            id,
            language,
            input: data,
        },
    };
};
