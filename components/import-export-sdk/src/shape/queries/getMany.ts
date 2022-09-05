import { VariablesType } from '@crystallize/js-api-client';

const query = `
    query GET_MANY_SHAPES ($tenantId: ID!) {
        shape {
            getMany(tenantId: $tenantId) {
                identifier
            }
        }
    }
`;

export const getManyShapesQuery = ({
    tenantId,
}: {
    tenantId: string;
}): { query: string; variables: VariablesType } => ({
    query,
    variables: { tenantId },
});
