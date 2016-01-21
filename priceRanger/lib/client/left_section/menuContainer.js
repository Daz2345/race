Template.menuContainer.helpers({
  pathForScenarios: function() {
    var path = FlowRouter.path("scenarios");
    return path;
  },
  pathForScenarioRuns: function() {
    var path = FlowRouter.path("scenarioRunsAll");
    return path;
  },
  scenariosCount: function() {
    return '***';
  },
  scenarioRunsCount: function() {
    return '***';
  }
});

Template.menuContainer.onCreated(function() {
    // scenariosCount = new ReactiveVar(Scenarios.find().count());
    // scenarioRunsCount = new ReactiveVar(ScenarioRuns.find().count());
});