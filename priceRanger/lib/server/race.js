SimpleRest.configure({
    collections: []
});

// code to run on server at startup
Meteor.publish("userData", function() {
    return Meteor.users.find({
        _id: this.userId
    });
});