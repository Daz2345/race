SimpleRest.configure({
    collections: []
});

// code to run on server at startup
Meteor.publish('userData', function() {
    return Users.find({
        _id: this.userId
    });
});