import { VariablesType } from '@crystallize/js-api-client';
import { CreateTopicInputSchema, CreateTopicInput } from '../../schema/topic';

interface CreateProps {
    language: string;
    input: CreateTopicInput;
}

const query = `
mutation CREATE_TOPIC ($language: String!, $input: CreateTopicInput!) {
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
