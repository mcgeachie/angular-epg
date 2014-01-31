module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: 'src/**/*.js',
                dest: 'dist/<%= pkg.name %>.js'
            },
            css: {
                src: 'styles/**/*.css',
                dest: 'styles/main.css'
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['concat', 'connect']);
};