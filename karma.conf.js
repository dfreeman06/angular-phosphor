var webpack = require('./webpack.config.js');

var entry = './tests.js';

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage'],
        files: [{ pattern: entry, watched: false }],
        preprocessors: {
            [entry]: ['webpack', 'sourcemap']
        },
        browsers: [
            'PhantomJS'
        ],
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {type: 'text-summary'},
                {type: 'html'}
            ]
        },
        webpack: webpack,
        webpackMiddleware: {
            stats: 'errors-only'
        }
    });
};