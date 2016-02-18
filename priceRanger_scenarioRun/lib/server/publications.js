// ScenarioRuns
// Cursor



Meteor.publish('ScenarioRuns.lastTen', function() {
  return ScenarioRuns.find({
    
  }, {
    fields: ScenarioRuns.publicFields,
    limit: 10,
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

Meteor.publish('ScenarioRuns.all.public.withSkip', function(skip, limit, userIdVal) {
  Counts.publish(this, 'total_scenarioRuns', ScenarioRuns.find())
 
  if (skip < 0) 
      skip = 0;
      
  var options = {};
  if(skip != 0) 
    options.skip = skip;
  
  options.limit = limit;
  if (options.limit > 10)  
    options.limit = 10;
  
  options.sort = {createdAt: -1};
  
  var query = {};
  if (userIdVal !== undefined)
    query = {userId: userIdVal};
    
  return ScenarioRuns.find(query, options)
});

Meteor.publish('ScenarioRuns.all.Count', function() {
  Counts.publish(this, 'total_scenarioRuns', ScenarioRuns.find())
  Counts.publish(this, 'total_scenarioRunsToRun', ScenarioRuns.find({status:0}))
})
