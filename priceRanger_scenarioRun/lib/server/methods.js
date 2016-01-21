Meteor.methods({
    'ScenarioRuns.methods.insert' : function(scenarioRunObj, scenarioIdVal) {

        var scenariorun = {
            scenarioId: scenarioIdVal,
            scenarioName: scenarioRunObj.scenarioName,
            runName: scenarioRunObj.name,
            description: scenarioRunObj.description,
            products: scenarioRunObj.products,
            status: 0,
            createdBy: "DarrenI",
            createdAt: new Date(),
            delisted: _.where(scenarioRunObj.products,{delisted:true}).length
        };
        
        scenariorun._id = ScenarioRuns.insert(scenariorun);
    }
});