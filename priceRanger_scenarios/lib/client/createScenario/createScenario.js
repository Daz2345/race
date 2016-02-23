Template.createScenario.events({
    'click .createScenarioButton': function(e) {
        if (!Meteor.user()) {
            Bert.alert("You must be logegd in to create a Scenario", 'danger', 'fixed-top' );
            return false;
        }        
        $('.ui.modal.scenarioSubmitModal')
            .modal('show');
    }
});