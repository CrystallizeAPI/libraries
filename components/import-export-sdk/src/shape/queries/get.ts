import { VariablesType } from '@crystallize/js-api-client';
import { basicComponentConfigFragment, structuralComponentConfigFragment } from './fragments/shape.js';

interface GetProps {
    identifier: string;
}

interface GetConfig {
    includeComponents?: boolean;
}

const query = (config?: GetConfig) => `
    query GET_SHAPE ($tenantId: ID!, $identifier: String!) {
        shape(identifier: $identifier) {
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
    { identifier }: GetProps,
    config?: GetConfig,
): { query: string; variables: VariablesType } => ({
    query: query(config),
    variables: { identifier },
});
