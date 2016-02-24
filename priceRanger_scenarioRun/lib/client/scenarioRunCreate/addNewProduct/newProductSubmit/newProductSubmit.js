var newProductSubmitModalForm;

Template.newProductSubmitModal.hooks({
  rendered: function() {
    createError('tpnPrompt', undefined);
    createError('performancePrompt', undefined);
    createError('pricePrompt', undefined);
    Session.set('plural',"");

    newProductSubmitModalForm = $('.ui.form.newProductSubmit.submit');

    $('.ui.radio.checkbox').checkbox();
    $('.tabular.menu .item').tab();
    $('.ui.dropdown.similar').dropdown({maxSelections: 3});

    var modal = $(this.firstNode);

    modal.modal({
      detachable: false,
      onDeny: function() {
        newProductSubmitModal.form('clear');
        return true;
      },
      onApprove: function() {
        if ($('.ui.top.attached.tabular.menu .item.active').html() === "Single") {

          var performanceVal = $( "input:checked" ).val();

          if (newProductSubmitModalForm.form('get value', 'price') != "" && performanceVal != "") {

            Session.set('performancePrompt', undefined);
            Session.set('pricePrompt', undefined);
            Session.set('validationErrors', 0);

            var tpnVal = scenarioRunProducts.find({npd:true}).count() + 100;

            var similarTPNS = newProductSubmitModalForm.form('get value', 'similarProducts');
            for(var i=0; i<similarTPNS.length;i++) similarTPNS[i] = parseInt(similarTPNS[i], 10);
            
            var product = {
              tpn: parseInt(tpnVal, 10),
              description: newProductSubmitModalForm.form('get value', 'description'),
              similar: similarTPNS,
              new_price: parseFloat(newProductSubmitModalForm.form('get value', 'price')).toFixed(2),
              performance: performanceVal,
              sales: 0,
              price: 0,
              quantity: 0,
              npd: true
            };

            scenarioRunProducts.insert(product);

            newProductSubmitModalForm.form('clear');
            
            return true;
            
          }
          else {
            if (performanceVal === undefined) 
              createError('performancePrompt', "<li>Please select an expected performance</li>");
            
            if (newProductSubmitModalForm.form('get value', 'price') == "") 
              createError('pricePrompt', "<li>Please enter a price</li>");
            
            return false;
            
          }
        }
        else {
          var inputProducts = $('.inputProducts').val(),
              productsObj = Papa.parse(inputProducts, {header: true, dynamicTyping: true}).data,
              products = scenarioRunProducts.find().fetch();

          function insertProduct(element, index, list) {

            tpnVal = scenarioRunProducts.find({
              "npd": true
            }).count() + 100;

            var similarVal = [];
            
            // to be checked if it works
            for (var i = 1; i < 4; i++) {
              if (element.Substitute + i !== "")
                if (_.contains(products, element.Substitute + i)) {
                  similarVal.push(element.Substitute + i);
                }
            }

            var product = {
              tpn: tpnVal,
              description: element.Description,
              similar: similarVal,
              new_price: parseFloat(element.Price),
              performance: element.Performance.toUpperCase(),
              sales: 0,
              price: 0,
              quantity: 0,
              npd: true
            };
            scenarioRunProducts.insert(product);
          }
          
          productsObj.forEach(insertProduct);
          $('.ui.form.bulkNewProductSubmit.submit').form('clear');
          $('.inputProducts').val('Description,Performance,Price,Substitute1,Substitute2,Substitute3');
          return true;
          
        }
      }
    });
  }
});

Template.newProductForm.helpers({
  products: function() {
      return scenarioRunProducts.find({delisted:{$not:true}},{sort:{sales:-1}});
  },
  performanceError: function() {
    return Session.get('performancePrompt');
  },
  performanceShowError: function() {
    if (Session.get('performancePrompt') !== undefined) {
      return 'error';
    }
  },
  priceError: function() {
    return Session.get('pricePrompt');
  },
  priceShowError: function() {
    if (Session.get('pricePrompt') !== undefined) {
      return 'error';
    }
  },
  validationErrorsVal: function() {
    return Session.get('validationErrors') > 0;
  }
});

Template.newProductSubmitModal.helpers({
  plural: function(){
    return Session.get('plural');
  }
});


Template.newProductSubmitModal.events({
  'keyup #price': function(event) {
    event.preventDefault();
    var price = newProductSubmitModalForm.form('get value', 'price');
    (isNaN(price) || price == '') ? createError('pricePrompt', "<li>Please enter a price</li>"): createError('pricePrompt', undefined);
  },
  'click #performance': function(event) {
    event.preventDefault();
    if ($('.ui.checkbox').checkbox('is checked')) {
      createError('performancePrompt', undefined);
    }
  },
  'click .item': function(event) {
    event.preventDefault();
    if ($('.ui.top.attached.tabular.menu .item.active').html() === "Single") {
      Session.set('plural',"");      
    } else {
      Session.set('plural',"s");    
    }
  }
});

function errorCount() {
  var errorPerformance = Session.get('performancePrompt') != undefined,
    errorPrice = Session.get('pricePrompt') != undefined;

  Session.set('validationErrors', errorPerformance + errorPrice);
}

function createError(errorVar, errorVal) {
  if (Session.get(errorVar) !== errorVal) {
    Session.set(errorVar, errorVal);
    errorCount();
  }
}