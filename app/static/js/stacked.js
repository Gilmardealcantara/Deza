//to load
// config references
var stackedConfig = {
    target : 'stacked',
    data_url : '/graphs/data?graph=data_sc.json',
    //data_url : '/graphs/dataviva',
    width: 1700,
    height: 700,
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
var graph = {
	yName: 'Enrolled',
	yIndex: 3
}; // 160000


function init() {
    var spinner = new Spinner(opts).spin(target);
    setTimeout(function() {
        d3.json(stackedConfig.data_url, function(data) {
            spinner.stop();
            new_data = cleanData(data)
            stacked(new_data);
            style();

            $('form').change(function(){
            	$('svg')[0].remove()
            	$('#tooltip')[0].remove()
            	updateGraph();
            	new_data = cleanData(data)
            	stacked(new_data);
            	style();        	
            })
        });
    }, 150);
} 

function updateGraph(){
	var index;
	if($('form input ')[0].checked){ // enrolled
		graph.yIndex = 3;
		graph.yName = 'Enrolled'
	}else if ($('form input ')[1].checked){ // mum schools
		graph.yIndex = 7;
		graph.yName = 'Num Schools'
	}else{ // classes
		graph.yIndex = 2;
		graph.yName = 'Classes'
	}
}

function style(){
   $('.axis .tick text')
        .attr("font-size", "15px")
        .attr("fill", "#666666")
        .attr("font-weight", "normal")
        .attr("font-family", "sans-serif");

    $('.textlayers').attr("fill", "#1d3335");

    $('.axis .tick line').attr("stroke", "#666666")
}

function cleanData(data){
	//trada dados, year e values
   	var aux = {};
   	data.data.forEach(function(row){
		var location = row[6].slice(0,3);
		var year = row[0]
		var enrolled = row[graph.yIndex]

		if(!aux[year]){ 
			aux[year] = {};
			aux[year]['year'] = year;
		}

			if(aux[year][location])
			aux[year][location] += (enrolled);
		else
			aux[year][location] = (enrolled);
	});

   	data = []
	Object.keys(aux).forEach(function(year){
		data.push(aux[year])
	}); // cria lista

	return data;
}

function getMaxY(data){
	var max_sum = 0;
	for (var i=0; i< data.length; i++){
		var aux = 0;
		Object.keys( data[i] )
			.map(function ( key ) { return (key != 'year') ? data[i][key] : 0; })
				.forEach(function(ele){
					aux += ele;
				});

		if(aux > max_sum) max_sum = aux;	
	}
	return max_sum;	
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
	
	var margin = {top: 20, right: 20, bottom: 100, left: 200},
	    width = svg.attr("width") - margin.left - margin.right,
	    height = svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleLinear().range([0, width]),
	    y = d3.scaleLinear().range([height, 0]),
	    z = d3.scaleOrdinal(d3.schemeCategory10);

   	var tip = d3.tip()
		.attr('id', 'tooltip')
		.offset([-5, 0])
		.html(function(d) {
   			return '<p><strong id="title1">Important label Heading</strong></p><p><strong id="title2">Important label Heading</strong></p><p><span id="value1">100</span></p><p><span id="value2">100</span></p>';
  		})

	var stack = d3.stack();

	var area = d3.area()
	    .x(function(d, i) { return x(d.data.year); })
	    .y0(function(d) { return y(d[0]); })
	    .y1(function(d) { return y(d[1]); });

	var g = svg.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	keys = Object.keys(data[0]).slice(1); // esdados

	x.domain(d3.extent	(data, function(d) { return d.year; })); 
	y.domain([0, getMaxY(data)]);
	z.domain(keys);
	stack.keys(keys);

	//antes para as linhas de grade ficarem atraz das camadas
  	g.append("g")
      	.attr("class", "axis axis--x")
      	.attr("transform", "translate(0," + height + ")")
     	.call(d3.axisBottom(x)
     		.ticks(20)
      		.tickSize(-height, 0, 0)
      		.tickFormat(d3.format("d"))
     	);

  	g.append("g")
      	.attr("class", "axis axis--y")
      	.call(d3.axisLeft(y)
      		.ticks(20)
      		.tickSize(-width, 0, 0)
      		//.tickFormat(d3.formatPrefix(".1", 1e6))
      	);

	var layer = g.selectAll(".layer")
	    .data(stack(data))
	    .enter().append("g")
	    .attr("class", "layer")
	    .on("mouseover", function(d, i){
	    	tip.show()
	    	var state = this.textContent,
	   			value = [d[0].data[keys[i]],d[d.length -1].data[keys[i]]],
	    	 	year = [d[0].data.year , d[d.length -1].data.year];
	    	
	    	var htmlListG = $('svg .layer')[i].innerHTML.split('"'),
	    		yValue = htmlListG[htmlListG.indexOf(" y=") + 1];
    		
    		var xPosition = w/2, 
 				yPosition = yValue; 
    		

	    	d3.select("#tooltip")
	    		//.style("left", xPosition + "px" )
	    		//.style("top", yPosition + "px")
	    		.select("#value2")
	    		.text(year[1] + ": " +value[1]);

	    	d3.select("#tooltip")
	    		.select("#value1")
	    		.text(year[0] + ": " + value[0]);

	    	d3.select("#tooltip")
	    		.select("#title1")
	    		.text(state);

	    	d3.select("#tooltip")
	    		.select("#title2")
	    		.text(graph.yName);

	    	//d3.select("#tooltip").classed("hidden", false);
	    	var color = $('.layer .area')[i].style.fill;

	    	$('.layer .area')[i].style.fill = change_color(color, true);	
	    })
	    .on("mouseout", function(d, i){
	    	tip.hidden;
	    	var color = $('.layer .area')[i].style.fill;

	    	$('.layer .area')[i].style.fill = change_color(color, false);	
	    	//d3.select("#tooltip").classed("hidden", true);
	    });
  	

	svg.selectAll('.layer').call(tip);

  	layer.append("path")
      	.attr("class", "area")
      	.style("fill", function(d) { return z(d.key); })
      	.attr("d", area);


  	layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
    	.append("text")
    	.attr("class", "textlayers")
	    .attr("x", width - 50)
	    .attr("y", function(d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
	    .attr("dy", ".35em")
	    .style("font", "10px sans-serif")
	    .style("text-anchor", "end")
	    .text(function(d) { return d.key.slice(1,3).toUpperCase(); 
	    });


    svg.append("text")
        .attr("text-anchor", "middle")  
        .attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)") 
        .attr("font-size", "22px")
        .attr("fill", "#444")
        .attr("font-weight", "normal")
        .attr("font-family", "sans-serif")
        .text(graph.yName);

    svg.append("text")
        .attr("text-anchor", "middle")  
        .attr("transform", "translate("+ (width/2) +","+(height + margin.left/2)+")")
        .attr("font-size", "22px")
        .attr("fill", "#444")
        .attr("font-weight", "normal")
        .attr("font-family", "sans-serif")
        .text("Years");

    layer.call(tip)
}


function change_color(color, darkens){
	var r = (+color.split(',')[0].slice(4));
	var g = (+color.split(',')[1].slice(1));
	var b = (+color.split(',')[2].substr(1,(color.split(',')[2].length -2)));

	if(darkens){
		r = (r - 50 < 0 ) ? 0 : r - 50;	    		
		g = (g - 50 < 0 ) ? 0 : g - 50;
		b = (b - 50 < 0 ) ? 0 : b - 50;
	}else{
		r = (r + 50 > 255 ) ? 255 : r + 50;	    		
		g = (g + 50 > 255 ) ? 255 : g + 50;
		b = (b + 50 > 255 ) ? 255 : b + 50;
	}

	return "rgb("+r+", "+g+", "+b+")"
}