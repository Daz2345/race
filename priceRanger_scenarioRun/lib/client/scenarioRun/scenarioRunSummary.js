Template.scenarioRunSummary.helpers({
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