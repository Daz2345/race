Package.describe({
  summary: 'PriceRanger Library',
  version: '0.1.0',
  name: 'priceranger:lib'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------
  
  var packages = [
    'meteor-base@1.0.1',
    'mongo',
    'blaze-html-templates@1.0.1',
    'jquery',
    'session',
    'tracker',
    'check',
    'standard-minifiers',     
    'es5-shim',                
    'ecmascript',   
    'semantic:ui',
    'flemay:less-autoprefixer',
    'momentjs:moment',
    'aldeed:template-extension',
    'datepicker',
    'kadira:flow-router',
    'kadira:blaze-layout',
    'harrison:papa-parse',
    'meteorhacks:fast-render',
    'underscore',
    'reactive-var',
    'msavin:mongol',
    'tmeasday:publish-counts',
    'miguelalarcos:flow-router-pagination',
    'manuel:reactivearray',
    'useraccounts:flow-routing',
    'numeral:numeral',
    'numeral:languages',
    'natestrauser:animate-css',
    'meteorhacks:cluster',
    'axw:json2csv'
    ];

  api.use(packages);
  api.imply(packages);

});
