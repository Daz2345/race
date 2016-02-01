var newProductSubmitModalForm;

Template.newProductSubmitModal.hooks({
  rendered: function() {
    createError('tpnPrompt', undefined);
    createError('performancePrompt', undefined);
    createError('pricePrompt', undefined);

    newProductSubmitModalForm = $('.ui.form.newProductSubmit.submit');

    $('.ui.radio.checkbox')
      .checkbox();

    $('.tabular.menu .item')
      .tab();

    $('.ui.dropdown.similar')
      .dropdown({
        maxSelections: 3
      });

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
          // if ($('.ui.checkbox.low').checkbox('is checked')) {
          //   performanceVal = "LOW";
          // }
          // if ($('.ui.checkbox.medium').checkbox('is checked')) {
          //   performanceVal = "MEDIUM";
          // }
          // if ($('.ui.checkbox.high').checkbox('is checked')) {
          //   performanceVal = "HIGH";
          // }

  console.log(performanceVal);

          if (newProductSubmitModalForm.form('get value', 'price') != "" && performanceVal != "") {

            Session.set('performancePrompt', undefined);
            Session.set('pricePrompt', undefined);
            Session.set('validationErrors', 0);

            var products = scenarioRunProducts.get(),
              tpnVal = _.where(products, {
                "npd": true
              }).length + 100;

            var similarTPNS = newProductSubmitModalForm.form('get value', 'similarProducts');
            for(var i=0; i<similarTPNS.length;i++) similarTPNS[i] = parseInt(similarTPNS[i], 10);
            
            
            var product = {
              tpn: parseInt(tpnVal, 10),
              description: newProductSubmitModalForm.form('get value', 'description'),
              similar: similarTPNS,
              new_price: parseFloat(newProductSubmitModalForm.form('get value', 'price')),
              performance: performanceVal,
              sales: 0,
              price: 0,
              quantity: 0,
              npd: true
            };

            products.push(product);
            var productsSorted = _.sortBy(products, 'sales');

            scenarioRunProducts.set(productsSorted);
            newProductSubmitModalForm.form('clear');

            return true;
          }
          else {
            if (performanceVal == "") {
              createError('performancePrompt', "<li>Please select an expected performance</li>");
            }

            if (newProductSubmitModalForm.form('get value', 'price') == "") {
              createError('pricePrompt', "<li>Please enter a price</li>");
            }

            return false;
          }
        }
        else {
          var inputProducts = $('.inputProducts').val(),
          productsObj = Papa.parse(inputProducts, {header: true, dynamicTyping: true}).data;

          console.log(inputProducts);
          console.log(productsObj);

          var products = scenarioRunProducts.get()

          function insertProduct(element, index, list) {

            tpnVal = _.where(products, {
              "npd": true
            }).length + 100;

            var similarVal = [];
            
            if (element.Substitute1 !== "")
              similarVal.push(element.Substitute1);

            if (element.Substitute2 !== "")
              similarVal.push(element.Substitute2);

            if (element.Substitute3 !== "")
              similarVal.push(element.Substitute3);
              
            var product = {
              tpn: tpnVal,
              description: element.Description,
              similar: similarVal,
              new_price: element.Price,
              performance: element.Performance,
              sales: 0,
              price: 0,
              quantity: 0,
              npd: true
            };
            products.push(product);

          }

          productsObj.forEach(insertProduct)

          var productsSorted = _.sortBy(products, 'sales');

          scenarioRunProducts.set(productsSorted);
          newProductSubmitModalForm.form('clear');

          return true;

        }
      }
    });
  }
});

Template.newProductForm.helpers({
  products: function() {
    return scenarioRunProducts.get();
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
    if ($('.ui.top.attached.tabular.menu .item.active').html() === "Single") {
      return "";
    } else {
      return "s";
    }
  }
});


Template.newProductSubmitModal.events({
  // 'keyup #tpn, blur #tnp': function(event) {
  //   event.preventDefault();
  //   var tpnVal = parseInt(newProductSubmitModalForm.form('get value', 'tpn'), 10),
  //     productTPNs = _.pluck(scenarioRunProducts.get(), 'tpn');
  //   if (!isNaN(tpnVal)) {
  //     (_.contains(productTPNs, tpnVal)) ? createError('tpnPrompt', '<li>Please enter a tpn that does not already exist in the Scenario</li>') : createError('tpnPrompt', undefined);
  //   }
  // },
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