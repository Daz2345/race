Template.scenarioSubmit.hooks({
  rendered: function () {
    
    $('.scenarioSubmit').remove();
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
    
    
    $('.ui.radio.checkbox')
      .checkbox()
    ;
    
    var modal = $(this.firstNode);

    modal.modal({
      detachable: false,
      onDeny: function(){
          var scenarioForm = document.getElementById('scenarioForm');
          scenarioForm.reset();
          return true;
      },
      onApprove: function () {
        
        var scenarioForm = document.getElementById('scenarioForm'),
         dateRanges = scenarioForm.elements["dateRange"].value,
         storesVal, priceStrat_ceVal, priceStrat_deVal, npEvaluationVal, shelfReviewVal, scenarioObj;
         
        if (scenarioForm.elements["stores"].value.length > 0) {
          storesVal = extractListWithCustomHeader("store_code", scenarioForm.elements["stores"].value);
        } else {
          storesVal = "All";
        }
        
        readFile(scenarioForm.elements['priceStrat_ce'].files[0], function(e) {
          priceStrat_ceVal = extractList(e.target.result);

          readFile(scenarioForm.elements['priceStrat_de'].files[0], function(e) {
            priceStrat_deVal = extractList(e.target.result);

            readFile(scenarioForm.elements['npEvaluation'].files[0], function(e) {
              npEvaluationVal = extractList(e.target.result);

              readFile(scenarioForm.elements['shelfReview'].files[0], function(e) {
                shelfReviewVal = extractList(e.target.result);

                scenarioObj = {
                  name: scenarioForm.elements["name"].value,
                  dateStart: dateRanges.substring(0, 10),
                  dateEnd: dateRanges.substring(13, 23),
                  dateRange: dateRanges,
                  description: scenarioForm.elements["description"].value,
                  stores: storesVal,
                  products: extractListWithCustomHeader("tpn", scenarioForm.elements["products"].value),
                  priceStrat_ce: priceStrat_ceVal,
                  priceStrat_de: priceStrat_deVal,
                  npEvaluation: npEvaluationVal,
                  shelfReview: shelfReviewVal
                };

                Meteor.call('Scenarios.methods.insert', scenarioObj, function(err, res){
                  if (err) {
                    Bert.alert(err.reason, 'danger', 'fixed-top' );
                  }
                  else {
                    scenarioForm.reset();
                    FlowRouter.go('/scenarios');            
                    return true;  
                  }
                });                
              });
            });
          });
        });
      }
    });
  }
});

function extractListWithCustomHeader(header, list){
  list = header + "\n" + list;
  return Papa.parse(list, {
      header: true, 
      skipEmptyLines: true,
      dynamicTyping: true
  }).data;
}

 function extractList(list){
  return Papa.parse(list, {
      header: true, 
      skipEmptyLines: true,
      dynamicTyping: true
  }).data;
}
  
  function readFile(file, onLoadCallback) {
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file);
  }

