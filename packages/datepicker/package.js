Package.describe({
  summary: 'datepicker',
  version: '0.1.0',
  name: 'datepicker'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  //None

  // ---------------------------------- 2. Files to include ----------------------------------

  // client

  api.addAssets([
    'lib/client/templates/daterangepicker.js',
    'lib/client/stylesheets/daterangepicker.css'
  ], ['client']);

});
