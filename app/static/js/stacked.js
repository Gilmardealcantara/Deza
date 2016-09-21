
var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 200},
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


//d3.json("/graphs/data?graph=data_sc.json")
d3.json("/graphs/dataviva")
  	.header("X-Requested-With", "XMLHttpRequest")
    .get(function(error, data){
    	if (error) throw error;

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
    });
