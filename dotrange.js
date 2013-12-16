var dotrange = function(){

  var dotrange = { 
    _options: {
      ele: "body",
      dataset: [0],
      targetData: 0,
      width: 800,
      height: 60,
      padding: 20,
      rangeHeight: 4,
      rangeWidth: 720
    }
  };
  var _extend =  function(destination, source) {
      for (var property in source) {
        destination[property] = source[property];
      }
      return destination;
    };

  var _xscale = function(options){
    return d3.scale.linear()
    .domain([0, d3.max(options.dataset)])
    .range([0, options.rangeWidth]); 
  };

  var _rangeSVG = function(options){
    return d3.select(options.ele)
    .append("svg")
    .attr({
      width: options.width,
      height: options.height
    }); 
  };

  var _rangeLine = function(options, svg){
    return svg.append("line")
    .classed("range-line", true)
    .attr({
      "x1": options.padding,
      "y1": options.height/2,
      "x2": options.rangeWidth + options.padding,
      "y2": options.height/2,
      "stroke": "#8EC2F5",
      "stroke-width": options.rangeHeight
    }); 
  }; 


  dotrange.normal = function(options){ 

    var op = _extend(this._options, options);

    var xscale = _xscale(op);
    var rangeSVG = _rangeSVG(op);
    var rangeLine = _rangeLine(op, rangeSVG);


    rangeSVG.selectAll(".range-circle-outer")
    .data(op.dataset)
    .enter()
    .append("circle")
    .classed("range-circle-outer", true)
    .attr({
      "cx": function(d, i){
        return xscale(d) + op.padding;
      },
      "cy": op.height/2,
      "r": function(d, i){
        return 6;
      },
      "fill": "white",
      "stroke": "#4499ee",
      "stroke-width": "1"
    });

    rangeSVG.selectAll(".range-circle-inner")
    .data(op.dataset)
    .enter()
    .append("circle")
    .classed("range-circle-inner", true)
    .attr({
      "cx": function(d) {
        return xscale(d) + op.padding;
      },
      "cy": op.height/2,
      "r": function(d, i){
        return 4;
      },
      "fill": "#4499ee"
    });

    rangeSVG.selectAll("text")
    .data(op.dataset)
    .enter()
    .append("text")
    .text(function(d){
      return d;
    })
    .attr({
      "x": function(d, i){
        if (xscale(d) == 0) {
          return xscale(d) + op.padding - 5;
        }
        else { 
          return xscale(d) + op.padding - 15;
        }
      },
      "y": op.height/2 + 25
    });

    var targetX = xscale(op.targetData) + op.padding;
    rangeSVG.append("polyline")
    .attr({
      "points": (targetX - 7) + "," + (op.height/2 - 10) + " " + 
        (targetX + 7) + "," + (op.height/2 - 10) + " " +
        (targetX + 7) + "," + (op.height/2 - 6) + " " + 
        (targetX) + "," + (op.height/2 - 2) + " " +
        (targetX - 7) + "," + (op.height/2 - 6) + " " + 
        (targetX - 7) + "," + (op.height/2 - 10),
      "fill": "#ff8c05",
    });
  };

  return dotrange;
}();
