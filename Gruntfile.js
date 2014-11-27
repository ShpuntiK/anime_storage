module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: ['./assets/app/**/*', './assets/styles/**/*'],
            tasks: ['less', 'copy', 'ngAnnotate']
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                './assets/app/**/*.js',
                './assets/tests/unit/**/*.js'
            ]
        },

        less: {
            options: {
                paths: ['./assets/styles'],
                sourceMap: true,
                sourceMapFilename: './static/css/main.css.map',
                sourceMapURL: '/static/css/main.css.map'
            },
            files: {
                expand: true,
                cwd: './assets/styles',
                src: ['main.less'],
                dest: './static/css',
                ext: '.css'
            }
        },

        copy: {
            files: {
                expand: true,
                cwd: './assets/app/views',
                src: '**/*',
                dest: './static/js/app/views'
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
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            files: {
                expand: true,
                cwd: './assets/app',
                src: ['**/*.js'],
                dest: './static/js/app'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.registerTask('build', ['less', 'ngAnnotate', 'copy']);
    grunt.registerTask('zip', ['build', 'compress']);
};