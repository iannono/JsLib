var dotrange = {};

dotrange.init = function(_options){

  var _extend = function(destination, source) {
                  for (var property in source) {
                    destination[property] = source[property];
                  }
                  return destination;
                }

  var options = {
    ele: "body",
    dataset: [0],
    targetData: 0,
    width: 800,
    height: 60,
    padding: 20,
    rangeHeight: 4
  };
  options = _extend(options, _options);
  options.rangeWidth = options.width - 80;

  var xscale = d3.scale.linear()
                 .domain([0, d3.max(options.dataset)])
                 .range([0, options.rangeWidth]);

  var rangeSVG = d3.select(options.ele)
                   .append("svg")
                   .attr({
                     width: options.width,
                     height: options.height
                   });
  var rangeLine = rangeSVG.append("line")
                          .classed("range-line", true)
                          .attr({
                            "x1": options.padding,
                            "y1": options.height/2,
                            "x2": options.rangeWidth + options.padding,
                            "y2": options.height/2,
                            "stroke": "#8EC2F5",
                            "stroke-width": options.rangeHeight
                          });

  rangeSVG.selectAll(".range-circle-outer")
          .data(options.dataset)
          .enter()
          .append("circle")
          .classed("range-circle-outer", true)
          .attr({
            "cx": function(d, i){
              return xscale(d) + options.padding;
            },
            "cy": options.height/2,
            "r": function(d, i){
              return 6;
            },
            "fill": "white",
            "stroke": "#4499ee",
            "stroke-width": "1"
          });

  rangeSVG.selectAll(".range-circle-inner")
          .data(options.dataset)
          .enter()
          .append("circle")
          .classed("range-circle-inner", true)
          .attr({
            "cx": function(d) {
              return xscale(d) + options.padding;
            },
            "cy": options.height/2,
            "r": function(d, i){
              return 4;
            },
            "fill": "#4499ee"
          });

  rangeSVG.selectAll("text")
          .data(options.dataset)
          .enter()
          .append("text")
          .text(function(d){
            return d;
          })
          .attr({
            "x": function(d, i){
              if (xscale(d) == 0) {
                return xscale(d) + options.padding - 5;
              }
              else { 
                return xscale(d) + options.padding - 15;
              }
            },
            "y": options.height/2 + 25
          });

  var targetX = xscale(options.targetData) + options.padding;
  rangeSVG.append("polyline")
          .attr({
            "points": (targetX - 7) + "," + (options.height/2 - 10) + " " + 
                      (targetX + 7) + "," + (options.height/2 - 10) + " " +
                      (targetX + 7) + "," + (options.height/2 - 6) + " " + 
                      (targetX) + "," + (options.height/2 - 2) + " " +
                      (targetX - 7) + "," + (options.height/2 - 6) + " " + 
                      (targetX - 7) + "," + (options.height/2 - 10),
            "fill": "#ff8c05",
          });
} 
