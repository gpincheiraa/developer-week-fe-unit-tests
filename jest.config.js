module.exports = {
    verbose: true,
    collectCoverageFrom: [ "src/**/*.js" ],
    coveragePathIgnorePatterns: [ "node_modules/", "src/index.js" ],
    testMatch: [ "**/*.spec.js" ],
    setupTestFrameworkScriptFile: "<rootDir>/test/jest.init.js"
};
