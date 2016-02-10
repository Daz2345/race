Meteor.methods({
    'Messages.read' : function(messageId) {
        message._id = Messages.update({_id: messageId}, {$set: {read: true}});
    }
});