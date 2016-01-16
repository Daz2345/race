Meteor.method('ScenarioUpdate', function(scenarioId, scenarioUpdate){
    Scenarios.update({_id : scenarioId}, {$set:scenarioUpdate});
    },{
        url: '/api/scenarioupdate/',
        getArgsFromRequest: function (request) {
            var content = request.body;
            return [ content.scenarioId, content.scenarioUpdate ];
        }
    }
);   

Meteor.method('ScenarioRunUpdate', function(scenarioRunId, scenarioRunUpdate){
    ScenarioRuns.update({_id : scenarioRunId}, {$set:scenarioRunUpdate});
    },{
        url: '/api/Scenariorunupdate/',
        getArgsFromRequest: function (request) {
            var content = request.body;
            return [content.scenarioId, content.scenarioRunUpdate];
        }
    }
);