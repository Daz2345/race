Template.addNewProductButton.events({
    'click .addNewProductButton': function(e) {
        $('.ui.form.newProductSubmit.submit')
            .form('clear');
        
        $('.ui.modal.newProductSubmitModal')
            .modal('show');
    }
});