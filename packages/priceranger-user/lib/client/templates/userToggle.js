Template.userToggle.events({
    'click .toggle': function(e) {
        var checked = $('.ui.checkbox').checkbox('is checked');
        if (Meteor.user()) {
            if (checked) {
                FlowRouter.setQueryParams({
                    userId: Meteor.user()._id
                });
            }
            else {
                FlowRouter.setQueryParams({
                    userId: null
                });
            }
        }
    }
})