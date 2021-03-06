// @TODO: YOUR CODE HERE!
// read the data from the csv file 

// set up the defalut views for x and y on page load
var xView = "poverty";
var yView = "obesity";

d3.csv(".\\assets\\data\\data.csv").then(function(dataset){
        
        showVisual(dataset, xView, yView); 
        
});

// Create the svg canvas height and width 

var svgHeight = 500;
var svgWidth = 900; 

// margins to move your svg to the down and to the right 

var margin = {
    top: 50, 
    right: 50,
    bottom: 20, 
    left: 50
}

var padding = {
    top: -49,
    right: 19,
    left: 0
}

// Adjust your svg position 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Append svg to the index.html 
var svg = d3.select("#scatter")
          .append("svg")
          .attr("width", width)
          .attr("height", height) 
          .attr("class", "scatter")
          .append("g")
          .attr("tranform", `translate( ${margin.left}, ${margin.top})`);


function showVisual(data, xView, yView){

    data.map(d =>{
       // I've only cleans a small sample of the data. 
       // you will need to handle the rest
        data.poverty = +d[xView];
        data.obesity = +d[yView];
        
    });

 // we need to get the min and max of x & y in the dataset to pass to .domain()
var xValues  = data.map(d => parseFloat(d[xView]));
var yValues  = data.map(d => parseFloat(d[yView])); 


// use extent to grab the min and max of the selected Scale and Axis
var xScale = d3.scaleLinear()
            .domain(d3.extent(xValues))
            .range([margin.right, width+margin.right]);

var yScale = d3.scaleLinear()
            .domain(d3.extent(yValues))
            .range([height-40, margin.top]); 


// Add the x & y Axis
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);


// add the x & y scales to the index.html <svg> tag 
svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", `translate(${padding.top},  ${height - margin.bottom})`)
        .call(xAxis);

svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", `translate(${padding.left}, ${padding.right})`)
        .call(yAxis);

// Create the <circle></circle> element 

var scatter = svg.selectAll("circles")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale( d[xView] ))
            .attr("cy", d => yScale( d[yView] ))
            .attr("r", 10);

            svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", xView)
            .attr("cy", yView)
            .style("fill", function(d) { return color(cValue(d));}) 

            .on("mouseover", function(d) {
                tooltip.transition()
                     .duration(200)
                     .style("opacity", .9);
                tooltip.html(d["poverty"] + "<br/> (" + xValue(d) 
                  + ", " + yValue(d) + ")")
                     .style("left", (d3.event.pageX + 5) + "px")
                     .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                     .duration(500)
                     .style("opacity", 0);
            });

 console.log("data", data[xView]);

}