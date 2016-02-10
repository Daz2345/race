Template.scenarioRunsAll.events({
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
            var y = e.pageY - 20,
                chartWidth = 480,
                mainPadding = $('.main-section').css('padding-left').replace('px',''),
                x = e.clientX - chartWidth - mainPadding;
            phChartShow.set(!chartIsShowing);
            phChartCSS.set("display:block;top:" + y + "px;left:" + x + "px;");
        }
    }
});

Template.scenarioRunsAll.onCreated(function(){
        phChartCSS = new ReactiveVar("display:none;");
        phChartShow = new ReactiveVar(false);
        currentScenarioRun = new ReactiveVar(null);
});

Template.scenarioRunsAllBody.helpers({
    scenarioRuns: function() {
        return ScenarioRuns.find({},{sort:{createdAt: -1}});   
    }
});

Template.scenarioRunsAllRow.helpers({
    pathForScenario: function() {
      var run = this;
      var params = {
          scenarioId: run.scenarioId
      };
      // var queryParams = {comments: "yes"};
      var routeName = "scenario";
      var path = FlowRouter.path(routeName, params);
  
      return path;
    },
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
            return "warning disabled";
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
        return this.totalSales || 0;
    },
    chartIcon: function() {
        if (this.products !== undefined) {
            return "<i class='bar chart icon link phChartIcon'></i>";
        }
    }
  });
  
  Template.scenarioRunsAllFooter.helpers({
      runCount: function(){
        return Counts.get('total_scenarioRuns');            
      }
  });
  
  Template.scenarioRunsAll.helpers({
    isReady: function(sub) {
        if (sub) {
            return FlowRouter.subsReady(sub);
        }
        else {
            return FlowRouter.subsReady();
        }
    }
  })