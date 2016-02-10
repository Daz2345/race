Package.describe({
  summary: 'PriceRanger scenario',
  version: '0.1.0',
  name: 'priceranger:scenario'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'priceranger:core',
    'priceranger:hierarchy-chart'
    ];

  api.use(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client & server

  api.addFiles([
    'lib/router.js'
  ], ['client', 'server']);

  // client

  api.addFiles([
    'lib/client/templates/scenario.html',
    'lib/client/templates/scenario.js'
  ], ['client']);

  // server

  api.addFiles([
    'lib/server/publications.js'
  ], ['server']);

});
