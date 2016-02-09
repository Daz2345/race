  Meteor.startup(function() {
    if (Meteor.isClient) {
      Accounts.config({
        forbidClientAccountCreation: true
      });
    }

    numeral.language('en-gb');

  });