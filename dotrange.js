var dotrange = {};

dotrange.init = function(ele, dataset, targetData){
  var svgWidth = 800;
  var rangeWidth = 760;
  var svgHeight = 20;
  var rangeHeight = 4;
  var padding = 20;

  var xscale = d3.scale.linear()
                 .domain([0, d3.max(dataset)])
                 .range([0, rangeWidth]);

  var rangeSVG = d3.select(ele).append("svg");
  var rangeLine = rangeSVG.append("line")
                          .classed("range-line", true)
                          .attr({
                            "x1": padding,
                            "y1": svgHeight/2,
                            "x2": rangeWidth + padding,
                            "y2": svgHeight/2,
                            "stroke": "#8EC2F5",
                            "stroke-width": rangeHeight
                          });

  rangeSVG.selectAll(".range-circle-outer")
          .data(dataset)
          .enter()
          .append("circle")
          .classed("range-circle-outer", true)
          .attr({
            "cx": function(d, i){
              return xscale(d) + padding;
            },
            "cy": svgHeight/2,
            "r": function(d, i){
              return 6;
            },
            "fill": "white",
            "stroke": "#4499ee",
            "stroke-width": "1"
          });

  rangeSVG.selectAll(".range-circle-inner")
          .data(dataset)
          .enter()
          .append("circle")
          .classed("range-circle-inner", true)
          .attr({
            "cx": function(d) {
              return xscale(d) + padding;
            },
            "cy": svgHeight/2,
            "r": function(d, i){
              return 4;
            },
            "fill": "#4499ee"
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
              if (xscale(d) == 0) {
                return xscale(d) + padding - 5;
              }
              else { 
                return xscale(d) + padding - 15;
              }
            },
            "y": svgHeight/2 + 25
          });

  var targetX = xscale(targetData);
  rangeSVG.append("polyline")
          .attr({
            "points": targetX + ",2 " + 
                      (targetX + 14) + ",2 " + 
                      (targetX + 14) + ",6 " + 
                      (targetX + 7) + ",10 " +
                      targetX + ",6 " + 
                      targetX + ",2",
            "fill": "#ff8c05",
          });
} 
