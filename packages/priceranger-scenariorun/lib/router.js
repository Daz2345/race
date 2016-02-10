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

// Scenario Run

loggedIn.route('/scenario/:scenarioId/run/:runId', {
    name: 'scenarioRun',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenarioRun"});
    },
    subscriptions: function(params, queryParams) {
        this.register("liveScenario", Meteor.subscribe('Scenario.withProducts', params));         
        this.register('liveScenarioRun', Meteor.subscribe('ScenarioRun.public', params));        
    }
});


// CreateScenarioRun

loggedIn.route('/scenario/:scenarioId/createscenariorun', {
    name: 'createScenarioRun',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenarioRunCreate"});
    },
    subscriptions: function(params, queryParams) {
        this.register("liveScenario", Meteor.subscribe('Scenario.withProducts', params));        
    }
});
