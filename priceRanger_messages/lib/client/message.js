Template.messageDisplay.helpers({
    userMessage: function() {
        return Messages.findOne().userMessage;
    },
    hasMessage: function() {
        return Messages.find().count() > 0;
    },
    scenarioId: function() {
        return Messages.findOne().scenarioId;
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
                    scenarioId: this.value
                }, {
                    $set: {
                        read: true
                    }
                });

            });
    }
})