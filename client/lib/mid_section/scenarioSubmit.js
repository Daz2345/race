Template.scenarioSubmit.hooks({
  rendered: function () {
    var modal = $(this.firstNode);

    modal.modal({
      detachable: false,
      onApprove: function () {
        // Never close modals automatically, do it explicitly after
        // a successful operation
        console.log("Hello");
        return false;
      },
    //   onHidden: function () {
    //     // Get the outer modal view
    //     var parent_view = Blaze.getView(this).templateInstance().parent().view;
        
    //     // Destroy modal after hide transition
    //     Blaze.remove(parent_view);
    //   }
    });
  }
});