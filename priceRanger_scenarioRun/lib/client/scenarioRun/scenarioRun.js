Template.scenarioRunBody.helpers({
    products: function() {
        var runIdVal = FlowRouter.getParam("runId"),
            scenarioIdVal = FlowRouter.getParam("scenarioId"),
            allProducts = ScenarioRuns.findOne({_id : runIdVal, scenarioId: scenarioIdVal}).products
            // odds = _.reject(allProducts, function(product){ return product.delisted === true; });    
        return allProducts;
    }
});

Template.scenarioRunRow.helpers({
    delistedVal: function() {
        if (this.delisted) {
            return "x";
        }
    }
});

// Template.scenarioRun.onCreated(function() {
//   var self = this;
//   self.autorun(function() {
//     var scenarioId = FlowRouter.getParam('scenarioId');
//     self.subscribe('scenario', scenarioId);  
//   });
// });