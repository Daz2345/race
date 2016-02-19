// Template.scenarioRunBody.helpers({
//     products: function() {
//         var runIdVal = FlowRouter.getParam("runId"),
//             scenarioIdVal = FlowRouter.getParam("scenarioId"),
//             allProducts = ScenarioRuns.findOne({
//                 _id: runIdVal,
//                 scenarioId: scenarioIdVal
//             }).products;
//             // odds = _.reject(allProducts, function(product){ return product.delisted === true; });    
//         return allProducts;
//     }
// });

Template.delistedElement.helpers({
    delistedVal: function() {
        if (this.delisted) {
            return "x";
        }
    }
});

Template.scenarioRun.helpers({
    isReady: function(sub) {
        if (sub) {
            return FlowRouter.subsReady(sub);
        }
        else {
            return FlowRouter.subsReady();
        }
    }
});

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    CSV += Papa.unparse(arrData, {
            	quotes: false,
            	delimiter: ",",
            	newline: "\r\n"
            });

    // //This condition will generate the Label/Header
    // if (ShowLabel) {
    //     var row = "";
        
    //     //This loop will extract the label from 1st index of on array
    //     for (var index in arrData[0]) {
            
    //         //Now convert each value to string and comma-seprated
    //         row += index + ',';
    //     }

    //     row = row.slice(0, -1);
        
    //     //append Label row with line break
    //     CSV += row + '\r\n';
    // }
    
    // //1st loop is to extract each row
    // for (var i = 0; i < arrData.length; i++) {
    //     row = "";
        
    //     //2nd loop will extract each column and convert it in string comma-seprated
    //     for (var index in arrData[i]) {
    //         row += '"' + arrData[i][index] + '",';
    //     }

    //     row.slice(0, row.length - 1);
        
    //     //add a line break after each row
    //     CSV += row + '\r\n';
    // }

    // if (CSV == '') {        
    //     alert("Invalid data");
    //     return;
    // }   
    
    //Generate a file name
    var fileName = "ScenarioRun_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

Template.exportScenarioRun.events({
    'click .exportScenarioRun': function(event) {
        var runIdVal = FlowRouter.getParam("runId"),
            ScenarioRun = ScenarioRuns.findOne({
                _id: runIdVal
            }),
            exportData = ScenarioRun.products,
            nameFile = ScenarioRun.runName  + '.csv';

        // Papa.unparse()
        JSONToCSVConvertor(exportData, nameFile, true);
    }
});

Template.scenarioRunTable.helpers({
    settings: function() {
        return {
            collection: ScenarioRuns.findOne().products,
            rowsPerPage: 20,
            showFilter: false,
            showNavigation: 'auto',
            showRowCount: true,
            fields: [{
                key: 'tpn',
                label: "TPN",
                headerClass: 'center aligned collapsing point',
                tmpl: Template.tpnElement
            }, {
                key: 'description',
                label: "Description",
                headerClass: 'left aligned',
                sortable: false,
                tmpl: Template.descriptionElement
            }, {
                key: 'quantity',
                label: "QTY",
                headerClass: 'center aligned collapsing point',
                tmpl: Template.quantityElement
            }, {
                key: 'sales',
                label: "Sales",
                headerClass: 'center aligned collapsing point',
                tmpl: Template.salesElement,
                sortOrder: 1,
                sortDirection: 'descending'
            }, {
                key: 'price',
                label: "Current Price",
                headerClass: 'center aligned collapsing point',                
                tmpl: Template.currentPriceElement
            }, {
                key: 'new_price',
                label: "New Price",
                headerClass: 'center aligned collapsing point',                
                tmpl: Template.newPriceElement
            }, {
                key: 'delisted',
                label: "Delisted",
                headerClass: 'center aligned collapsing point',                
                tmpl: Template.delistedElement
            }]
        };
    }
});