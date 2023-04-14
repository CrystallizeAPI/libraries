import { VariablesType } from '@crystallize/js-api-client';
import { Id } from '@crystallize/schema';

interface DeleteProps {
    id: Id;
}

const query = `
mutation DELETE_TENANT ($id: ID!) {
    tenant {
        delete(id: $id)
    }
}
`;

export const deleteTenantMutation = ({
    id,
}: DeleteProps): {
    query: string;
    variables: VariablesType;
} => {
    return {
        query,
        variables: {
            id,
        },
    };
};
