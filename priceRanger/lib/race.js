  Meteor.startup(function() {
    if (Meteor.isClient) {
      Deps.autorun(function() {
        Meteor.subscribe("userData");
      });
      Accounts.config({
        forbidClientAccountCreation: true
      });
    }

    if (Meteor.isServer) {

      // code to run on server at startup
      Meteor.publish("userData", function() {
        return Meteor.users.find();
      });

    }


    numeral.language('en-gb');

  });
  