Package.describe({
  summary: 'PriceRanger Hierarchy Chart',
  version: '0.1.0',
  name: 'priceranger:hierarchy-chart'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
        'd3js:d3'
    ];

  api.use(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client

  api.addAssets([
    'lib/client/templates/priceHierarchyChart.html',
    'lib/client/templates/priceHierarchyChart.js'
  ], ['client']);

});
