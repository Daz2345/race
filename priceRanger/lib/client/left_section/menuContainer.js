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
    return Scenarios.find().count()
  },
  scenarioRunsCount: function() {
    return ScenarioRuns.find().count()
  }
});

Template.menuContainer.onCreated(function() {
  this.autorun(() => {
    this.subscribe('Scenarios.all.public');
    this.subscribe('ScenarioRuns.all.public');
  });
});