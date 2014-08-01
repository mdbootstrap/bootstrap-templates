module.exports = function(grunt) {

  var lib = [
    'jquery/dist/jquery.min.js',
    'angular/angular.min.js',
    'typeahead.js/dist/typeahead.bundle.js'
  ];

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-jquerymanifest');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      build: {
        files: [
          {expand: true, flatten: true, src: ['src/*.*'], dest: 'dist/', filter: 'isFile'},

          {expand: true, flatten: false, cwd: 'bower_components/', src: [lib], dest: 'test/lib/'}
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
        cwd: 'dist/',
        src:  ['dist/bootstrap-tagsinput*.*'],
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
    }
  });

  grunt.registerTask('build', ['test', 'jquerymanifest', 'zip']);
  grunt.registerTask('test', ['uglify', 'copy', 'karma']);
};
