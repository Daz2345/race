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
        var scenarioRunForm = document.getElementById('scenarioRunCreateForm');

        var ScenarioRunProductsVal = scenarioRunProducts.get()

        var scenarioRunObj = {
          scenarioName : Scenarios.findOne({_id : FlowRouter.getParam("scenarioId")}).name,    
          runName : scenarioRunForm.elements["name"].value,
          description : scenarioRunForm.elements["description"].value,
          products : ScenarioRunProductsVal,
          delisted : _.where(ScenarioRunProductsVal,{delisted : true}).length,
          npd : _.where(ScenarioRunProductsVal,{npd : true}).length
        };

        console.log(scenarioRunObj);
        var routeName = "scenario",
            scenarioId = FlowRouter.getParam("scenarioId"),
            params = {"scenarioId" : scenarioId};  
            
        Meteor.call('ScenarioRuns.methods.insert', scenarioRunObj, scenarioId, function(err, res){
          if (err) {
            alert(err);
          }
          else {
            Meteor.call('Scenarios.methods.increaseRuns', scenarioId, function(err, res){
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
       
        
        }
});

Template.scenarioRunCreateBody.helpers({
    products: function() {
        var productsVal = scenarioRunProducts.get()
        //Need to sort to by sales when available
        return _.sortBy(productsVal, 'tpn');
    }
});

Template.scenarioRunCreate.onCreated(function(){
    scenarioRunProducts = new ReactiveVar(Scenarios.findOne({_id : FlowRouter.getParam("scenarioId")}).products);
})

Template.scenarioRunCreateBody.hooks({
    rendered: function() {
        
        scenarioRunProducts.set(Scenarios.findOne({_id : FlowRouter.getParam("scenarioId")}).products)
        
        $('.ui.checkbox')
            .checkbox({
                onChange: function() {

                    function delistProduct(element, index, list) {
                        if (element.tpn === productTPN) {
                            products[index].delisted = delistVal;
                            products[index].price = scenarioRunProducts.get()[index].price;
                        }
                    }
                    var productTPN = parseInt(this.name, 10),
                        delistVal = $('.ui.checkbox.delist' + this.name).checkbox('is checked'),
                        products = scenarioRunProducts.get();

                    _.each(products, delistProduct);
                    scenarioRunProducts.set(products);
                }
            });
        $(".ui.price").blur(function() {
            function updatePrice(element, index, list) {
                if (element.tpn === productTPN) {
                    products[index].price = priceVal;
                }
            }

            var productTPN = parseInt(this.name, 10);
            var priceVal = $('.price' + this.name).val();
                priceVal = parseFloat(priceVal);
                
            var products = scenarioRunProducts.get();

            console.log(products);
            
            _.each(products, updatePrice);
            scenarioRunProducts.set(products);

        });
    }
});

Template.scenarioRunCreateRow.helpers({
    price: function() {
        if (this.price === undefined) {
            return 0.00;
        }
    },
    disableIfDelisted: function(){
        if (this.delisted) {
            return "disabled";
        }        
    }
});