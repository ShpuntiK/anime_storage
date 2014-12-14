module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: ['./static/scripts/**/*', './static/styles/**/*'],
            tasks: ['newer:less', 'newer:ngAnnotate']
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                './static/scripts/**/*.js',
                './tests/client/unit/**/*.js'
            ]
        },

        less: {
            options: {
                paths: ['./static/styles'],
                sourceMap: true,
                sourceMapFilename: './static/_/css/main.css.map',
                sourceMapURL: '/static/_/css/main.css.map'
            },
            files: {
                expand: true,
                cwd: './static/styles',
                src: ['main.less'],
                dest: './static/_/css',
                ext: '.css'
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            files: {
                expand: true,
                cwd: './static/scripts',
                src: ['**/*.js'],
                dest: './static/_/js'
            }
        },

        compress: {
            options: {
                archive: 'deploy.zip'
            },
            files: {
                expand: true,
                cwd: './',
                src: ['./anime_storage/**/*.py',
                    './apps/**/*.py',
                    './static/**/*',
                    './templates/**/*',
                    './configs/**/*',
                    'manage.py',
                    'requirements.txt'
                ]
            }
        },

        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js',
                    singleRun: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('build', ['less', 'jshint', 'ngAnnotate']);
    grunt.registerTask('zip', ['build', 'compress']);
};