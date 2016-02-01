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
    return Counts.get('total_scenarios');
  },
  scenariosProcessing: function () {
    return Counts.get('total_scenariosToRun');
  },
  scenariosRunTime: function () {
    var ScenariosObj = Scenarios.find().fetch(),
        totalRun = _.pluck(ScenariosObj, 'runTime');
        
    var totalRuns = _.reduce(totalRun, function(totalRunTime, runTime){ return totalRunTime + runTime; }, 0);        
        
    if (isNaN(totalRuns)) {
      return 0;
    } else {
      return totalRuns / ScenariosObj.length;      
    }
  },  
  scenarioRunsCount: function() {
    return Counts.get('total_scenarioRuns');
  },
  scenarioRunsProcessing: function () {
    return Counts.get('total_scenarioRunsToRun');
  },  
  scenarioRunsRunTime: function () {
    var ScenarioRunsObj = ScenarioRuns.find().fetch(),
        totalRun = _.pluck(ScenarioRunsObj, 'runTime');
        
    var totalRuns = _.reduce(totalRun, function(totalRunTime, runTime){ return totalRunTime + runTime; }, 0);        
        
    if (isNaN(totalRuns)) {
      return 0;
    } else {
      return totalRuns / ScenarioRunsObj.length;      
    }
  },    
});