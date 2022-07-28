import { VariablesType } from '@crystallize/js-api-client';
import { CreateTopicInputSchema } from '../schema';
import { CreateTopicInput } from '../types';

interface CreateProps {
    language: string;
    input: CreateTopicInput;
}

const query = `
mutation CREATE_TOPIC($id: ID!, $language: String!, $input: CreateTopicInput!) {
    topic {
        create(language: $language, input: $input) {
            id
        }
    }
}
`;

export const createTopicMutation = ({
    language,
    input,
}: CreateProps): {
    query: string;
    variables: VariablesType;
} => {
    const data = CreateTopicInputSchema.parse(input);

    return {
        query,
        variables: {
            language,
            input: data,
        },
    };
};
