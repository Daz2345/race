Template.scenarioSubmit.hooks({
  rendered: function () {
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
                    alert(err);
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

// Template.layout.events({
//     'click .createScenario': function(e) {
//         $('.ui.modal.scenario')
//             .modal('show');
//     }
// });

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

