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
        
        readFile(scenarioForm.elements['priceStrat'].files[0], "priceStrat");
        readFile(scenarioForm.elements['npEvaluation'].files[0], "npEvaluation");
        readFile(scenarioForm.elements['shelfReview'].files[0], "shelfReview");
        
        var scenario = {
          name : scenarioForm.elements["name"].value,
          dateStart : dateRanges.substring(0,10),
          dateEnd : dateRanges.substring(13,23),
          description : scenarioForm.elements["description"].value,
          stores : extractListWithHeader("storeID", scenarioForm.elements["stores"].value),
          products : extractListWithHeader("TPN", scenarioForm.elements["products"].value),
          priceStrat : Session.get('priceStrat'),
          npEvaluation : Session.get('npEvaluation'),
          shelfReview : Session.get('shelfReview'),
          status : 0,
          createdAt : new Date(),
          createdBy : "Darren",
          runs: 0
        };
        
        console.log(scenario);
        
        Scenarios.insert(scenario);
        scenarioForm.reset();
        
        return true;
        
      }
    });
  }
});

Template.layout.events({
    'click .createScenario': function(e) {
        $('.ui.modal.scenario')
            .modal('show');
    }
});

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

