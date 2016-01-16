// Scenarios
// Cursor basic

Meteor.publish('Scenarios.all.basic', function() {
  return Scenarios.find({

  }, {
    fields: Scenarios.basic,
    limit: 200,
    sort: {createdAt: 1}
  });
});
Meteor.publish('Scenarios.all.withProducts', function() {
  return Scenarios.find({

  }, {
    fields: Scenarios.withProducts,
    limit: 200,
    sort: {createdAt: 1}
  });
});