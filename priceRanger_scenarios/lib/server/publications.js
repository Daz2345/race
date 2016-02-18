// Scenarios
// Cursor basic

// Meteor.publish('Scenarios.all.basic', function() {
//   return Scenarios.find({

//   }, {
//     fields: Scenarios.basic,
//     // limit: 200,
//     // sort: {createdAt: 1}
//   });
// });

// Meteor.publish('Scenarios.lastTen', function() {
//   return Scenarios.find({

//   }, {
//     fields: Scenarios.basic,
//     limit: 10,
//     sort: {createdAt: -1}
//   });
// });


// Meteor.publish('Scenarios.all.withProducts', function() {
//   return Scenarios.find({

//   }, {
//     fields: Scenarios.withProducts,
//     limit: 200,
//     sort: {createdAt: -1}
//   });
// });


Meteor.publish('Scenarios.all.basic.withSkip', function(skip, limit, userIdVal) {

  var options = {
    sort: {createdAt: -1},
    fields: Scenarios.basic
  };

  skip <= 0 ?  options.skip = 0 : options.skip = skip;
  limit > 10 ? options.limit = 10 : options.limit = limit;

  var query = {};
  if (userIdVal !== null) {
    query = {"userId": userIdVal};
  }

  // Counts.publish(this, 'total_scenarios', Scenarios.find(query))
  return Scenarios.find(query, options)
});

Meteor.publish('Scenarios.all.Count', function() {
  Counts.publish(this, 'total_scenarios', Scenarios.find());
  Counts.publish(this, 'total_scenariosToRun', Scenarios.find({status:0}));
});

// ReactiveTable.publish('scenariosReactive', function () { return Scenarios.find(); }, {});
