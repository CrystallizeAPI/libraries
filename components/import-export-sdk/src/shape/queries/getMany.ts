import { VariablesType } from '@crystallize/js-api-client';
import { basicComponentConfigFragment, structuralComponentConfigFragment } from './fragments/shape.js';

interface GetManyProps {}

interface GetManyConfig {
    includeComponents?: boolean;
    after?: string;
}

const query = (config?: GetManyConfig) => `
    query GET_MANY_SHAPES {
        shapes(first: 100, after: "${config?.after}") {
            edges {
                node {
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
    _: GetManyProps,
    config?: GetManyConfig,
): { query: string; variables: VariablesType } => {
    return {
        query: query(config),
        variables: {},
    };
};
