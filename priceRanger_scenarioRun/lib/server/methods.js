Meteor.methods({
    'ScenarioRuns.methods.insert': function(scenarioRunObj, scenarioIdVal) {
        if (!Meteor.user()) 
            throw new Meteor.Error("no-user", "You must be logged in to create a Scenario Run");
        
        var delistedCountVal = _.where(scenarioRunObj.products, {
                delisted: true
            }).length,
            npdCountVal = _.where(scenarioRunObj.products, {
                npd: true
            }).length;

        var scenariorun = {
            scenarioId: scenarioIdVal,
            scenarioName: scenarioRunObj.scenarioName,
            runName: scenarioRunObj.runName,
            description: scenarioRunObj.description,
            products: scenarioRunObj.products,
            delisted: delistedCountVal,
            npd: npdCountVal,
            status: 0,
            live: true,
            createdBy: Meteor.user().displayName,
            userId: Meteor.userId(),
            createdAt: new Date()
        };
        return ScenarioRuns.insert(scenariorun);
    },
    'ScenarioRuns.methods.remove': function(scenarioRunId) {
        var scenarioRunToRemove =  ScenarioRuns.find({_id: scenarioRunId});
        if (scenarioRunToRemove.userId !== this.userId) 
            throw new Meteor.Error("not-owned", "You can only delete Scenario Run's that you have created");
        
        return ScenarioRuns.remove({
            _id: scenarioRunId
        });
    }

});