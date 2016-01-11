Template.scenarioRuns.events({
    'click .createscenariorun': function(e) {
        var routeName = "createScenarioRun";
        var scenarioIdVal = FlowRouter.getParam("scenarioId");     
        console.log(scenarioIdVal);        
        var path = FlowRouter.url(routeName, {"scenarioId" : scenarioIdVal});
        console.log(path);
        // FlowRouter.go(path);
    }
});

Template.scenarioRunsBody.helpers({
    scenarioRuns: function() {
        var scenarioIdVal = FlowRouter.getParam("scenarioId");
        return ScenarioRuns.find({"scenarioId" : scenarioIdVal}, {sort: {createdAt: -1}});   
    }
});

// { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }

Template.scenarioRunsRow.helpers({
    pathForScenarioRun: function() {
      var run = this;
      var params = {
          scenarioId: run.scenarioId,
          runId: run._id
      };
      // var queryParams = {comments: "yes"};
      var routeName = "scenarioRun";
      var path = FlowRouter.path(routeName, params);
  
      return path;
    },
    runStatus: function() {
        var run = this;
        switch (run.status) {
        case -1:
            return "<i class='red dont icon'></i>";
            break;
        case 0:
            return "<div class='ui basic segment'><div class='ui active mini loader'></div></div>";
            break;
        case 1:
            return "<i class='green checkmark icon'></i>";
            break;
        }
    },
    delisted: function() {
        if (this.products !== undefined) {
            return this.products.delisted;
        } else {
            return 0;
        }
    },
    npd: function() {
        if (this.products !== undefined) {
            return this.products.npd;
        } else {
            return 0;
        }
    },
    totalSales: function() {
        return this.totalSales | 0;
    }
  });
  
  Template.scenarioRunsFooter.helpers({
      runCount: function(){
        var scenarioIdVal = FlowRouter.getParam("scenarioId");          
        return ScenarioRuns.find({"scenarioId" : scenarioIdVal}).count();            
      }
  })