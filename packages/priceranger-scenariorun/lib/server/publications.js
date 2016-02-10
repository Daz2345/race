// ScenarioRuns
// Cursor

Meteor.publish('ScenarioRun.public', function(params) {
  return ScenarioRuns.find({
      _id : params.runId,
      scenarioId : params.scenarioId
  }, {
    fields: ScenarioRuns.publicFields,
    sort: {createdAt: -1}
  });
});