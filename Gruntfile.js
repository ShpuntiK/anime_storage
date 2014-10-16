module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: ['./assets/**/*.js', './assets/**/*.less'],
            tasks: ['less', 'copy', 'ngAnnotate']
        },

        jshint: {
            files: ['./assets/app/**/*.js']
        },

        less: {
            options: {
                paths: ['./assets/styles']
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
                src: '*',
                dest: './static/js/app/views'
            }
        },

        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js'
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
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.registerTask('build', ['less', 'jshint', 'karma', 'ngAnnotate', 'copy']);
};