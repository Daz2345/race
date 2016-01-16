// Cursor for Scenario

Meteor.publish('ScenarioRuns.scenario.public', function(params) {
  return ScenarioRuns.find({
      scenarioId : params.scenarioId
  }, {
    fields: ScenarioRuns.publicFields,
    sort: {createdAt: -1}
  });
});

// Single Scenario

Meteor.publish('Scenario.basic', function(params) {
  return Scenarios.find({
    _id: params.scenarioId
  }, {
    fields: Scenarios.basic
  });
});
Meteor.publish('Scenario.withProducts', function(params) {
  return Scenarios.find({
    _id: params.scenarioId
  }, {
    fields: Scenarios.withProducts
  });
});