module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            styles: {
                files: ['assets/styles/**/*.less'],
                tasks: ['less']
            }
        },

        less: {
            options: {
                paths: ['./assets/styles'],
                compress: true,
                cleancss: true
            },
            files: {
                expand: true,
                cwd: './assets/styles',
                src: ['main.less'],
                dest: './static/css',
                ext: '.css'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
};