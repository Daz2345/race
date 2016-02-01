var loggedIn = FlowRouter.group({
  // triggersEnter: [
  //   function() {
  //     var route;
  //     if (!(Meteor.loggingIn() || Meteor.userId())) {
  //       route = FlowRouter.current();
  //       if (route.route.name !== 'signin') {
  //         Session.set('redirectAfterLogin', route.path);
  //       }
  //       return FlowRouter.go('signin');
  //     }
  //   }
  // ]
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

