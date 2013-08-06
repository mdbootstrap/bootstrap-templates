module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-jquerymanifest');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['src/*.js'], dest: 'examples/assets/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['lib/jquery.min.js'], dest: 'examples/assets/', filter: 'isFile'},
          {expand: true, cwd: 'lib', src: ['bootstrap*/**'], dest: 'examples/assets/' },
          {expand: true, flatten: true, src: ['lib/angular.min.js'], dest: 'examples/assets', filter: 'isFile'}
        ]
      }
    },
    uglify: {
      options: {
        banner: '<%= pkg.banner %>',
        sourceMap: 'examples/assets/<%= pkg.name %>.min.js.map',
        sourceMappingURL: '<%= pkg.name %>.min.js.map'
      },
      build: {
        files: {
          'examples/assets/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js'
        }
      }
    },
    sass: {
      build: {
        files: {
          'examples/assets/<%= pkg.name %>.css' : 'src/<%= pkg.name %>.scss'
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
        cwd: 'examples/assets/',
        src:  ['examples/assets/bootstrap-tagsinput*.*'],
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

  grunt.registerTask('default', ['karma','jquerymanifest', 'copy', 'uglify', 'sass', 'zip']);
  grunt.registerTask('build', ['copy', 'uglify', 'sass']);
  grunt.registerTask('unit', ['karma']);
};