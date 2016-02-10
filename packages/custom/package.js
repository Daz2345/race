Package.describe({
  summary: 'PriceRanger',
  version: '0.1.0',
  name: 'priceranger'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    
    ];

  api.use(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client & server

  api.addAssets([
    'lib/custom_fields.js',
    'lib/template_modules.js',
    'lib/callbacks.js'
  ], ['client', 'server']);

  // client

  api.addAssets([
    'lib/client/templates/hello.html',
    'lib/client/templates/hello.js',
    'lib/client/templates/custom_post_title.html',
    'lib/client/templates/custom_post_title.js',
    'lib/client/stylesheets/custom.scss',
    'lib/client/custom_templates.js'
  ], ['client']);

  // server

  api.addAssets([
    'lib/server/templates/custom_emailPostItem.handlebars'
  ], ['server']);

});
