Package.describe({
  summary: 'PriceRanger Scenario Run',
  version: '0.1.0',
  name: 'priceranger:scenariorun'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------


  // ---------------------------------- 2. Files to include ----------------------------------

  // client & server

  api.addAssets([
    'lib/router.js'
  ], ['client', 'server']);

  // client

  api.addAssets([
    'lib/client/templates/addNewProductButton.html',
    'lib/client/templates/addNewProductButton.js',
    'lib/client/templates/exportScenarioRun.html',
    'lib/client/templates/exportScenarioRun.js',    
    'lib/client/templates/newProductSubmit.html',
    'lib/client/templates/newProductSubmit.js',    
    'lib/client/templates/scenarioRun.html',
    'lib/client/templates/scenarioRun.js',      
    'lib/client/templates/scenarioRunCreate.html',
    'lib/client/templates/scenarioRunCreate.js',          
    'lib/client/templates/submitScenarioRun.html',
    'lib/client/templates/submitScenarioRun.js',       
    'lib/client/templates/controls.html'
  ], ['client']);

  // server

  api.addAssets([
    'lib/server/methods.js',
    'lib/server/publications.js'
  ], ['server']);

});
