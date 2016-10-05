
function cleanData(data, bra){
	var keys = data.headers;
	var new_data = [];
	data.data.forEach(function(row){
		aux = {}
		for(var i=0; i<keys.length; i++){
			if(keys[i] == 'bra_id'){
				aux['location_name'] = bra[row[i]].name;
				switch(row[i].length){
					case 1: aux['region'] = bra[row[i]].name;
						break;
					case 3: aux['state'] = bra[row[i]].name;
						break;
					case 5: aux['mesorregion'] = bra[row[i]].name;
						break;
					case 7: aux['microrregion'] = bra[row[i]].name;
						break;
					case 9: aux['municipality'] = bra[row[i]].name; 
						break;		
				}
			}

			aux[keys[i]] = row[i];
		}	
		new_data.push(aux);	
	});
	return new_data;
}

function stacked(url, bra){
	d3.json(url, function(data) {
		data = cleanData(data, bra);

		var visualization = d3plus.viz()
			.container("#viz1")  // container DIV to hold the visualization
			.data(data)  // data to use with the visualization
			.type("stacked")    // visualization type
			.id("bra_id")         // key for which our data is unique on
			.width(1500)
			.height(700)
			.text("location_name")       // key to use for display text
			.y("enrolled")         // key to use for y-axis
			.x("year")          // key to use for x-axis
			.time("year")       // key to use for time
			.color("bra_id")
			.depth(0)
			.ui([
		      {
		        "method" : "y",
		        "value"  : [ "enrolled" , "num_schools", "classes" ]
		      }
		    ])
			.draw()

			$('#downloadcsv').on('click', function(){
				visualization.csv(true);
			}).show();

	});
}

deza.requireAttrs(['bra'], function(){
	var url='/graphs/dataviva/sc/?depth=3'
	stacked(url , deza.bra);
	$('#lmenu').change(function(){
		$("#downloadcsv").prop('click', null).off('click')
		$('#viz1 div')[0].remove();
		url = '/graphs/dataviva/sc/?depth=' + $('#lmenu input:checked')[0].value
		stacked(url , deza.bra);
	});	
});
