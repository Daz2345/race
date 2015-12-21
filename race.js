Scenarios = new Mongo.Collection("scenarios");

if (Meteor.isClient) {
Template.tableRow.helpers({
    scenarios: function () {
      // Show newest tasks at the top
      return Scenarios.find({}, {sort: {createdAt: -1}});
    }
  });
}