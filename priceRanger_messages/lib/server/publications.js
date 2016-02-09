Meteor.publish('liveMessages', function() {
    return Messages.find({read: false, userId: this.userId})
})