Meteor.methods({
    'ScenarioRuns.methods.insert' : function(scenarioRunObj) {
        console.log(scenarioRunObj); 
        
        var scenariorun = {
            
        };
        
        scenariorun._id = ScenarioRuns.insert(scenariorun);
    }
});