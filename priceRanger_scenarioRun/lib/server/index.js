Meteor.startup(function () {
  ScenarioRuns._ensureIndex({"createdAt": 1});
  ScenarioRuns._ensureIndex({"createdBy": 1});
  ScenarioRuns._ensureIndex({"name": 1});
  ScenarioRuns._ensureIndex({"userId": 1});    
  ScenarioRuns._ensureIndex({"scenarioId": 1});  
  ScenarioRuns._ensureIndex({"createdAt": 1, "scenarioId": 1});  
});
