// Scenarios

FlowRouter.route('/scenarios', {
    name:'scenarios',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenarios"});
    },
    subscriptions: function() {
        this.register("liveScenarios", Meteor.subscribe('Scenarios.all.withProducts'));
    }
});

