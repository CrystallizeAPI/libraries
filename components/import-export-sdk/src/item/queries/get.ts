import { VariablesType } from '@crystallize/js-api-client';

const query = `
    query GET_ITEM ($id: ID!, $language: String!, $versionLabel: VersionLabel!) {
        item {
            get(id: $id, language: $language, versionLabel: $versionLabel) {
                id
            }
        }
    }
`;

export const getItemQuery = ({
    id,
    language,
    versionLabel,
}: {
    id: string;
    language: string;
    versionLabel: 'current' | 'draft' | 'published';
}): { query: string; variables: VariablesType } => ({
    query,
    variables: { id, language, versionLabel },
});
