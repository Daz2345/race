// Scenarios

loggedIn.route('/scenarios', {
    name:'scenarios',
    subscriptions: function(params, queryParams) {
        var page = parseInt(queryParams.page, 10);
        if (page < 0) {page = 0}
        var limit = 10,
        offset = page*limit,
        userId = queryParams.userId;
        this.register("liveScenarios", ScenariosSubs.subscribe('Scenarios.all.basic.withSkip', offset, limit, userId));
    },
    action: function(params, queryParams) {
        BlazeLayout.render("layout", {left: "left", main: "scenarios"});
    }    
});