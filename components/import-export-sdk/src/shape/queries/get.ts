import { ClientInterface } from '@crystallize/js-api-client';
import { ExistingShape } from '../../import';

const query = `
    query GET_SHAPE ($tenantId: ID!, $identifier: String!) {
        shape {
            get(identifier: $identifier) {
                identifier
            }
        }
    }
`;

export const get = ({
    client,
    tenantId,
    identifier,
}: {
    client: ClientInterface;
    tenantId: string;
    identifier: string;
}): Promise<ExistingShape | undefined> => client.pimApi(query, { tenantId, identifier }).then((res) => res?.shape?.get);
