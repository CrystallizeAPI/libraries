import { VariablesType } from '@crystallize/js-api-client';

const query = `
    query GET_SHAPE ($tenantId: ID!, $identifier: String!) {
        shape {
            get(identifier: $identifier) {
                identifier
            }
        }
    }
`;

export const getShapeQuery = ({
    tenantId,
    identifier,
}: {
    tenantId: string;
    identifier: string;
}): { query: string; variables: VariablesType } => ({
    query,
    variables: { tenantId, identifier },
});
