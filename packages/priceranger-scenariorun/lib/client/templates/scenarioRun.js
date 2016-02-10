Template.scenarioRunBody.helpers({
    products: function() {
        var runIdVal = FlowRouter.getParam("runId"),
            scenarioIdVal = FlowRouter.getParam("scenarioId"),
            allProducts = ScenarioRuns.findOne({
                _id: runIdVal,
                scenarioId: scenarioIdVal
            }).products
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

Template.scenarioRun.helpers({
    isReady: function(sub) {
        if (sub) {
            return FlowRouter.subsReady(sub);
        }
        else {
            return FlowRouter.subsReady();
        }
    }
});
