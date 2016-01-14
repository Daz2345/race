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
        
        var scenarioForm = document.getElementById('scenarioForm');
        var dateRanges = scenarioForm.elements["dateRange"].value;
        
        readFile(scenarioForm.elements['priceStrat_ce'].files[0], "priceStrat_ce");
        readFile(scenarioForm.elements['priceStrat_de'].files[0], "priceStrat_de");
        readFile(scenarioForm.elements['npEvaluation'].files[0], "npEvaluation");
        readFile(scenarioForm.elements['shelfReview'].files[0], "shelfReview");
        
        var scenario = {
          name : scenarioForm.elements["name"].value,
          dateStart : dateRanges.substring(0,10),
          dateEnd : dateRanges.substring(13,23),
          dateRange: dateRanges,
          description : scenarioForm.elements["description"].value,
          stores : extractListWithHeader("store_code", (scenarioForm.elements["stores"].value.length() > 0) ? scenarioForm.elements["stores"].value : "All"),
          products : extractListWithHeader("tpn", scenarioForm.elements["products"].value),
          priceStrat_ce : Session.get('priceStrat_ce'),
          priceStrat_de : Session.get('priceStrat_de'),
          npEvaluation : Session.get('npEvaluation'),
          shelfReview : Session.get('shelfReview'),
          status : 0,
          createdAt : new Date(),
          createdBy : "Darren",
          runs: 0
        };
        
        console.log(scenario);
        
        Meteor.call('Scenarios.methods.Insert', {
          scenario
        }, (err, res) => {
          if (err) {
            alert(err);
          }
          else {
          scenarioForm.reset();
          return true;  
          }
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

function extractListWithHeader(header, list){
  list = header + "\n" + list;
  return Papa.parse(list, {
      header: true, 
      dynamicTyping: true
  }).data;
}

 function extractList(list){
  return Papa.parse(list, {
      header: true, 
      dynamicTyping: true
  }).data;
}
  
  function readFile(file, keyName) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var dataVal = extractList(e.target.result);
      Session.set(keyName, dataVal);
    };
    reader.readAsText(file);
  }

