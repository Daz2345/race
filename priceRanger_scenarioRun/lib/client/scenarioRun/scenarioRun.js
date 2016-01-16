Template.scenarioRunBody.helpers({
    products: function() {
        return ScenarioRuns.findOne({_id : FlowRouter.getParam("runId")}).products;
    }
});

// Template.scenarioRun.onCreated(function() {
//   var self = this;
//   self.autorun(function() {
//     var scenarioId = FlowRouter.getParam('scenarioId');
//     self.subscribe('scenario', scenarioId);  
//   });
// });