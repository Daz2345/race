Meteor.publish('liveMessages', function(userIdVal) {
    if (userIdVal !== null) {
        return Messages.find({read: false, userId: userIdVal})
    }
})