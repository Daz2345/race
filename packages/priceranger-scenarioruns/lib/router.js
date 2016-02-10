if (Meteor.settings.public.mode === "production") {
    var loggedIn = FlowRouter.group({
        triggersEnter: [
            function() {
                var route;
                if (!(Meteor.loggingIn() || Meteor.userId())) {
                    route = FlowRouter.current();
                    if (route.route.name !== 'signin') {
                        Session.set('redirectAfterLogin', route.path);
                    }
                    return FlowRouter.go('signin');
                }
            }
        ]

    });
} else {
    var loggedIn = FlowRouter.group({});
}

// Scenario Runs

loggedIn.route('/scenarioRunsAll', {
    name: 'scenarioRunsAll',
    subscriptions: function(params, queryParams) {
        var page = parseInt(queryParams.page, 10) | 0;
        if (page < 0) {page = 0}
        var limit = 10,
        offset = page*limit,
        userId = queryParams.userId || undefined;
        this.register("liveScenarioRuns", Meteor.subscribe('ScenarioRuns.all.public.withSkip', offset, limit, userId));        
    },
    action: function(params, queryParams) {
        BlazeLayout.render("layout", {left: "left", main: "scenarioRunsAll"});
    }
});