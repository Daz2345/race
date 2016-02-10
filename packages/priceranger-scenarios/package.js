Package.describe({
  summary: 'PriceRanger scenarios',
  version: '0.1.0',
  name: 'priceranger:scenarios'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'priceranger:core'
    ];

  api.use(packages);

  // ---------------------------------- 2. Files to include ----------------------------------
  
  // client & server

  api.addAssets([
    'lib/router.js',
    'lib/scenarios.js'
  ], ['client', 'server']);

  // client

  api.addAssets([
    'lib/client/templates/createScenario/scenarioSubmit/scenarioSubmit.html',
    'lib/client/templates/createScenario/scenarioSubmit/scenarioSubmit.js',
    'lib/client/templates/createScenario/controls.html',
    'lib/client/templates/createScenario/createScenario.html',
    'lib/client/templates/createScenario/createScenario.js'
  ], ['client']);

  // server

  api.addAssets([
    'lib/server/indexes.js',
    'lib/server/methods.js',
    'lib/server/publications.js'
    ], ['server']);


});
