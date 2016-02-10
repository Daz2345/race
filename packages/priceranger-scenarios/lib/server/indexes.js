Meteor.startup(function () {
  Scenarios._ensureIndex({"createdAt": 1});
  Scenarios._ensureIndex({"createdBy": 1});
  Scenarios._ensureIndex({"name": 1});
  Scenarios._ensureIndex({"userId": 1});  
});

