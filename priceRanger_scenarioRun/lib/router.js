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
        this.register("liveScenario", ScenarioRunsSubs.subscribe('Scenario.withProducts', params));        
    }
});

// Scenario Runs

loggedIn.route('/scenarioRunsAll', {
    name: 'scenarioRunsAll',
    subscriptions: function(params, queryParams) {
        var page = parseInt(queryParams.page, 10);
        if (page < 0) {page = 0}
        var limit = 10,
        offset = page*limit,
        userId = queryParams.userId;
        this.register("liveScenarioRuns", ScenarioRunsSubs.subscribe('ScenarioRuns.all.public.withSkip', offset, limit, userId));        
    },
    action: function(params, queryParams) {
        BlazeLayout.render("layout", {left: "left", main: "scenarioRunsAll"});
    }
});