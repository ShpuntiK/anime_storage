module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            './assets/tests/unit/**/*.js',
        ],
        exclude: [],
        preprocessors: {
            './*.js': 'coverage'
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: './assets/tests/coverage'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO, // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        autoWatch: true,
        browsers: ['PhantomJS'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
