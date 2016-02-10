Meteor.method('ScenarioUpdate', function(scenarioId, scenarioUpdate){
    Scenarios.update({_id : scenarioId}, {$set:scenarioUpdate});
    if (scenarioUpdate.status > 0) {
        var originalScenario = Scenarios.findOne({_id : scenarioId});
        console.log("msg");
        var messageVal = {
            "scenarioId": scenarioId,
            "userMessage": "'"+originalScenario.name+"' is now available",
            "read": false,
            "userId": originalScenario.userId
        };
        
        Messages.insert(messageVal)
    }
    },{
        url: '/api/scenarioupdate/',
        getArgsFromRequest: function (request) {
            var content = request.body;

            var originalScenario = Scenarios.findOne({_id : content.scenarioId});

            function shapeProducts(element, index, list){
                element.price = parseFloat(element.price.toFixed(2)),
                element.tpn = parseInt(element.tpn, 10),
                element.quantity = parseFloat(element.quantity.toFixed(0)),
                element.sales = parseFloat(element.spend.toFixed(2)),
                element.description = element.description;
            }

            if (content.scenarioUpdate.products !== undefined){
                _.each(content.scenarioUpdate.products, shapeProducts);
            }

            var id = content.scenarioId,
                update = {
                    products: content.scenarioUpdate.products || originalScenario.products,
                    message: content.scenarioUpdate.message || originalScenario.message || "",
                    status: content.scenarioUpdate.status,
                    updatedAt: new Date()
                };

            return [ id, update ];
        }
    }
);   

Meteor.method('ScenarioRunUpdate', function(scenarioRunId, scenarioRunUpdate){
    ScenarioRuns.update({_id : scenarioRunId}, {$set:scenarioRunUpdate});
    },{
        url: '/api/scenariorunupdate/',
        getArgsFromRequest: function (request) {
            var content = request.body;

            var originalScenarioRun = ScenarioRuns.findOne({_id : content.scenarioRunId});

            function shapeProducts(element, index, list){
                element.price = parseFloat(element.price.toFixed(2)),
                element.new_price = parseFloat(element.new_price.toFixed(2)),
                element.tpn = parseInt(element.tpn, 10),
                element.quantity = parseFloat(element.quantity.toFixed(0)),
                element.sales = parseFloat(element.spend.toFixed(2));
                element.new_quantity = parseFloat(element.new_quantity.toFixed(0)),
                element.new_sales = parseFloat(element.new_sales.toFixed(2));
            }
            
            if (content.scenarioRunUpdate.products !== undefined)            
                _.each(content.scenarioRunUpdate.products, shapeProducts);
            
            var id = content.scenarioRunId,
                update = {
                    products: content.scenarioRunUpdate.products ||  originalScenarioRun.products,
                    message: content.scenarioRunUpdate.message ||  originalScenarioRun.message,
                    status: content.scenarioRunUpdate.status,
                    updatedAt: new Date()
                };
            return [ id, update ];
        }
    }
);