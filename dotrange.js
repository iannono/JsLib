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
    }
  };

  var _extend =  function(destination, source) {
      for (var property in source) {
        destination[property] = source[property];
      }
      destination.rangeWidth = destination.width - 80;
      return destination;
    };

  var _xscale_nor = function(options){
    return d3.scale.linear()
    .domain([d3.min(options.dataset), d3.max(options.dataset)])
    .range([0, options.rangeWidth]); 
  };

  var _xscale_mid3 = function(options){
    return d3.scale.linear()
    .domain([d3.min(options.dataset), d3.max(options.dataset)])
    .range([0, options.rangeWidth]); 
  };

  var _parse_to_section = function(type, target, data) { 
    console.log(data);
    var result = "";
    if(type == "middle3") { 
      if(target <= data[0]) result = "低";
      if(target == data[0]) result = "中等";
      if(target > data[0] && target < data[1]) result = "中等偏下";
      if(target > data[1] && target < data[2]) result = "中等偏上";
      if(target > data[2]) result = "高";
    }
    return result;
  }

  var _xscale_mid5 = function(options){
    return d3.scale.linear()
    .domain([d3.min(options.dataset) - d3.max(options.dataset) / 8, d3.max(options.dataset) + d3.max(options.dataset) / 8])
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


  dotrange.middle3 = function(options) {
    var op = _extend(this._options, options);

    var xscale = _xscale_mid3(op);
    var rangeSVG = _rangeSVG(op);
    var rangeLine = _rangeLine(op, rangeSVG); 
    var ds = op.dataset.sort(d3.ascending);
    var mid = low_q = high_q = 0;
    var length = ds.length;

    var m3 = [0, 0, 0];

    m3[0] = d3.quantile(ds, 0.25);
    m3[1] = d3.quantile(ds, 0.5);
    m3[2] = d3.quantile(ds, 0.75);

    console.log(m3[0])
    console.log(m3[1])
    console.log(m3[2])

    var result = _parse_to_section("middle3", op.targetData, m3)

    var ds_text = op.textset || ds; 

    rangeSVG.append("circle")
    .classed("range-circle-start-outer", true)
    .attr({
      "cx": op.padding,
      "cy": op.height/2,
      "r": 6,
      "fill": "white",
      "stroke": "red",
      "stroke-width": "1"
    })

    rangeSVG.append("circle")
    .classed("range-circle-start-inner", true)
    .attr({
      "cx": op.padding,
      "cy": op.height/2,
      "r": 4,
      "fill": "red"
    });
    
    rangeSVG.append("circle")
    .classed("range-circle-end-outer", true)
    .attr({
      "cx": op.padding + op.rangeWidth,
      "cy": op.height/2,
      "r": 6,
      "fill": "white",
      "stroke": "red",
      "stroke-width": "1"
    })

    rangeSVG.append("circle")
    .classed("range-circle-start-inner", true)
    .attr({
      "cx": op.padding + op.rangeWidth,
      "cy": op.height/2,
      "r": 4,
      "fill": "red"
    });

    rangeSVG.selectAll(".range-circle-outer")
    .data(m3)
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
    .data(m3)
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
    .data(m3)
    .enter()
    .append("text")
    .text(function(d){
      return d;
    })
    .attr({
      "x": function(d, i){
        return xscale(d) + op.padding - 20;
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
    rangeSVG.append("text")
    .text(op.targetData)
    .attr({
      "x": targetX - 20,
      "y": op.height/2 + 25
    });

    console.log(result);
    return result;
  }; 

  dotrange.middle5 = function(options) {
    var op = _extend(this._options, options);

    var xscale = _xscale_mid5(op);
    var rangeSVG = _rangeSVG(op);
    var rangeLine = _rangeLine(op, rangeSVG); 
    var ds = op.dataset.sort(d3.ascending);
    console.log(ds);
    console.log(d3.quantile(ds, 0.5))
    console.log(d3.quantile(ds, 0.25))
    console.log(d3.quantile(ds, 0.75))


    var d5 = [0, 0, 0, 0, 0];

    d5[0] = d3.min(op.dataset);
    d5[1] = d3.quantile(ds, 0.25);
    d5[2] = d3.quantile(ds, 0.5);
    d5[3] = d3.quantile(ds, 0.75);
    d5[4] = d3.max(op.dataset);

    var ds_text = op.textset || ds; 

    rangeSVG.append("circle")
    .classed("range-circle-start-outer", true)
    .attr({
      "cx": op.padding,
      "cy": op.height/2,
      "r": 6,
      "fill": "white",
      "stroke": "red",
      "stroke-width": "1"
    })
    rangeSVG.append("circle")
    .classed("range-circle-start-inner", true)
    .attr({
      "cx": op.padding,
      "cy": op.height/2,
      "r": 4,
      "fill": "red"
    });
    
    rangeSVG.append("circle")
    .classed("range-circle-end-outer", true)
    .attr({
      "cx": op.padding + op.rangeWidth,
      "cy": op.height/2,
      "r": 6,
      "fill": "white",
      "stroke": "red",
      "stroke-width": "1"
    })
    rangeSVG.append("circle")
    .classed("range-circle-start-inner", true)
    .attr({
      "cx": op.padding + op.rangeWidth,
      "cy": op.height/2,
      "r": 4,
      "fill": "red"
    });

    rangeSVG.selectAll(".range-circle-outer")
    .data(d5)
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
    .data(d5)
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
    .data(d5)
    .enter()
    .append("text")
    .text(function(d, i){
      return ds_text[i];
    })
    .attr({
      "x": function(d, i){
        if (xscale(d) == 0) {
          return xscale(d) + op.padding - 15;
        }
        else { 
          return xscale(d) + op.padding - 15;
        }
      },
      "y": function(d, i){
        if (i % 2 === 0) {
          return op.height/2 - 10 
        }
        else {
          return op.height/2 + 25 
        }
      }
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

  dotrange.normal = function(options){ 

    var op = _extend(this._options, options);

    var xscale = _xscale_nor(op);
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
