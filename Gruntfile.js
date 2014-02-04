module.exports = function(grunt) {

    // Configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['scripts/**/*.js', '!scripts/vendor/**/*.js', '!scripts/require.js'],
            options: {
                strict: true,
                globals: {
                    jQuery: true,
                    console: true
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'scripts/',
                    mainConfigFile: 'scripts/main.js',
                    name: 'main',
                    out: 'build/live-preview.js',
                    include: ['require.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['scripts/**/*.js'],
                tasks: ['jshint', 'requirejs']
            }
        }
    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Define your tasks here
    grunt.registerTask('default', ['jshint', 'watch']);

    grunt.registerTask('build', ['requirejs']);

};