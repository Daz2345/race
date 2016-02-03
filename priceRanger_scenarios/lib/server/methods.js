// Scenarios.methods = {};

// Scenarios.methods.insert = {
//     name: 'Scenarios.methods.insert',
//     run(scenarioObj){
//         var scenario = {
//           name : scenarioObj.name,
//           dateStart : scenarioObj.dateStart,
//           dateEnd : scenarioObj.dateEnd,
//           dateRange: scenarioObj.dateRange,
//           description : scenarioObj.description,
//           stores : scenarioObj.stores,
//           products : scenarioObj.products,
//           priceStrat_ce : scenarioObj.priceStrat_ce,
//           priceStrat_de : scenarioObj.priceStrat_de,
//           npEvaluation : scenarioObj.npEvaluation,
//           shelfReview : scenarioObj.shelfReview,
//           status : 0,
//           createdAt : new Date(),
//           createdBy : "Darren",
//           runs: 0
//         };
//         scenario._id = Scenarios.insert(scenario);
//     },
//     call(args, callback) {
//     const options = {
//       returnStubValue: true,     // (5)
//       throwStubExceptions: true  // (6)
//     };

//     Meteor.apply(this.name, [args], options, callback);
//   }    
// };

// Meteor.methods({
//     [Scenarios.methods.insert.name]: function(args){
//         Scenarios.methods.insert.run.call(this, args);
//     }
// });


Meteor.methods({
    'Scenarios.methods.insert' : function(scenarioObj) {

        var scenarioExtend = {
          status : 0,
          productsCount : scenarioObj.products.length,
          createdAt : new Date(),
          createdBy : Meteor.user().username,
          userId: Meteor.user()._id,
          runs: 0
        };
        
        var scenario = _.extend(scenarioObj, scenarioExtend);
        
        scenario._id = Scenarios.insert(scenario);
    },
    'Scenarios.methods.runCount' : function(scenarioIdVal) {
        var runCount = ScenarioRuns.find({scenarioId : scenarioIdVal}).count() + 1;
        Scenarios.update({_id : scenarioIdVal},{$set:{runs:runCount}},{upsert:true});
    }
});