Template.scenario.events({
    'click .createscenariorun': function(e) {
        var routeName = "createScenarioRun",
            scenarioId = FlowRouter.getParam("scenarioId"),
            params = {"scenarioId" : scenarioId};     
        FlowRouter.go(routeName, params);
    },
    'click .phChartIcon' : function(e) {
        currentScenarioRun.set(this);
        var chartIsShowing = phChartShow.get();
        if (chartIsShowing) {
            phChartCSS.set("display:none;");
            currentScenarioRun.set(null);  
            phChartShow.set(!chartIsShowing);
            //remove chart
            d3.select("svg").remove();  
        } else {    
            var y = e.clientY - 20,
                chartWidth = 480,
                mainPadding = $('.main-section').css('padding-left').replace('px',''),
                x = e.clientX - chartWidth - mainPadding;
            phChartShow.set(!chartIsShowing);
            phChartCSS.set("display:block;top:" + y + "px;left:" + x + "px;");
        }
    }
});

Template.scenario.onCreated(function(){
    phChartCSS = new ReactiveVar("display:none;");
    phChartShow = new ReactiveVar(false);
    currentScenarioRun = new ReactiveVar(null);
});

Template.scenarioRunsBody.helpers({
    scenarioRuns: function() {
        return ScenarioRuns.find({"scenarioId" : FlowRouter.getParam("scenarioId")});   
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
        var scenarioRun = this;
        switch (scenarioRun.status) {
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
    },
    delisted: function() {
        return this.delisted || 0;
    },
    npd: function() {
        return this.npd || 0;
    },
    totalSales: function() {
        return this.totalSales | 0;
    },
    chartIcon: function() {
        if (this.products !== undefined) {
            return "<i class='bar chart icon link phChartIcon'></i>";
        }
    }
  });
  
  Template.scenarioRunsFooter.helpers({
      runCount: function(){
        var scenarioIdVal = FlowRouter.getParam("scenarioId");          
        return ScenarioRuns.find({"scenarioId" : scenarioIdVal}).count();            
      }
  });
  
    Template.scenarioRuns_table.helpers({
    isReady: function(sub) {
        if (sub) {
            return FlowRouter.subsReady(sub);
        }
        else {
            return FlowRouter.subsReady();
        }
    }
  })