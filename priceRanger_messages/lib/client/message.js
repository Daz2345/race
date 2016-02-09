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
                $(this)
                    .closest('.message')
                    .transition('fade');

                return Messages.update({
                    _id: this.messageId
                }, {
                    $set: {
                        read: true
                    }
                });

            });
    }
})