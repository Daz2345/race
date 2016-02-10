Package.describe({
  summary: 'PriceRanger API',
  version: '0.1.0',
  name: 'priceranger:api'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'priceranger:core@0.1.0',
    'meteorhacks:picker@1.0.3',
    'simple:rest@1.1.0'
    ];

  api.use(packages);
  api.imply(packages);
  
  // ---------------------------------- 2. Files to include ----------------------------------

  // server

  api.addAssets([
    'lib/server/api.js',
    'lib/server/methods.js'    
  ], ['server']);


});
