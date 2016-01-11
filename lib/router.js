
FlowRouter.route('/', {
    name: 'home',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "welcome"});
    }
});

FlowRouter.route('/user', {
    name: 'user',
    // action: function(params) {
    //     BlazeLayout.render("layout", {left: "left", main: "welcome"});
    // }
});

FlowRouter.route('/scenarios', {
    name:'scenarios',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenarios"});
    }
});

FlowRouter.route('/scenario/:scenarioId', {
    name: 'scenarioRuns',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenarioRuns"});
    }
});

FlowRouter.route('/scenario/:scenarioId/run/:runId', {
    name: 'scenarioRun',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenario"});
    }
});

FlowRouter.route('/scenario_runs_all/', {
    name: 'scenarioRunsAll',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenarioRunsAll"});
    }
});

FlowRouter.route('/scenario/:scenarioId/createscenariorun', {
    name: 'createScenarioRun',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenarioRun"});
    }
});