import { z } from 'zod';
import { VariablesType } from '@crystallize/js-api-client';
import { BulkCreateTopicInputSchema, BulkCreateTopicInput } from '../../schema/topic';

interface BulkCreateProps {
    tenantId: string;
    language: string;
    input: BulkCreateTopicInput[];
}

const query = `
mutation BULK_CREATE_TOPICS ($tenantId: ID!, $language: String!, $input: [BulkCreateTopicInput!]!) {
    topic {
        bulkCreate(tenantId: $tenantId, language: $language, input: $input) {
            id
        }
    }
}
`;

export const bulkCreateTopicsMutation = ({
    tenantId,
    language,
    input,
}: BulkCreateProps): {
    query: string;
    variables: VariablesType;
} => {
    const data = z.array(BulkCreateTopicInputSchema).parse(input);

    return {
        query,
        variables: {
            tenantId,
            language,
            input: data,
        },
    };
};
