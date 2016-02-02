Template.priceHeirarchyChart.hooks({
    rendered: function() {
        Tracker.autorun(function(){
        if (currentScenarioRun.get() !== null){

        function delistedProducts(product){
            return product.delisted == true;
        }

        var products = currentScenarioRun.get().products,
            liveProducts = _.reject(products, delistedProducts),
            values = _.pluck(liveProducts, "new_price");

            function draw(w,h,arr,buckets,xax,yax){
            
                //remove
                d3.select("svg").remove();
                
                if(!_.isEmpty(values)) {
                    if(!buckets){
                      buckets = 10;
                    }
                    // A formatter for counts.
                    var formatCount = d3.format(",f");
                    
                    var margin = {top: 10, right: 30, bottom: 40, left: 30},
                        width = w - margin.left - margin.right,
                        height = h - margin.top - margin.bottom;
                    
                    //max
                    var max = Number(d3.max(arr))+1;
                    
                    var x = d3.scale.linear()
                        .domain([0, max])
                        .range([0, width]);
                    
                    var data = d3.layout.histogram()
                          .bins(x.ticks(buckets))
                          (arr);  
                    
                    var y = d3.scale.linear()
                        .domain([0, d3.max(data, function(d) { return d.y; })])
                        .range([height, 0]);
                    
                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .ticks(buckets)
                        .orient("bottom");
                    
                    // Define the div for the tooltip
                    var div = d3.select("body").append("div")	
                        .attr("class", "tooltip")				
                        .style("opacity", 0);
                    
                    var svg = d3.select(".phChart").append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    
                    var bar = svg.selectAll(".bar")
                        .data(data)
                        .enter().append("g")
                        .attr("class", "bar")
                        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
                        // .on("mouseover", function(d) {		
                        //     div.transition()		
                        //         .duration(200)		
                        //         .style("opacity", .9)
                        //         .style("z-index", 20000);		
                        //     div	.html(d.y)	
                        //         .style("left", (d3.event.pageX) + "px")		
                        //         .style("top", (d3.event.pageY) + "px");	
                        //     })					
                        // .on("mouseout", function(d) {		
                        //     div.transition()		
                        //         .duration(500)		
                        //         .style("opacity", 0);	
                        // });
                    
                    bar.append("rect")
                        .attr("x", 1)
                        .attr("width", x(data[0].dx) - 1)
                        .attr("height", function(d) { return height - y(d.y); });
                    
                    bar.append("text")
                        .attr("dy", ".75em")
                        .attr("y", 6)
                        .attr("x", x(data[0].dx) / 2)
                        .attr("text-anchor", "middle")
                        .attr("style","fill:#fff")
                        .text(function(d) { return formatCount(d.y); });
                    
                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);
                    
                    //draw the axis labels
                    svg.append("text")
                                .attr("text-anchor", "middle")
                                .attr("class", "black")
                                .attr("transform", "translate("+ (width/2) +","+(height+40)+")") 
                                .text(xax);
                    
                    svg.append("text")
                                .attr("text-anchor", "middle")
                                .attr("class", "black")
                                .attr("transform", "translate("+ (-10) +","+(height/2)+")rotate(-90)")
                                .text(yax);
                }
            }
            draw(480,240,values,5,"Price Bands","TPN Count");
              
        }
    });
    }
});

Template.priceHeirarchyChart.helpers({
    phChartCSS: function() {
        return phChartCSS.get();
    },
    currentScenarioRunName: function(){
        if (currentScenarioRun.get() !== null){
            return currentScenarioRun.get().runName;
        }
    }
});

Template.priceHeirarchyChart.events({
    'click .closeme' : function(e) {
        if (phChartShow.get()) {
            phChartCSS.set("display:none;");
            currentScenarioRun.set(null);  
            phChartShow.set(false);
            //remove chart
            d3.select("svg").remove();  
        }
    }    
});