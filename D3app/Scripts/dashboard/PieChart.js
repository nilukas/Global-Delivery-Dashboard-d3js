function Piechart(chartData, chartOptions, container2) {
    //var piedata = d3.pie()(chartData);
    // d3.select('#' + chartOptions.container).selectAll('svg').remove();
    var width = 400,
    height = 400,
	radius = Math.min(width, height) / 2;

    var container = d3.select('#' + container2).append('svg').data([chartData]).attr('width', width).attr('height', height).append('g').
    attr("transform", "translate(" + width/2 + "," + height/2 + ")");

    //container.append("g")
	//.attr("class", "labelName");
    //container.append("g")
	//.attr("class", "lines");


    var colors = d3.scaleOrdinal()
        .range(d3.schemeCategory20);

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius * 0.8);

    //var outerArc = d3.svg.arc()
	//.innerRadius(radius * 0.9)
	//.outerRadius(radius * 0.9);

    var pie = d3.layout.pie()
       .value(function (d) { return d.baseLine; });

    var g = container
            .selectAll('g.slice')
        .data(pie)
        .enter()
        .append('g')
        .attr("class", "slice");

    g.append('path')
    	.attr('d', arc)
   	 .style('fill', function (d, i) {
   	     return colors(i);
   	 });


    g.append("text")                                                          //add a label to each slice
                .attr("transform", function (d) {                             //set the label's origin to the center of the arc
                                                                              //we have to make sure to set these before calling arc.centroid
                    d.innerRadius = 0;
                    d.outerRadius = 200;
                    return "translate(" + arc.centroid(d) + ")";              //this gives us a pair of coordinates like [50, 50]
                })
            .attr("text-anchor", "middle")                                    //center the text on it's origin
            .text(function (d, i) { return chartData[i].expenseSubGroup; });

    //var text = container.select(".labelName").selectAll("text")
    //   .data(chartData, function (d) { return d.expenseSubGroup });

    //text.enter()
    //       .append("text")
    //       .attr("dy", ".35em")
    //       .text(function (d) {
    //           return (d.expenseSubGroup + ": " + d.baseLine + "%");
    //       });

    //function midAngle(d) {
    //    return d.startAngle + (d.endAngle - d.startAngle) / 2;
    //}


    //text
    //    .transition().duration(1000)
    //    .attrTween("transform", function (d) {
    //        this._current = this._current || d;
    //        var interpolate = d3.interpolate(this._current, d);
    //        this._current = interpolate(0);
    //        return function (t) {
    //            var d2 = interpolate(t);
    //            var pos = outerArc.centroid(d2);
    //            pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
    //            return "translate(" + pos + ")";
    //        };
    //    })
    //    .styleTween("text-anchor", function (d) {
    //        this._current = this._current || d;
    //        var interpolate = d3.interpolate(this._current, d);
    //        this._current = interpolate(0);
    //        return function (t) {
    //            var d2 = interpolate(t);
    //            return midAngle(d2) < Math.PI ? "start" : "end";
    //        };
    //    })
    //    .text(function (d) {
    //        return (d.expenseSubGroup + ": " + d.baseLine + "%");
    //    });


    //text.exit()
    //    .remove();

    //var polyline = container.select(".lines").selectAll("polyline")
    //    .data(chartData, function (d) { return d.expenseSubGroup });

    //polyline.enter()
    //    .append("polyline");

    //polyline.transition().duration(1000)
    //    .attrTween("points", function(d){
    //        this._current = this._current || d;
    //        var interpolate = d3.interpolate(this._current, d);
    //        this._current = interpolate(0);
    //        return function(t) {
    //            var d2 = interpolate(t);
    //            var pos = outerArc.centroid(d2);
    //            pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
    //            return [arc.centroid(d2), outerArc.centroid(d2), pos];
    //        };
    //    });

    //polyline.exit()
    //    .remove();
};
