Package.describe({
  summary: 'PriceRanger messages',
  version: '0.1.0',
  name: 'priceranger:messages'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  //None

  // ---------------------------------- 2. Files to include ----------------------------------

  // client & server

  api.addAssets([
    'lib/messages.js'
  ], ['client', 'server']);

  // client

  api.addAssets([
    'lib/client/templates/message.html',
    'lib/client/templates/message.js',
  ], ['client']);

  // server

  api.addAssets([
    'lib/server/publications.js'
  ], ['server']);

});
