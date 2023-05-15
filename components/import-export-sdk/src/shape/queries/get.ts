import { VariablesType } from '@crystallize/js-api-client';
import { basicComponentConfigFragment, structuralComponentConfigFragment } from './fragments/shape';

interface GetProps {
    tenantId: string;
    identifier: string;
}

interface GetConfig {
    includeComponents?: boolean;
}

const query = (config?: GetConfig) => `
    query GET_SHAPE ($tenantId: ID!, $identifier: String!) {
        shape {
            get(tenantId: $tenantId, identifier: $identifier) {
                identifier
                name
                type
                ${
                    config?.includeComponents
                        ? `
                            components {
                                id
                                name
                                description
                                type
                                config {
                                    ...basicComponentConfig
                                    ...structuralComponentConfig
                                }
                            }
                            variantComponents {
                                id
                                name
                                description
                                type
                                config {
                                    ...basicComponentConfig
                                    ...structuralComponentConfig
                                }
                            }
                        `
                        : ''
                }
            }
        }
    }

    ${
        config?.includeComponents
            ? `
            ${basicComponentConfigFragment}
            ${structuralComponentConfigFragment}
            `
            : ''
    }
`;

export const getShapeQuery = (
    { tenantId, identifier }: GetProps,
    config?: GetConfig,
): { query: string; variables: VariablesType } => ({
    query: query(config),
    variables: { tenantId, identifier },
});
