Template.tableHeader.helpers({
    header: function() {
        var headerVal = FlowRouter.getRouteName();
        var Title = headerVal.toProperCase();
        var scenarioId = FlowRouter.getParam("scenarioId");
        var Scenario = Scenarios.findOne({_id: scenarioId});
        
        switch (headerVal) {
            case "scenarioRuns":
                return "Scenario Runs for - " + Scenario.name.toProperCase();    
                break;
            case "scenarios":
                return Title;    
                break;
            case "scenarioRun":
                return Title;    
                break;               
        }

  }    
  });
  
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};