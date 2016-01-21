// ScenarioRuns
// Cursor

Meteor.publish('ScenarioRuns.all.public', function() {
  return ScenarioRuns.find({
    
  }, {
    fields: ScenarioRuns.publicFields,
    sort: {createdAt: -1}
  });
});

Meteor.publish('ScenarioRun.public', function(params) {
  return ScenarioRuns.find({
      _id : params.runId,
      scenarioId : params.scenarioId
  }, {
    fields: ScenarioRuns.publicFields,
    sort: {createdAt: -1}
  });
});

Meteor.publish('ScenarioRuns.all.public.withSkip', function(skip, limit) {
  Counts.publish(this, 'total_scenarioRuns', ScenarioRuns.find())
 
  if (skip < 0) {skip = 0}
  var options = {};
  if(skip != 0) {
    options.skip = skip;
  }
  options.limit = limit;
  if (options.limit > 10)  {options.limit = 10}
  options.sort = {createdAt: 1};

  return ScenarioRuns.find({}, options)
});
