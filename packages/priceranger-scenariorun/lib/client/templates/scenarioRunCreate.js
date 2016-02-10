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
    'click .submitScenarioRun': function(e) {
        var scenarioRunForm = document.getElementById('scenarioRunCreateForm'),
            ScenarioRunProductsVal = scenarioRunProducts.get();

        var isValid = $('.ui.form.scenarioRunCreate').form('is valid');

        if (isValid) {
        function productsSetup(element, index, list) {
            // if its not a new product or the the product has not been delisted and it does not have a new price then its simply the same as before
            if (!element.npd && !element.delisted && !element.new_price) {
                element.new_price = element.price;
            }
            if (!element.npd) {
                element.npd = false;
            }
        }

        _.each(ScenarioRunProductsVal, productsSetup);

        var scenarioRunObj = {
            scenarioName: Scenarios.findOne({
                _id: FlowRouter.getParam("scenarioId")
            }).name,
            runName: scenarioRunForm.elements["name"].value,
            description: scenarioRunForm.elements["runDescription"].value,
            products: ScenarioRunProductsVal
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

Template.scenarioRunCreateBody.helpers({
    products: function() {
        return scenarioRunProducts.get();
    }
});

Template.scenarioRunCreate.onCreated(function() {
    FlowRouter.subsReady("liveScenario", function () {
        var ProductsObj = Scenarios.findOne({_id: FlowRouter.getParam("scenarioId")}).products,
            ProductsObjSorted = ProductsObj.sort(function(a, b) {return b.sales - a.sales;});
        
        scenarioRunProducts = new ReactiveVar(ProductsObjSorted);
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
                },
                on: 'blur',
                revalidate: true
            });
    }
});

Template.scenarioRunCreateRow.hooks({
    rendered: function() {
        $('.ui.checkbox')
            .checkbox();
    }
});

Template.scenarioRunCreateFooter.helpers({
    productsCount: function() {
        var products = _.reject(scenarioRunProducts.get(), function(product){ return product.delisted == true; });        
        return products.length;
    },
    quantitySum : function (){
        var products = _.reject(scenarioRunProducts.get(), function(product){ return product.delisted == true; });
        return _.reduce(products, function(quantityTotal, product){return quantityTotal + product.quantity; }, 0);
    },
    salesSum: function (){
        var products = _.reject(scenarioRunProducts.get(), function(product){ return product.delisted == true; });        
        return _.reduce(products, function(salesTotal, product){ return salesTotal + product.sales;}, 0);        
    },
    priceAverage: function (){
        var products = _.reject(scenarioRunProducts.get(), function(product){ return product.delisted == true; }),       
         sales = _.reduce(products, function(priceTotal, product){ return priceTotal + product.sales;}, 0),
         quantity = _.reduce(products, function(quantityTotal, product){return quantityTotal + product.quantity; }, 0);
        return sales/quantity;
    },
    delistCount: function (){
        return _.where(scenarioRunProducts.get(), {delisted: true}).length
    }    
});

Template.scenarioRunCreateBody.hooks({
    rendered: function() {

        $('.ui.checkbox')
            .checkbox({
                onChange: function() {

                    function delistProduct(element, index, list) {
                        if (element.tpn === productTPN) {
                            element.delisted = delistVal;
                        }
                    }
                    var productTPN = parseInt(this.name, 10),
                        delistVal = $('.ui.checkbox.delist' + this.name).checkbox('is checked'),
                        products = scenarioRunProducts.get();

                    _.each(products, delistProduct);
                    scenarioRunProducts.set(products);
                }
            });
        $(".ui.new_price").blur(function() {
            function updatePrice(element, index, list) {
                if (element.tpn === productTPN) {
                    element.new_price = priceVal;
                }
            }

            var productTPN = parseInt(this.name, 10),
                priceVal = $('.new_price' + this.name).val(),
                products = scenarioRunProducts.get();

            priceVal = parseFloat(priceVal);

            _.each(products, updatePrice);


            scenarioRunProducts.set(products);

        });
    }
});

Template.scenarioRunCreateRow.helpers({
    priceVal: function() {
        if (this.price === undefined) {
            return 0.00;
        }
    },
    disableIfDelisted: function() {
        if (this.delisted) {
            return "disabled";
        }
    },
    new_priceVal: function() {
        return (this.new_price === undefined) ? this.price : this.new_price;
    }
});