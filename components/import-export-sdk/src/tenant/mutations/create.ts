import { VariablesType } from '@crystallize/js-api-client';
import { CreateTenantInputSchema, CreateTenantInput } from '@crystallize/schema/tenant';

interface CreateProps {
    input: CreateTenantInput;
}

const query = `
mutation CREATE_TENANT ($input: CreateTenantInput!) {
    tenant {
        create(input: $input) {
            id
            identifier
            name
        }
    }
}
`;

export const createTenantMutation = ({
    input,
}: CreateProps): {
    query: string;
    variables: VariablesType;
    type: 'create' | 'update';
} => {
    const data = CreateTenantInputSchema.parse(input);

    return {
        query,
        variables: {
            input: data,
        },
        type: 'create',
    };
};
