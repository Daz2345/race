// Scenario Runs

FlowRouter.route('/scenario/:scenarioId', {
    name: 'scenario',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenario"});
    },
    subscriptions: function(params, queryParams) {
        this.register("liveScenario", Meteor.subscribe('Scenario.withProducts', params));
        this.register("liveScenarioRuns", Meteor.subscribe('ScenarioRuns.scenario.public', params));        
    }
});

