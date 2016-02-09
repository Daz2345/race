Meteor.publish('liveMessages', function(userIdVal) {
    return Messages.find({read: false, userId: userIdVal})
})