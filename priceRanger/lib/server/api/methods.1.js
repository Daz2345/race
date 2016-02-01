// Meteor.method('ScenarioUpdate', function(scenarioId, scenarioUpdate){
//     Scenarios.update({_id : scenarioId}, {$set:scenarioUpdate});
//     },{
//         url: '/api/scenarioupdate/',
//         getArgsFromRequest: function (request) {
//             var content = request.body;
            
//             console.log(new Date());            
//             console.log('Scenario Update');
//             console.log(content);

//             function shapeProducts(element, index, list){
//                 element.price = parseFloat(element.price.toFixed(2)),
//                 element.tpn = parseInt(element.tpn, 10),
//                 element.quantity = parseFloat(element.quantity.toFixed(0)),
//                 element.sales = parseFloat(element.spend.toFixed(2)),
//                 element.description = element.description;
//             }
            
//             var createdAt = Scenarios.findOne({_id : scenarioId}).createdAt;
            
//             if (content.scenarioUpdate.products !== undefined)
//                 _.each(content.scenarioUpdate.products, shapeProducts);
            
//             var id = content.scenarioId,
//                 update = {
//                     products: content.scenarioUpdate.products,
//                     productsCount: content.scenarioUpdate.products.length,
//                     message: content.scenarioUpdate.message || Scenarios.find({_id : scenarioId}).message,
//                     status: content.scenarioUpdate.status,
//                     updatedAt: new Date(),
//                     runTime: createdAt.diff(new Date(), 'hours')
//                 };

//             return [ id, update ];
//         }
//     }
// );   

// Meteor.method('ScenarioRunUpdate', function(scenarioRunId, scenarioRunUpdate){
//     ScenarioRuns.update({_id : scenarioRunId}, {$set:scenarioRunUpdate});
//     },{
//         url: '/api/scenariorunupdate/',
//         getArgsFromRequest: function (request) {
//             var content = request.body;

//             console.log(new Date());            
//             console.log('ScenarioRun Update');
//             console.log(content);
            
//             function shapeProducts(element, index, list){
//                 element.price = parseFloat(element.price.toFixed(2)),
//                 element.tpn = parseInt(element.tpn, 10),
//                 element.quantity = parseFloat(element.quantity.toFixed(0)),
//                 element.sales = parseFloat(element.spend.toFixed(2));
//             }
            
//             if (content.scenarioRunUpdate.products !== undefined)            
//                 _.each(content.scenarioRunUpdate.products, shapeProducts);
                
                
            
//             var id = content.scenarioRunId,
//                 update = {
//                     products: content.scenarioRunUpdate.products,
//                     message: content.scenarioRunUpdate.message ||  ScenarioRuns.find({_id : content.scenarioRunId}).message,
//                     status: content.scenarioRunUpdate.status,
//                     updatedAt: new Date()
//                 };
//             return [ id, update ];
//         }
//     }
// );