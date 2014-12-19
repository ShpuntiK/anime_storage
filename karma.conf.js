module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            './static/bower_components/angular/angular.js',
            './static/bower_components/angular-mocks/angular-mocks.js',
            './static/bower_components/angular-route/angular-route.js',
            './static/bower_components/angular-resource/angular-resource.js',
            './static/bower_components/angular-animate/angular-animate.js',
            './static/bower_components/angular-messages/angular-messages.js',
            './static/bower_components/angular-bootstrap/ui-bootstrap.js',
            './static/bower_components/angular-loading-bar/build/loading-bar.js',
            './static/bower_components/ng-tags-input/ng-tags-input.js',
            './static/scripts/**/*.js',
            './tests/client/unit/**/*.js'
        ],
        exclude: [],
        preprocessors: {
            './static/scripts/**/*.js': 'coverage'
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: './tests/client/coverage'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO, // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        autoWatch: true,
        browsers: ['PhantomJS'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
