Meteor.publish('liveMessages', function() {
    return Messages.find({read: false, userId: Meteor.userId()})
})