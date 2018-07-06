//*Firstly we set the color of bars
var totalSales = [
    { product: 'Hoodie', sales: 12 , "color" : "green"},
    { product: 'Jacket', sales: 4 ,"color" : "pink"},
    { product: 'Snuggie', sales: 7 ,"color" : "yellow"},
    ];

var svg = d3.select('svg');

var rects = svg.selectAll('rect')
  .data(totalSales);

var maxSales = d3.max(totalSales, function(d, i) {
  return d.sales;
});


main();

function main() { 
  setupCanvasSize();
  appendSvg("body");
//*Now we add the scale for the products and sales
  setupXScale();
  setupYScale();
//*Here we add the axis X Y
  appendXAxis();
  appendYAxis();
  appendChartBars();
  addLegend();
};


function setupCanvasSize() {
    margin = {top: 40, left: 50, bottom: 80 , right: 40};
    width = 450 - margin.left - margin.right;
    height = 600 - margin.top - margin.bottom;
  }
  
function appendSvg(domElement) {
    svg = d3.select(domElement).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
                ;
  }
    
function setupXScale()
  {
    x = d3.scaleBand()
      .rangeRound([0, width])
      .domain(totalSales.map(function(d, i) {
        return d.product;
      }))
  //* Now we add the space between the bars
      .paddingInner(0.20)
  }
  
function setupYScale()
  {
    var maxSales = d3.max(totalSales, function(d, i) {
      return d.sales;
    });
  
    y = d3.scaleLinear()
      .range([height,0])
      .domain([0, maxSales]);    
  }

function appendXAxis() 
  {
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  }

function appendYAxis() 
{
    svg.append("g")   
    .call(d3.axisLeft(y));
}

function appendChartBars()
{
  var rects = svg.selectAll('rect')
    .data(totalSales);

  var newRects = rects.enter();
  newRects.append('rect')
      .attr('x', function(d, i) {
        return x(d.product);
      })
      .attr('y', function(d) {
        return y(d.sales);
      })     
      .attr('height', function(d, i) {
        return height - y(d.sales);
      })
      .attr('width', x.bandwidth) 
      //* We change the colors
      .style("fill", function(d) {return d.color});     
      ;
}
  //*We add now a legend
function addLegend()  {

    var legend = svg.selectAll(".legend")
      .data(totalSales.slice())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) { return "translate(0," + i * 15 + ")"; });
  
    legend.append("rect")
      .attr("x", 300)
      .attr("width", 10)
      .attr("height", 15)
      .style("fill", function (d) {return d.color});
    
    legend.append("text")
      .attr("x", 270)
      .attr("y", 7)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function (d) { return d.product; });
    } 
