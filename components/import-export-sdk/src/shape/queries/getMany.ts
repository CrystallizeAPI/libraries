import { VariablesType } from '@crystallize/js-api-client';
import { basicComponentConfigFragment, structuralComponentConfigFragment } from './fragments/shape.js';

interface GetManyProps {
    tenantId: string;
}

interface GetManyConfig {
    includeComponents?: boolean;
}

const query = (config?: GetManyConfig) => `
    query GET_MANY_SHAPES ($tenantId: ID!) {
        shape {
            getMany(tenantId: $tenantId) {
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

export const getManyShapesQuery = (
    { tenantId }: GetManyProps,
    config?: GetManyConfig,
): { query: string; variables: VariablesType } => {
    return {
        query: query(config),
        variables: { tenantId },
    };
};
