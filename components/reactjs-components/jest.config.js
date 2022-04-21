module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/src'],

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },

    // Test spec file resolution pattern
    // Filename should contain `test` or `spec`.
    testRegex: '.*.(test|spec)\\.tsx?$',

    setupFilesAfterEnv: ['<rootDir>src/setupTests.js'],

    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
