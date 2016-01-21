var newProductSubmitModalForm;

Template.newProductSubmitModal.hooks({
  rendered: function() {
    Session.set('tpnPrompt', undefined);
    Session.set('performancePrompt', undefined);
    Session.set('pricePrompt', undefined);
    Session.set('validationErrors', 0);
    
    var products = scenarioRunProducts.get();

    newProductSubmitModalForm = $('.ui.form.newProductSubmit.submit');

    $('.ui.radio.checkbox')
      .checkbox();

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

        var performanceVal = "";
        if ($('.ui.checkbox.low').checkbox('is checked')) {
          performanceVal = "low";
        }
        if ($('.ui.checkbox.medium').checkbox('is checked')) {
          performanceVal = "medium";
        }
        if ($('.ui.checkbox.high').checkbox('is checked')) {
          performanceVal = "high";
        }

        var tpnVal = parseInt(newProductSubmitModalForm.form('get value', 'tpn'), 10),
          productTPNs = _.pluck(scenarioRunProducts.get(), 'tpn'),
          tpnExists = _.contains(productTPNs, tpnVal);

        if (newProductSubmitModalForm.form('get value', 'tpn') != "" &&
          newProductSubmitModalForm.form('get value', 'price') != "" &&
          performanceVal != "" &&
          !tpnExists) {

          Session.set('tpnPrompt', undefined);
          Session.set('performancePrompt', undefined);
          Session.set('pricePrompt', undefined);
          Session.set('validationErrors', 0);

          var product = {
            tpn: newProductSubmitModalForm.form('get value', 'tpn'),
            similar: newProductSubmitModalForm.form('get value', 'similarProducts'),
            price: newProductSubmitModalForm.form('get value', 'price'),
            performance: performanceVal,
            npd: true
          };

          products.push(product);
          scenarioRunProducts.set(products);
          $form.form('clear');

          return true;
        }
        else {
          if (performanceVal == "") {
            Session.set('performancePrompt', "<li>Please select an expected performance</li>");
            increaseErrorCount();
          }

          if (newProductSubmitModalForm.form('get value', 'price') == "") {
            Session.set('pricePrompt', "<li>Please enter a price</li>");
            increaseErrorCount();
          }

          if (newProductSubmitModalForm.form('get value', 'tpn') == "") {
            Session.set('tpnPrompt', "<li>Please enter a valid TPN</li>");
            increaseErrorCount();
          }
          return false;
        }
      }
    });
  }
});

Template.newProductForm.helpers({
  products: function() {
    return Scenarios.findOne({
      _id: FlowRouter.getParam("scenarioId")
    }).products;
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
  tpnError: function() {
    return Session.get('tpnPrompt');
  },
  tpnShowError: function() {
    if (Session.get('tpnPrompt') !== undefined) {
      return 'error';
    }
  },
  validationErrorsVal: function() {
    console.log(Session.get('validationErrors'));
    return Session.get('validationErrors') > 0;
  }
});

Template.newProductSubmitModal.events({
  'keyup #tpn, blur #tnp': function(event) {
    event.preventDefault();
    var tpnVal = parseInt(newProductSubmitModalForm.form('get value', 'tpn'), 10),
      productTPNs = _.pluck(scenarioRunProducts.get(), 'tpn');
    if (!isNaN(tpnVal)) {
      if (_.contains(productTPNs, tpnVal)) {
        Session.set('tpnPrompt', '<li>Please enter a tpn that does not already exist in the Scenario</li>');
        increaseErrorCount();
      }
      else {
        Session.set('tpnPrompt', undefined);
        decreaseErrorCount();       
      }
    } else {
        Session.set('tpnPrompt', undefined);
        decreaseErrorCount();       
      }
  },
  'keyup #price': function(event) {
    event.preventDefault();
    var price = newProductSubmitModalForm.form('get value', 'price');
    if (!isNaN(price)) {
      Session.set('pricePrompt', '<li>Please enter a price</li>');
      increaseErrorCount();
    } else {
      Session.set('pricePrompt', undefined);      
      decreaseErrorCount();      
    }
  },
  'click #performance': function(event) {
    event.preventDefault();
    if ($('.ui.checkbox').checkbox('is checked')) {
      Session.set('performancePrompt', undefined);
    }
  }
});

function increaseErrorCount() {
  Session.set('validationErrors', Session.get('validationErrors') + 1); 
}
function decreaseErrorCount() {
  if((Session.get('validationErrors') - 1) < 0) {
    Session.set('validationErrors', 0);
  } else {
  Session.set('validationErrors', Session.get('validationErrors') - 1);
}
}