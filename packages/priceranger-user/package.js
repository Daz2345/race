Package.describe({
  summary: 'PriceRanger user',
  version: '0.1.0',
  name: 'priceranger:user'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'priceranger:core',
    'hive:accounts-ldap@0.4.1',
    'useraccounts:core',
    'useraccounts:semantic-ui',
    'accounts-password'  
    ];

  api.use(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client

  api.addAssets([
    'lib/client/templates/user.html',
    'lib/client/templates/user.js',
    'lib/client/templates/userToggle.html',
    'lib/client/templates/userToggle.js'    
  ], ['client']);

});
