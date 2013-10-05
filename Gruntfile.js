module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-jquerymanifest');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      build: {
        files: [
          {expand: true, flatten: true, src: ['src/*.*'], dest: 'dist/', filter: 'isFile'}
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
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'
        }
      }
    },
    less: {
      build: {
        files: {
          "dist/<%= pkg.name %>.css": "dist/<%= pkg.name %>.less"
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
        files: ['src/**/*.*', 'test/**/*.js', 'examples/**/*.html'],
        tasks: ['copy:build', 'uglify:build', 'less:build'],
        options: {
          spawn: false,
          interupt: true
        }
      }
    },
    zip: {
      delpoy: {
        cwd: 'dist/',
        src:  ['dist/bootstrap-tagsinput*.*'],
        dest:  'build/<%= pkg.name %>.zip'
      }
    },
    jquerymanifest: {
      options: {
        source: grunt.file.readJSON('package.json'),
        overrides: {
          title: '<%= pkg.title %>'
        }
      }
    }
  });

  grunt.registerTask('build', ['unit', 'jquerymanifest', 'copy:build', 'uglify:build', 'less:build', 'zip']);  
  grunt.registerTask('unit', ['karma']);
};