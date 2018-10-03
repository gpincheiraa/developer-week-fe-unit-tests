module.exports = {
    verbose: true,
    collectCoverageFrom: [ 'src/**/*.js' ],
    coveragePathIgnorePatterns: [ 'node_modules/', 'src/index.js' ],
    testMatch: [ '<rootDir>/test/jest/**/*.spec.js' ],
    setupTestFrameworkScriptFile: '<rootDir>/test/jest.init.js',
    coverageDirectory: 'jest-coverage'
};
