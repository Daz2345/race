Meteor.method('ScenarioUpdate', function(scenarioId, scenarioUpdate){
    Scenarios.update({_id : scenarioId}, {$set:scenarioUpdate});
    },{
        url: '/api/scenarioupdate/',
        getArgsFromRequest: function (request) {
            var content = request.body;
            
            function shapeProducts(element, index, list){
                list[index].price = parseFloat(element.unit_price.toFixed(2)),
                list[index].tpn = parseInt(element.tpn, 10),
                list[index].quantity = parseFloat(element.quantity.toFixed(0)),
                list[index].sales = parseFloat(element.spend.toFixed(2)),
                list[index].description = element.description,
                list[index].delisted = element.delisted | false,                
                list[index].npd = element.npd | false;
                list[index].similar = element.similar | null;
            }
            
            var productsAfterShaping = _.each(content.scenarioUpdate.products, shapeProducts);
            
            var id = content.scenarioId,
                update = {
                    products: productsAfterShaping,
                    message: content.scenarioUpdate.message | null,
                    status: content.scenarioUpdate.status
                };
            return [ id, update ];
        }
    }
);   

Meteor.method('ScenarioRunUpdate', function(scenarioRunId, scenarioRunUpdate){
    ScenarioRuns.update({_id : scenarioRunId}, {$set:scenarioRunUpdate});
    },{
        url: '/api/Scenariorunupdate/',
        getArgsFromRequest: function (request) {
            var content = request.body;
            return [content.scenarioId, content.scenarioRunUpdate];
        }
    }
);