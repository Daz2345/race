Template.messageDisplay.helpers({
    userMessage: function() {
        return Messages.findOne().userMessage;
    },
    hasMessage: function() {
        return Messages.find().count() > 0;
    },
    messageId: function() {
        return Messages.findOne()._id;
    }
});

Template.messageDisplay.hooks({
    rendered: function() {
        $('.message .close')
            .on('click', function() {
                Meteor.call('Messages.read', this.value, function(err, res) {
                    if (err) {
                        alert(err);
                    }
                    else {
                        $(this)
                            .closest('.message')
                            .transition('fade');
                        return true;
                    }
                });
            });
    }
})