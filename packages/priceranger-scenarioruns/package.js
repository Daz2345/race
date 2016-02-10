Package.describe({
  summary: 'PriceRanger Scenario Runs',
  version: '0.1.0',
  name: 'priceranger:scenarioruns'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    
    ];

  api.use(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client & server

  api.addAssets([
    'lib/scenarioRuns.js',
    'lib/router.js'
  ], ['client', 'server']);

  // client

  api.addAssets([
    'lib/client/templates/scenarioRunsAll.html',
    'lib/client/templates/scenarioRunsAll.js',
  ], ['client']);

  // server

  api.addAssets([
    'lib/server/indexes.js',
    'lib/server/publications.js'
  ], ['server']);

});
