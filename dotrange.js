
var dataset = [0, 9000, 21000, 60000, 100000]
var dotrange = {};

dotrange.init = function(ele, dataset){
  var svgWidth = rangeWidth = 500;
  var svgHeight = 20;
  var rangeHeight = 4;

  var xscale = d3.scale.linear()
                 .domain([0, d3.max(dataset)])
                 .range([0, rangeWidth]);

  var rangeSVG = d3.select(ele).append("svg");
  var rangeLine = rangeSVG.append("line")
                          .classed("range-line", true)
                          .attr("x1", 0)
                          .attr("y1", (svgHeight/2))
                          .attr("x2", rangeWidth)
                          .attr("y2", (svgHeight/2))
                          .attr("stroke-width", rangeHeight);

  rangeSVG.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .classed("range-cicle", true)
    .attr({
      "cx": function(d, i){
        return i*100 + 50;
      },
      "cy": svgHeight/2,
      "r": function(d, i){
        return i;
      },
      "fill": "yellow",
      "stroke": "orange",
      "stroke-width": function(d){
        return d/10000 + 3;
      }
    });

  rangeSVG.selectAll("text")
          .data(dataset)
          .enter()
          .append("text")
          .text(function(d){
            return d;
          })
          .attr({
            "x": function(d, i){
              return i*100 + 25;
            },
            "y": svgHeight/2 + 25
          });

  rangeSVG.append("polygon")
          .attr({
            "points": "200,5 220,5 210,10",
            "fill": "red",
            "stroke": "blue",
            "stroke-width": 1
          });
}

dotrange.init("body", dataset);
