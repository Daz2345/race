Template.scenarioForm.onRendered(function() {
    this.$('.datetimepicker').daterangepicker({
        format: 'DD/MM/YYYY',
        startDate: moment().subtract(52, 'weeks'),
        endDate: moment(),
        maxDate: moment(),
        opens: 'left',
        ranges: {
           'Last Month': [moment().subtract(1, 'month'), moment()],
           'Last Quarter': [moment().subtract(13, 'weeks'), moment()],
           'Last Half': [moment().subtract(26, 'weeks'), moment()],
           'Last Year': [moment().subtract(1, 'years'), moment()]
        }
    });
});