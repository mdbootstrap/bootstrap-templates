module.exports = function(grunt) {

  var lib = [
    'angular/angular.min.js',
    'bootstrap-2.3.2/docs/assets/css/bootstrap.css',
    'bootstrap-2.3.2/docs/assets/css/docs.css',
    'bootstrap-2.3.2/docs/assets/js/bootstrap.min.js',
    'bootstrap-3/dist/css/bootstrap-theme.min.css',
    'bootstrap-3/dist/css/bootstrap.min.css',
    'bootstrap-3/dist/js/bootstrap.min.js',
    'bootstrap-tagsinput/bootstrap-tagsinput.css',
    'jquery/dist/jquery.min.js',
    'rainbow/js/language/generic.js',
    'rainbow/js/language/html.js',
    'rainbow/js/language/javascript.js',
    'rainbow/js/rainbow.min.js',
    'rainbow/themes/github.css',
    'typeahead.js/dist/typeahead.bundle.js'
  ];

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
          {expand: true, flatten: true, src: ['src/*.*'], dest: 'dist/', filter: 'isFile'},

          {expand: true, flatten: false, cwd: 'bower_components/', src: [lib], dest: 'examples/lib/'},
          {expand: true, flatten: false, cwd: 'dist/', src: ['**'], dest: 'examples/lib/bootstrap-tagsinput'},

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
    less: {
      build: {
        files: {
          "dist/<%= pkg.name %>.css": "src/<%= pkg.name %>.less"
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
    }
  });

  grunt.registerTask('build', ['test', 'jquerymanifest', 'zip']);
  grunt.registerTask('test', ['uglify', 'less', 'copy', 'karma']);
};
