function WorldMap(mapData, mapOptions) {
    var width = mapOptions.width,
               height = mapOptions.height;
    var baseLines = [];
    var projection = d3.geo.mercator()
        .center([-50, 50])
        .scale(mapOptions.scale)
     .rotate([-180, 0]);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geo.path()
        .projection(projection);

    for (let rec of mapData) {
        baseLines.push(rec.value);
    }
    var myScale2 = d3.scale.linear().
        domain([d3.min(baseLines), d3.max(baseLines)]).
        range([10, 50]);
    myScale2.clamp(true);

    var g = svg.append("g");

    g.selectAll("path")
  .data(topojson.object(world, world.objects.countries)
      .geometries)
  .enter()
  .append("path")
  .attr('fill', 'green')
  .attr("d", path);


    /////////////////////////////////////////////////
    g.selectAll("circle")
         .data(mapData)
         .enter()
         .append("a")
                    .attr("xlink:href", function (d) {
                        var key = d.key;
                        var langlong = key.split(';');
                        return "/Home/Detail?latlong=" + langlong[0] + "&delType=" + langlong[1];
                    }
                    )
         .append("circle")
         .attr("cx", function (d) {
             var key = d.key;
             var langlong = key.split(';');
             var latlong = langlong[0].split(',');
             var lat = latlong[0];
             var long = latlong[1];
             return projection([long, lat])[0];
         })
         .attr("cy", function (d) {
             var key = d.key;
             var langlong = key.split(';');
             var latlong = langlong[0].split(',');
             var lat = latlong[0];
             var long = latlong[1];
             return projection([long, lat])[1];
         })
         .attr("r", function (d) {
             return myScale2(d.value);
         })
        .style("fill-opacity", 0.2)
        .style("fill", function (d) {
            var key = d.key;
            var langlong = key.split(';');
            var delType = langlong[1];
            if (delType == "Subcontract") {
                return "red";
            }
            else {
                return "blue";
            }

        });

    ////////////////////////////////////////////////////
    //World Map Legend
    var color_domain = ['#FF0000', '#0000FF'];
    var legend_labels = ["Sub Contract", "Self Delivery"]

    var legend = svg.selectAll("g.legend")
  .data(color_domain)
  .enter().append("g")
  .attr("class", "legend");

    var ls_w = 30, ls_h = 30;

    legend.append("rect")
    .attr("x", 1320)
    .attr("y", function (d, i) { return height - (i * ls_h) - 22 * ls_h; })
    .attr("width", ls_w)
    .attr("height", ls_h)
    .style("fill", function (d, i) { return color_domain[i]; })
    .style("opacity", 0.8);

    legend.append("text")
    .attr("x", 1360)
    .attr("y", function (d, i) { return height - (i * ls_h) - ls_h - 610; })
    .text(function (d, i) { return legend_labels[i]; });

    /////////////////////////////////////////////////
    /////////////// Zoom /////////////////////////////


};
