// ScenarioRuns
// Cursor

Meteor.publish('ScenarioRuns.all.public', function() {
  return ScenarioRuns.find({
    
  }, {
    fields: ScenarioRuns.publicFields,
    sort: {createdAt: -1}
  });
});

