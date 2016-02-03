Meteor.methods({
    'ScenarioRuns.methods.insert' : function(scenarioRunObj, scenarioIdVal) {

        var delistedCountVal = _.where(scenarioRunObj.products,{delisted:true}).length
            npdCountVal = _.where(scenarioRunObj.products,{npd:true}).length;
            
        var scenariorun = {
            scenarioId: scenarioIdVal,
            scenarioName: scenarioRunObj.scenarioName,
            runName: scenarioRunObj.runName,
            description: scenarioRunObj.description,
            products: scenarioRunObj.products,
            delisted: delistedCountVal,
            npd: npdCountVal,
            status: 0,
            createdBy : Meteor.user().username,
            userId: Meteor.user()._id,          
            createdAt: new Date()
        };
        
        scenariorun._id = ScenarioRuns.insert(scenariorun);
    }
});