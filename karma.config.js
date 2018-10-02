
const webpack = require('webpack');
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
            dir: 'karma-coverage',
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
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        TEST_RUNNER: JSON.stringify('karma')
                    }
                })
            ],
        },
        webpackMiddleware: {
            stats: { chunks: false, modules: false }
        }
    });
};
