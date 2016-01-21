var loggedIn = FlowRouter.group({
//   triggersEnter: [
//     function() {
//       var route;
//       if (!(Meteor.loggingIn() || Meteor.userId())) {
//         route = FlowRouter.current();
//         if (route.route.name !== 'login') {
//           Session.set('redirectAfterLogin', route.path);
//         }
//         return FlowRouter.go('login');
//       }
//     }
//   ]
});
var exposed = FlowRouter.group({});

loggedIn.route('/', {
    name: 'home',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "welcome"});
    }
});

exposed.notFound = {
    // Subscriptions registered here don't have Fast Render support.
    subscriptions: function() {

    },
    action: function() {
        BlazeLayout.render("notFound");
    }
};

exposed.route('/login',{
    name: 'login',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "login"});
    }
});

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

// Scenario Runs

loggedIn.route('/scenarioRunsAll', {
    name: 'scenarioRunsAll',
    subscriptions: function(params, queryParams) {
        var page = parseInt(queryParams.page, 10) | 0;
        if (page < 0) {page = 0}
        var limit = 10,
        offset = page*limit;        
        this.register("liveScenarioRuns", Meteor.subscribe('ScenarioRuns.all.public.withSkip', offset, limit));        
    },
    action: function(params, queryParams) {
        BlazeLayout.render("layout", {left: "left", main: "scenarioRunsAll"});
    }
});

// Scenarios

loggedIn.route('/scenarios', {
    name:'scenarios',
    subscriptions: function(params, queryParams) {
        var page = parseInt(queryParams.page, 10) || 0;
        if (page < 0) {page = 0}
        var limit = 10,
        offset = page*limit;
        this.register("liveScenarios", Meteor.subscribe('Scenarios.all.basic.withSkip', offset, limit));
    },
    action: function(params, queryParams) {
        BlazeLayout.render("layout", {left: "left", main: "scenarios"});
    }    
});

// Scenario Runs

loggedIn.route('/scenario/:scenarioId', {
    name: 'scenario',
    action: function(params) {
        BlazeLayout.render("layout", {left: "left", main: "scenario"});
    },
    subscriptions: function(params, queryParams) {
        this.register("liveScenario", Meteor.subscribe('Scenario.withProducts', params));
        var page = parseInt(queryParams.page, 10) || 0;
        if (page < 0) {page = 0}
        var limit = 10,
        offset = page*limit;           
        this.register("liveScenarioRuns", Meteor.subscribe('ScenarioRuns.scenario.public.withSkip', params, offset, limit));        
    }
});
