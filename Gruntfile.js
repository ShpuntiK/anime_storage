module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            styles: {
                files: ['./assets/**/*.js', './assets/**/*.less'],
                tasks: ['less', 'copy', 'ngAnnotate']
            }
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
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ng-annotate');
};