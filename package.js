// package metadata file for Meteor.js

Package.describe({
  name: 'bootstrp:tagsinput', // https://atmospherejs.com/bootstrp/tagsinput
  summary: 'Bootstrap Tags Input is a jQuery plugin providing a user interface for managing tags.',
  version: '0.5.0',
  git: 'https://github.com/timschlechter/bootstrap-tagsinput.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');

  api.use('jquery', 'client');

  api.addFiles([
    'dist/bootstrap-tagsinput.js',
    'dist/bootstrap-tagsinput.css'
  ], 'client');
});
