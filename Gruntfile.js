module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-zip');
	grunt.loadNpmTasks('grunt-jquerymanifest');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-banner');

  	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
    	bower: {
      	install: {
        		options: {
          		targetDir: './lib',
          		layout: 'byType',
          		install: true,
          		verbose: true,
          		cleanTargetDir: false,
          		cleanBowerDir: true,
          		bowerOptions: {
            		forceLatest: true
          		}
        		}
      	}
    	},
    	copy: {
      	versioned: {
        		files: [
          		{ expand: true, flatten: true, src: ['src/*.*'], dest: 'versioned/', filter: 'isFile' }
        		]
      	},
      	build: {
        		files: [
          		{ expand: true, flatten: true, src: ['versioned/*.*'], dest: 'dist/', filter: 'isFile' }
        		]
      	}
    	},
    	uglify: {
      	options: {
        		banner: '<%= pkg.banner %>',
        		sourceMap: 'dist/<%= pkg.name %>.min.js.map',
        		sourceMappingURL: '<%= pkg.name %>.min.js.map'
      	},
      	build: {
        		files: {
          		'dist/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js',
          		'dist/<%= pkg.name %>-angular.min.js': 'src/<%= pkg.name %>-angular.js'
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
    	zip: {
      	delpoy: {
        		// cwd: 'dist/',
        		src:  [
					'dist/bootstrap-tagsinput*.js',
					'dist/bootstrap-tagsinput*.css',
					'dist/bootstrap-tagsinput*.less',
					'dist/bootstrap-tagsinput*.map'
         	],
        		dest:  'dist/<%= pkg.name %>.zip'
      	}
    	},
    	jquerymanifest: {
      	options: {
        		source: grunt.file.readJSON('package.json'),
        		overrides: {
          		title: '<%= pkg.title %>'
        		}
      	}
    	},
		usebanner: {
	 		taskName: {
				options: {
					position: 'top',
					banner: '<%= pkg.banner %>',
					linebreak: true
				},
				files: {
					src: [ 'versioned/*.*' ]
				}
			}
		}
  	});

  	grunt.registerTask('install', ['bower']);
  	grunt.registerTask('compile', ['copy:versioned', 'usebanner', 'uglify', 'copy:build']);
  	grunt.registerTask('test', ['compile', 'karma']);
  	grunt.registerTask('build', ['test', 'jquerymanifest', 'zip']);
};
