Template.scenarioData.helpers({
    scenario: function(){
        var scenarioIdVal = FlowRouter.getParam("scenarioId");
        return Scenarios.findOne({_id : scenarioIdVal});   
    },
    productCount: function(){
        return scenario.products.count()
    },
    storesCount: function(){
        return scenario.stores.count()
    },
    dateRange: function(){
        // formatDate(scenario.startDate) + " - " + formatDate(scenario.endDate)
    }
})