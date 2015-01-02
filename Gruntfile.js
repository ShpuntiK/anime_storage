module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: ['static/styles/**/*.less'],
            tasks: ['less']
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

        ngtemplates: {
            files: {
                src: 'static/scripts/views/**/*.html',
                dest: '.tmp/concat/static/scripts/templates.js',
                options: {
                    usemin: '/static/scripts/app.js',
                    module: 'main',
                    htmlmin: {
                        collapseWhitespace: true
                    },
                    url: function (url) {
                        return '/' + url;
                    }
                }
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
                    '!dist/static/scripts/templates.js',
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
                        '!anime_storage/**/development.py',
                        'apps/**/*.py',
                        'templates/**/*',
                        'static/bower_components/bootstrap/fonts/**/*'
//                        'configs/**/*',
//                        'manage.py',
//                        'requirements.txt'
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
                archive: 'dist.zip'
            },
            files: {
                expand: true,
                cwd: 'dist',
                src: ['**/*']
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
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-angular-templates');


    grunt.registerTask('build', [
        'jshint',
        'clean',
        'less',
        'autoprefixer',
        'copy',
        'useminPrepare',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'uglify',
        'cssmin',
        'filerev',
        'usemin',
        'clean:tmp'
    ]);
    grunt.registerTask('zip', ['build', 'compress']);
};