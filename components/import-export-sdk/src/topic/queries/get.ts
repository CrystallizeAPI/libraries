import { VariablesType } from '@crystallize/js-api-client';

const query = `
query GET_TOPIC ($id: ID!, $language: String!) {
    topic {
        get(id: $id, language: $language) {
            id
            path
        }
    }
}
`;

export const getTopicQuery = ({
    id,
    language,
}: {
    id: string;
    language: string;
}): {
    query: string;
    variables: VariablesType;
} => ({
    query,
    variables: {
        id,
        language,
    },
});
