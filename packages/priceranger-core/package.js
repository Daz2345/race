Package.describe({
  summary: 'PriceRanger Core',
  version: '0.1.0',
  name: 'priceranger:core'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'priceranger:lib@0.1.0'
    ];

  api.use(packages);  
  api.imply(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client & server

  api.addAssets([
    'lib/race.js',
    'lib/router.js'
  ], ['client', 'server']);

  // client

  api.addAssets([
    'lib/client/templates/globalHelpers.js',    
    'lib/client/templates/index.html',
    'lib/client/templates/main.html',
    'lib/client/templates/main.js',
    'lib/client/templates/left_section.html',
    'lib/client/templates/left_section.js',
    'lib/client/templates/title.html',
    'lib/client/templates/title.js',
    'lib/client/templates/menuContainer.html',
    'lib/client/templates/menuContainer.js',
    'lib/client/templates/tableHeader.html',
    'lib/client/templates/tableHeader.js',    
    'lib/client/templates/signin.html',
    'lib/client/templates/loader.html',
    'lib/client/templates/logo.html',
    'lib/client/templates/welcome.html',
    'lib/client/stylesheets/custom.css'
  ], ['client']);

  // server

  api.addAssets([
    'lib/server/race.js'
  ], ['server']);

});
