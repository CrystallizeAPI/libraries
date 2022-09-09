export const basicComponentConfigFragment = `
    fragment basicComponentConfig on ComponentConfig {
        ... on ItemRelationsComponentConfig {
            min
            max
            acceptedShapeIdentifiers
        }
        ... on NumericComponentConfig {
            decimalPlaces
            units
        }
        ... on FilesComponentConfig {
            min
            max
            acceptedContentTypes {
                contentType
                extensionLabel
            }
            maxFileSize {
                size
                unit
            }
        }
        ... on PropertiesTableComponentConfig {
            sections {
                keys
                title
            }
        }
        ... on SelectionComponentConfig {
            min
            max
            options {
                isPreselected
                key
                value
            }
        }
    }
`;

export const structuralComponentConfigFragment = `
    fragment structuralComponentConfig on ComponentConfig {
        ... on ComponentChoiceComponentConfig {
            choices {
                id
                name
                description
                type
                config {
                    ...basicComponentConfig
                }
            }
        }
        ... on ContentChunkComponentConfig {
            repeatable
            components {
                id
                name
                description
                type
                config {
                    ...basicComponentConfig
                }
            }
        }
    }
`;
