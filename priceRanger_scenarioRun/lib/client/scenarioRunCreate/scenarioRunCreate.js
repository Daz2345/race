Template.scenarioRunCreate.helpers({
    scenario: function() {
        return Scenarios.findOne({_id : FlowRouter.getParam("scenarioId")});
    }
});

Template.scenarioRunCreateBody.helpers({
    products: function() {
        var productsVal = scenarioRunProducts.get()
        //Need to sort to sales when available
        return _.sortBy(productsVal, 'tpn');
    }
});

Template.scenarioRunCreate.onCreated(function() {
    scenarioRunProducts = new ReactiveVar;
    scenarioRunProducts.set(Scenarios.findOne({_id : FlowRouter.getParam("scenarioId")}).products);
});

Template.scenarioRunCreateBody.hooks({
    rendered: function() {
        $('.ui.checkbox')
            .checkbox({
                onChange: function() {

                    function delistProduct(element, index, list) {
                        if (element.tpn === productTPN) {
                            products[index].delisted = delistVal;
                        }
                    }
                    var productTPN = parseInt(this.name, 10),
                        delistVal = $('.ui.checkbox.delist' + this.name).checkbox('is checked'),
                        products = scenarioRunProducts.get();

                    _.each(products, delistProduct);
                    scenarioRunProducts.set(products);
                }
            });
        $("#priceField").blur(function() {
            function updatePrice(element, index, list) {
                if (element.tpn === productTPN) {
                    products[index].price = priceVal;
                }
            }

            var productTPN = parseInt(this.name, 10);
            var priceVal = $('.price' + this.name).val();
                priceVal = parseFloat(priceVal);
            var products = scenarioRunProducts.get();

            _.each(products, updatePrice);
            scenarioRunProducts.set(products);

        });
    }
});

Template.scenarioRunCreateRow.helpers({
    price: function() {
        if (this.price === undefined) {
            return "0.00";
        }
    }
})