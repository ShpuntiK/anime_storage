module.exports.config = {
    specs: [
        './assets/tests/e2e/**/*.js'
    ],

    capabilities: {
        browserName: 'chrome'
    },

    baseUrl: 'http://127.0.0.1:8000'
};