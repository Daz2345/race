// Cursor for Scenario

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