Template.tableHeader.helpers({
    header: function() {
        var route = FlowRouter.getRouteName(),
            Title = route.toProperCase(),
            scenarioId = FlowRouter.getParam("scenarioId"),
            ScenarioName = Scenarios.findOne({
                _id: scenarioId
            }).name.toProperCase() || "";

        if (route === "") {

        }

        switch (route) {
            case "scenarioRunsAll":
                return "All Scenario Runs";
                break;
            case "scenario":
                return "Scenario Runs for - " + ScenarioName;
                break;
            case "scenarios":
                return 'All ' + Title;
                break;
            case "scenarioRun":
                var scenarioRunId = FlowRouter.getParam("runId"),
                    ScenarioRun = ScenarioRuns.findOne({
                        _id: scenarioRunId
                    });
                return "Scenario Run - " + ScenarioRun.runName.toProperCase();
                break;
        }
    }
});

String.prototype.toProperCase = function() {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};