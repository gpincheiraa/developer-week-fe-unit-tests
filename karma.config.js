process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
    config.set({
        basePath: process.cwd(),
        autoWatch: true,
        singleRun: true,
        browsers: [ 'ChromeHeadless' ],
        concurrency: Infinity,
        frameworks: [ 'jasmine', 'sinon' ],
        files: [
            'node_modules/jasmine-sinon/lib/jasmine-sinon.js',
            'src/**/*.js',
            'test/**/*.js',
        ],
        exclude: [
            'src/index.js',
        ],
        reporters: [ 'spec', 'coverage-istanbul' ],
        coverageIstanbulReporter: {
            reports: [ 'text-summary', 'html', 'cobertura', 'lcovonly' ],
            'report-config': {
                html: {
                    subdir: 'lcov-report'
                },
                cobertura: {
                    file: 'cobertura-coverage.xml'
                },
                lcovonly: {
                    file: 'lcov.info'
                }
            },
            fixWebpackSourcePaths: true
        },
        logLevel: config.LOG_INFO,
        preprocessors: {
            'src/**/*.js': [ 'webpack', 'sourcemap' ],
            'test/**/*.js': [ 'webpack' ]
        },
        webpack: {
            mode: 'development',
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(test|node_modules)\//,
                        loader: 'istanbul-instrumenter-loader',
                        query: {
                            esModules: true
                        }
                    }
                ]
            }
        },
        webpackMiddleware: {
            stats: { chunks: false, modules: false }
        }
    });
};
