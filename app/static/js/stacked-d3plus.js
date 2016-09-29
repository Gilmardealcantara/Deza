
function cleanData(data){
	var keys = data.headers;
	var new_data = [];
	data.data.forEach(function(row){
		aux = {}
		for(var i=0; i<keys.length; i++){
			aux[keys[i]] = row[i];
		}	
		new_data.push(aux);	
	});
	return new_data;
}

	d3.json("/graphs/dataviva/sc/?depth=3", function(data) {
		data = cleanData(data);
	// instantiate d3plus
	var visualization = d3plus.viz()
		.container("#viz")  // container DIV to hold the visualization
		.data(data)  // data to use with the visualization
		.type("stacked")    // visualization type
		.id("bra_id")         // key for which our data is unique on
		.width(1500)
		.height(700)
		.text("bra_id")       // key to use for display text
		.y("num_schools")         // key to use for y-axis
		.x("year")          // key to use for x-axis
		.time("year")       // key to use for time
		.draw() 

});
