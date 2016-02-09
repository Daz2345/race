Meteor.publish('liveMessages', function() {
    if (userIdVal !== null) {
        return Messages.find({read: false, userId: Meteor.userId()})
    }
})