//to load
// config references
var stackedConfig = {
    target : 'stacked',
    ///graphs/data?graph=data_sc.json
    data_url : '/graphs/dataviva',
    width: 1700,
    height: 800,
    val: 90
};

// loader settings
var opts = {
  lines: 9, // The number of lines to draw
  length: 9, // The length of each line
  width: 5, // The line thickness
  radius: 14, // The radius of the inner circle
  color: '#EE3124', // #rgb or #rrggbb or array of colors
  speed: 1.9, // Rounds per second
  trail: 40, // Afterglow percentage
  className: 'spinner', // The CSS class to assign to the spinner
};

var target = document.getElementById(stackedConfig.target);

function init() {
    var spinner = new Spinner(opts).spin(target);
    setTimeout(function() {
        d3.json(stackedConfig.data_url, function(data) {
            spinner.stop();
            stacked(data);
        });
    }, 1500);
} 

init();


// graph

function stacked(data){

	var w = stackedConfig.width;
    var h = stackedConfig.height;

	var svg = d3.select('#' + stackedConfig.target)
				.append("svg")
				.attr('width', w)
				.attr('height', h);
	
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = svg.attr("width") - margin.left - margin.right,
	    height = svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleLinear().range([0, width]),
	    y = d3.scaleLinear().range([height, 0]),
	    z = d3.scaleOrdinal(d3.schemeCategory10);

	var stack = d3.stack();

	var area = d3.area()
	    .x(function(d, i) { return x(d.data.year); })
	    .y0(function(d) { return y(d[0]); })
	    .y1(function(d) { return y(d[1]); });

	var g = svg.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	

	//trada dados, year e values
	// indice 6 bra_id, 3 matriculados
   	var aux = {};
   	data.data.forEach(function(row){
		var location = row[6].slice(0,3);
		var year = row[0]
		var enrolled = row[3]

		if(!aux[year]){ 
			aux[year] = {};
			aux[year]['year'] = year;
		}

		if(aux[year][location])
			aux[year][location] += enrolled/10000000;
		else
			aux[year][location] = enrolled/10000000;
	});

   	data = []
	Object.keys(aux).forEach(function(year){
		data.push(aux[year])
	}); // cria lista

	keys = Object.keys(data[0]).slice(1); // esdados

	x.domain(d3.extent(data, function(d) { return d.year; }));
	z.domain(keys);
		stack.keys(keys);

		var layer = g.selectAll(".layer")
	    .data(stack(data))
	    .enter().append("g")
	    .attr("class", "layer");
  	
  	layer.append("path")
      	.attr("class", "area")
      	.style("fill", function(d) { return z(d.key); })
      	.attr("d", area);

  	layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
    	.append("text")
	    .attr("x", width - 6)
	    .attr("y", function(d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
	    .attr("dy", ".35em")
	    .style("font", "10px sans-serif")
	    .style("text-anchor", "end")
	    .text(function(d) { return d.key.slice(1,3).toUpperCase(); });

	y.domain([0, 100000000]);
  	g.append("g")
      	.attr("class", "axis axis--x")
      	.attr("transform", "translate(0," + height + ")")
     	.call(d3.axisBottom(x)
     		.tickFormat(d3.format("d"))
     	);

  	g.append("g")
      	.attr("class", "axis axis--y")
      	.call(d3.axisLeft(y)
      		.ticks(20)
      		.tickFormat(d3.formatPrefix(".1", 1e6))
      	);

}