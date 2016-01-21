Template.registerHelper('formatDate', function(date) {
  return moment(date).format('HH:mm - DD-MM-YYYY');
});

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
            return "warning disabled";
            break;
        case 1:
            return "";
            break;
        }
    }
    // nameLink: function() {
    //     if (status = 1) {
    //          '<td class="collapsing"><a href={{pathForScenario}}>{{name}}</a></td>'
    //     } else {
    //         '<td class="collapsing">{{name}}</td>'
    //     }
    // }
  });
  
//  Template.scenariosTable.onCreated(function() {
//   this.autorun(() => {
//     this.subscribe('Scenarios.all.public');
//   });
// });