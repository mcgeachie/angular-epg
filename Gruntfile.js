module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['app/styles/css', 'test/spec/compiled'],
        coffee: {
            glob_to_multiple: {
                expand: true,
                flatten: true,
                cwd: 'test/spec/',
                src: ['controllers/*.coffee','directives/*.coffee','filters/*.coffee'],
                dest: 'test/spec/compiled/',
                ext: '.spec.js'
            }
        },
        compass: {
            dist: {
                options: {
                    cssDir: 'app/styles/css',
                    sassDir: 'app/styles',
                    force: true
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            css: {
                src: 'app/styles/css/*.css',
                dest: 'app/styles/main.css'
            }
        },
        connect: {
            server: {
                options: {
                    port: 3501,
                    base: 'app',
                    hostname: grunt.config('server.hostname') || 'localhost',
                    keepalive: true
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        watch: {
            compass: {
                files: [
                    'app/styles/*.{scss,sass}'
                ],
                tasks: 'compass reload'
            },
            karma: {
                files: ['app/scripts/**/*.js', 'test/spec/**/*.js'],
                tasks: ['coffee', 'karma:unit:run']
            },
            reload: {
                files: [
                    'app/*.html',
                    'app/styles/**/*.css',
                    'app/scripts/**/*.js',
                    'app/views/**/*.html',
                    'app/images/**/*'
                ],
                tasks: 'reload'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', 'run karma tests', ['cleanCompile', 'karma']);

    grunt.registerTask('cleanCompile', 'clean compiled files and recompile', ['clean', 'coffee', 'compass', 'concat'])

    grunt.registerTask('start', 'clean, compile and start the webserver' ['cleanCompile', 'connect']);

    grunt.registerTask('default', ['start']);

    grunt.registerTask('startupFawagg', 'Starts up the dropwizard app', function () {
        require('child_process').exec('java -jar build/fawagg/fawagg.jar server aggregator-test.yaml', function (err, stdout) {
        });
    });
};