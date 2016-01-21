// Cursor for Scenario

// Meteor.publish('ScenarioRuns.scenario.public', function(params) {
//   return ScenarioRuns.find({
//     scenarioId: params.scenarioId
//   }, {
//     fields: ScenarioRuns.publicFields,
//     sort: {
//       createdAt: -1
//     }
//   });
// });

Meteor.publish('ScenarioRuns.scenario.public.withSkip', function(params, skip, limit) {
  Counts.publish(this, 'scenario_scenarioRuns', ScenarioRuns.find({
    scenarioId: params.scenarioId
  }));
  
  if (skip < 0) {skip = 0}
  var options = {};
  if (skip != 0) {
    options.skip = skip;
  }
  options.limit = limit;
  if (options.limit > 10) {
    options.limit = 10
  }
  options.sort = {
    createdAt: 1
  };
  return ScenarioRuns.find({
    scenarioId: params.scenarioId
  }, options);
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