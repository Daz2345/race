
// Scenario Run

FlowRouter.route('/scenario/:scenarioId/run/:runId', {
    name: 'scenarioRun',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenarioRun"});
    },
    subscriptions: function(params, queryParams) {
        this.register('liveScenarioRun', Meteor.subscribe('ScenarioRun.public', params));        
    }
});

// CreateScenarioRun

FlowRouter.route('/scenario/:scenarioId/createscenariorun', {
    name: 'createScenarioRun',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenarioRunCreate"});
    },
    subscriptions: function(params, queryParams) {
        this.register("liveScenario", Meteor.subscribe('Scenario.withProducts', params));        
    }
});

// Scenario Runs

FlowRouter.route('/scenarioRunsAll', {
    name: 'scenarioRunsAll',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenarioRunsAll"});
    },
    subscriptions: function(params, queryParams) {
        this.register("liveScenario", Meteor.subscribe('Scenarios.basic'));
        this.register("liveScenarioRuns", Meteor.subscribe('ScenarioRuns.all.public'));        
    }
});