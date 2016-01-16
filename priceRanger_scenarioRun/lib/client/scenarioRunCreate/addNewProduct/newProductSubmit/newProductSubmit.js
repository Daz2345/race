Template.newProductSubmitModal.hooks({
  rendered: function () {
    
    $('.ui.radio.checkbox')
      .checkbox();
      
    $('.ui.dropdown.similar')
      .dropdown({
        maxSelections: 3
      });
      
    var modal = $(this.firstNode);

    modal.modal({
      detachable: false,
      onDeny: function(){
          $('.ui.form.newProductSubmit.submit')
              .form('reset');
          return true;
      },
      onApprove: function () {
        
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
        
        $form = $('.ui.form.newProductSubmit.submit')
        
        var product = {
          tpn : $form.form('get value', 'tpn'),
          similar : $form.form('get value', 'similarProducts'),
          performance : performanceVal,
        };
        
        products = scenarioRunProducts.get();
        products.push(product);
        
        scenarioRunProducts.set(products);
        
        $form.form('reset');
        
        return true;
        
      }
    });
  }
});

Template.newProductForm.helpers({
    products: function() {
        return scenarioRunProducts.get();
    }
})