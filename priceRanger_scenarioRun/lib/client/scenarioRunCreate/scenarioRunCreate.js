scenarioRunProducts = new Mongo.Collection(null);

Template.scenarioRunCreate.helpers({
    scenario: function() {
        return Scenarios.findOne({
            _id: FlowRouter.getParam("scenarioId")
        });
    },

    isReady: function(sub) {
        if (sub) {
            return FlowRouter.subsReady(sub);
        }
        else {
            return FlowRouter.subsReady();
        }
    }
});

Template.scenarioRunCreate.events({
    'click .reactive-table tbody tr :checkbox': function(e) {
        scenarioRunProducts.update({_id:this._id},{$set:{delisted: !this.delisted}})
    },
    'change .ui.new_price': function(e) {
        var priceVal = parseFloat($('.new_price' + this._id).val());
        scenarioRunProducts.update({_id : this._id}, {$set:{new_price : priceVal}});
    },
    'click .button.submitScenarioRun': function(e) {
        var scenarioRunForm = document.getElementById('scenarioRunCreateForm');
            // ScenarioRunProductsVal = scenarioRunProducts.find().fetch();

        var isValid = $('.ui.form.scenarioRunCreate').form('is valid');

        if (isValid) {
        // function productsSetup(element, index, list) {
        //     // if its not a new product or the the product has not been delisted and it does not have a new price then its simply the same as before
        //     if (!element.npd && !element.delisted && !element.new_price) {
        //         element.new_price = element.price;
        //     }
        //     if (!element.npd) {
        //         element.npd = false;
        //     }
        // }

        // _.each(ScenarioRunProductsVal, productsSetup);

        var scenarioRunObj = {
            scenarioName: Scenarios.findOne({
                _id: FlowRouter.getParam("scenarioId")
            }).name,
            runName: scenarioRunForm.elements["name"].value,
            description: scenarioRunForm.elements["runDescription"].value,
            products: ScenarioRunProducts
        };

        var routeName = "scenario",
            scenarioId = FlowRouter.getParam("scenarioId"),
            params = {
                "scenarioId": scenarioId
            };

        Meteor.call('ScenarioRuns.methods.insert', scenarioRunObj, scenarioId, function(err, res) {
            if (err) {
                alert(err);
            }
            else {
                Meteor.call('Scenarios.methods.runCount', scenarioId, function(err, res) {
                    if (err) {
                        alert(err);
                    }
                    else {
                        scenarioRunForm.reset();
                        FlowRouter.go(routeName, params);
                    }
                });
            }
        });
        } else {
            $('.ui.form.scenarioRunCreate').form('validate form');
        }
    }
});

// Template.scenarioRunCreateBody.helpers({
//     products: function() {
//         return scenarioRunProducts.find({},{sort:{sales:-1}});
//     }
// });

Template.scenarioRunCreate.onCreated(function() {
    FlowRouter.subsReady("liveScenario", function() {

        scenarioRunProducts.remove({});

        var prods = Scenarios.findOne({
            _id: FlowRouter.getParam("scenarioId")
        }).products;

        _.each(prods, function(doc) {
            doc.new_price = doc.price;
            scenarioRunProducts.insert(doc);
        });
    });
});

Template.scenarioRunCreate.hooks({
    rendered: function() {
        $('.ui.form.scenarioRunCreate')
            .form({
                fields: {
                    name: {
                        identifier: 'name',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please enter a Scenario run name'
                        }]
                    },
                    runDescription: {
                        identifier: 'runDescription',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please enter a description'
                        }]
                    },
                }
            });
    }
});

// Template.reactiveTable.hooks({
//     rendered: function() {
//         $('.ui.checkbox').checkbox();
//     }
// });

Template.scenarioRunCreateSummary.helpers({
    productsCount: function() {
        return scenarioRunProducts.find({delisted:{$not:true}}).count();
    },
    quantitySum : function (){
        var products = scenarioRunProducts.find({delisted:{$not:true}}).fetch();
        return _.reduce(products, function(quantityTotal, product){return quantityTotal + product.quantity; }, 0);
    },
    salesSum: function (){
        var products = scenarioRunProducts.find({delisted:{$not:true}}).fetch();        
        return _.reduce(products, function(salesTotal, product){ return salesTotal + product.sales;}, 0);        
    },
    priceAverage: function (){
        var products = scenarioRunProducts.find({delisted:{$not:true}}).fetch(),       
         sales = _.reduce(products, function(priceTotal, product){ return priceTotal + product.sales;}, 0),
         quantity = _.reduce(products, function(quantityTotal, product){return quantityTotal + product.quantity; }, 0);
        return sales/quantity;
    },
    delistCount: function (){
        return scenarioRunProducts.find({delisted: true}).count()
    },
    npdCount: function (){
        return scenarioRunProducts.find({npd: true}).count()
    }
});

Template.newPriceElement.helpers({
    disableIfDelisted: function() {
        if (this.delisted) 
            return "disabled";
    },
});

Template.scenarioRunCreateTable.helpers({
    settings: function() {
        return {
            collection: scenarioRunProducts,
            rowsPerPage: 20,
            showFilter: false,
            showNavigation: 'auto',
            showRowCount: true,
            fields: [{
                key: 'tpn',
                label: "TPN",
                headerClass: 'center aligned collapsing point',
                tmpl: Template.tpnElement
            }, {
                key: 'description',
                label: "Description",
                headerClass: 'left aligned',
                sortable: false,
                tmpl: Template.descriptionElement
            }, {
                key: 'quantity',
                label: "QTY",
                headerClass: 'center aligned collapsing point',
                tmpl: Template.quantityElement
            }, {
                key: 'sales',
                label: "Sales",
                headerClass: 'center aligned collapsing point',
                tmpl: Template.salesElement,
                sortOrder: 1,
                sortDirection: 'descending'
            }, {
                key: 'price',
                label: "Current Price",
                headerClass: 'center aligned collapsing point',                
                tmpl: Template.currentPriceElement
            }, {
                key: 'new_price',
                label: "New Price",
                headerClass: 'center aligned collapsing point',                
                tmpl: Template.newPriceElement
            }, {
                key: 'delisted',
                label: "Delisted",
                headerClass: 'center aligned collapsing point',                
                tmpl: Template.delistedElement
            }]
        };
    }
});

