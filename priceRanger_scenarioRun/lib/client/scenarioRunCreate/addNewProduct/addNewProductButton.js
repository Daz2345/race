Template.addNewProductButton.events({
    'click .addNewProductButton': function(e) {
        $('.ui.form.newProductSubmit.submit')
            .form('reset');
        
        $('.ui.modal.newProductSubmitModal')
            .modal('show');
    }
});