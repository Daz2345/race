Template.scenarioRuns.events({
    'click .createscenariorun': function(e) {
        var routeName = "createScenarioRun",
            scenarioId = FlowRouter.getParam("scenarioId"),
            params = {"scenarioId" : scenarioId};     
        FlowRouter.go(routeName, params);
    },
    'click .phChartIcon' : function(e) {
        Session.set("currentScenarioRun", this);
        var chartIsShowing = Session.get("phChartShow");
        if (chartIsShowing) {
            Session.set("phChartCSS", "display:none;");
            Session.set("currentScenarioRun", null);  
            Session.set("phChartShow", !chartIsShowing);
            //remove chart
            d3.select("svg").remove();  
        } else {    
            var y = e.pageY - 20,
                chartWidth = 480,
                screenWidth = $('body').width(),
                midSectionWidth = $('.mid-section').width(),
                x = e.pageX - chartWidth - (screenWidth - midSectionWidth);
            Session.set("phChartShow", !chartIsShowing);
            Session.set("phChartCSS", "display:block;top:" + y + "px;left:" + x + "px;");
        }
    }
});

Template.scenarioRuns.created = function(){
  this.autorun(() => {
    this.subscribe('Scenario.public', FlowRouter.getParam("scenarioId"));
    this.subscribe('ScenarioRuns.all.public');
  });    
    Session.set("phChartCSS", "display:none;");
    Session.set("phChartShow", false);
    Session.set("currentScenarioRun", null);
};

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
    },
    chartIcon: function() {
        if (this.products) {
            return "<i class='bar chart icon phChartIcon'></i>";
        }
    }
  });
  
  Template.scenarioRunsFooter.helpers({
      runCount: function(){
        var scenarioIdVal = FlowRouter.getParam("scenarioId");          
        return ScenarioRuns.find({"scenarioId" : scenarioIdVal}).count();            
      }
  })