Template.scenariosBody.helpers({
    scenarios: function () {
      // Show newest tasks at the top
      return Scenarios.find({}, {sort: {createdAt: -1}});
    }
});

Template.scenarios.helpers({
    isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  }
});

Template.scenariosBody.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Scenarios.all.basic.withSkip');  
  });
});

Template.scenariosRow.helpers({
    pathForScenario: function() {
      var scenario = this;
      var params = {
          scenarioId: scenario._id
      };
      if (this.runs === 0) {
        return FlowRouter.path("createScenarioRun", params);  
      } else {
        return FlowRouter.path("scenario", params);          
      }
  },
    status: function() {
        var scenario = this;
        switch (scenario.status) {
        case -1:
            return "error disabled";
            break;
        case 0:
            return "warning";
            break;
        case 1:
            return "";
            break;
        }
    }
  });
  
  Template.scenariosFooter.helpers({
      scenariosCount: function(){
        return Counts.get('total_scenarios');            
      }
  });