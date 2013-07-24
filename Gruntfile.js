module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		copy: {
			main: {
				files: [
					{expand: true, flatten: true, src: ['src/*.js'], dest: 'build/bootstrap-tagsinput/', filter: 'isFile'}
				]
			}
		},
		uglify: {
			options: {
				banner: '<%= pkg.banner %>',
				sourceMap: 'build/bootstrap-tagsinput/<%= pkg.name %>.min.js.map',
				sourceMappingURL: '<%= pkg.name %>.min.js.map'
			},
			build: {
				files: {
					'build/bootstrap-tagsinput/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js'
				}
			}
		},
		sass: {
			build: {
				files: {
					'build/bootstrap-tagsinput/<%= pkg.name %>.css' : 'src/<%= pkg.name %>.scss'
				}
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				runnerPort: 9999,
				singleRun: true,
				autoWatch: false,
				browsers: ['PhantomJS']
			}
		},
		watch: {
			scripts: {
				files: ['src/**/*.js', 'test/**/*.js'],
				tasks: ['copy', 'uglify'],
				options: {
					spawn: false,
					interupt: true
				}
			}
		},
		zip: {
			build: {
				cwd: 'build/bootstrap-tagsinput/',
				src:  ['build/bootstrap-tagsinput/*.*'],
				dest:  'build/<%= pkg.name %>.zip'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-zip');

	grunt.registerTask('default', ['karma', 'copy', 'uglify', 'sass', 'zip']);
};