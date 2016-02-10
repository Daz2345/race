Package.describe({
  name: 'miguelalarcos:flow-router-pagination',
  version: '0.1.6',
  // Brief, one-line summary of the package.
  summary: 'A simple pagination package for flow-router.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/miguelalarcos/flow-router-pagination.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use('jquery');
  api.use('templating');
  api.addAssets(['flow-router-pagination.html',
  'flow-router-pagination.css',
  'flow-router-pagination.js'], 
  ['client']);
});

//Package.onTest(function(api) {
//  api.use('tinytest');
//  api.use('miguelalarcos:flow-router-pagination');
//  api.addAssets('flow-router-pagination-tests.js');
//});
