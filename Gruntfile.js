module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*\n * <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>\n * <%= pkg.licenseUrl %>\n */\n'
			},
			build: {
				src: 'js/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				runnerPort: 9999,
				singleRun: true,
				browsers: ['PhantomJS']
			}
		},
		watch: {
			scripts: {
				files: ['js/**/*.js', 'test/**/*.js'],
				tasks: ['uglify', 'karma'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify','karma']);
};