module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: ['static/styles/**/*'],
            tasks: ['newer:less']
        },

        less: {
            options: {
                paths: ['static/styles/less']
            },
            files: {
                expand: true,
                cwd: 'static/styles/less',
                src: ['main.less'],
                dest: 'static/styles',
                ext: '.css'
            }
        },

        autoprefixer: {
            styles: {
                files: {
                    'static/styles/main.css': 'static/styles/main.css'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                'static/scripts/**/*.js',
                'tests/client/unit/**/*.js'
            ]
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            files: {
                expand: true,
                cwd: '.tmp/concat/static/scripts',
                src: ['app.js'],
                dest: '.tmp/concat/static/scripts'
            }
        },

        useminPrepare: {
            html: ['dist/templates/index.html'],
            options: {
                root: '.'
            }
        },

        usemin: {
            html: ['dist/templates/index.html'],
            options: {
                assetsDirs: ['dist']
            }
        },

        filerev: {
            files: {
                src: [
                    'dist/static/scripts/*.js',
                    'dist/static/styles/main.css'
                ]
            }
        },

        clean: {
            dist: ['dist'],
            tmp: ['.tmp']
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: [
                        'anime_storage/**/*.py',
                        'apps/**/*.py',
                        'templates/**/*',
                        'configs/**/*',
                        'manage.py',
                        'requirements.txt'
                    ],
                    dest: 'dist'
                }]
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

        compress: {
            options: {
                archive: 'deploy.zip'
            },
            files: {
                expand: true,
                cwd: '',
                src: ['dist']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-autoprefixer');


    grunt.registerTask('build', [
        'jshint',
        'clean',
        'less',
        'autoprefixer',
        'copy',
        'useminPrepare',
        'concat',
        'ngAnnotate',
        'uglify',
        'cssmin',
        'filerev',
        'usemin',
        //'ngtemplate',
        'clean:tmp'
    ]);
    grunt.registerTask('zip', ['build', 'compress']);
};