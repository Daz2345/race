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
  
// Template.scenarioRunsAll_table.onCreated(function() {
//   var self = this;
//   self.autorun(function() {
//     self.subscribe('ScenarioRuns.all.public');  
//   });
// });

// Template.scenarioRunsAll_table.helpers({
//     settings: function() {
//         return {
//             rowsPerPage: 20,
//             showFilter: false,
//             showNavigation: 'auto',
//             showRowCount: true,
//             fields: [{
//                 key: 'scenarioName',
//                 label: "Scenario Name",
//                 headerClass: 'center aligned collapsing point',
//                 // tmpl: Template.tpnElement
//             }, {
//                 key: 'runName',
//                 label: "Run Name",
//                 headerClass: 'left aligned',
//                 sortable: false,
//                 // tmpl: Template.descriptionElement
//             }, {
//                 key: 'createdBy',
//                 label: "Created",
//                 headerClass: 'center aligned collapsing point',
//                 // tmpl: Template.quantityElement
//             }, {
//                 key: 'description',
//                 label: "Description",
//                 headerClass: 'center aligned collapsing point',
//                 // tmpl: Template.salesElement,
//                 // sortOrder: 1,
//                 // sortDirection: 'descending'
//             }, {
//                 key: 'delisted',
//                 label: "Delisted",
//                 headerClass: 'center aligned collapsing point',                
//                 // tmpl: Template.currentPriceElement
//             }, {
//                 key: 'npd',
//                 label: "NPD",
//                 headerClass: 'center aligned collapsing point',                
//                 // tmpl: Template.newPriceElement
//             }, {
//                 key: 'totalSales',
//                 label: "Total Sales",
//                 headerClass: 'center aligned collapsing point',                
//                 // tmpl: Template.delistedElement
//             }, {
//                 key: 'totalSales',
//                 label: "Total Sales",
//                 headerClass: 'center aligned collapsing point',                
//                 // tmpl: Template.delistedElement
//             }]
//         };
//     }
// });