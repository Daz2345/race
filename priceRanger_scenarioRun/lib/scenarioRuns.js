ScenarioRuns = new Mongo.Collection("scenarioRuns");

ScenarioRunsSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

ScenarioRuns.publicFields = {
    
};

// if (Meteor.isServer) {
// ReactiveTable.publish(
//   "ScenarioRuns.all.public",
//   ScenarioRuns
// );
// }