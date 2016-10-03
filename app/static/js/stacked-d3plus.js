
function loadAttrs(data){
	var new_data = {};
	data.data.forEach(function(row){
		new_data[row.id] = row 
	});
	return new_data;
}

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
			.container("#viz")  // container DIV to hold the visualization
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



d3.json("/graphs/dataviva/bra/", function(bra){
	bra = loadAttrs(bra);
	var url='/graphs/dataviva/sc/?depth=3'
	stacked(url , bra);
	treemap(url , bra);
	$('#lmenu').change(function(){
		$("#downloadcsv").prop('click', null).off('click')
		$('#viz div')[0].remove();
		url = '/graphs/dataviva/sc/?depth=' + $('#lmenu input:checked')[0].value
		stacked(url , bra);
	});	

});






//---------------------------treemap
function cleanData2(data, bra){
	var keys = data.headers;
	var new_data = [];
	data.data.forEach(function(row){
		aux = {}
		for(var i=0; i<keys.length; i++){
			if(keys[i] == 'bra_id'){
				aux['location_name'] = bra[row[i]].name;
				aux['state'] = bra[row[i]].name;
				aux['region'] = bra[row[i][0]].name;
			}

			aux[keys[i]] = row[i];
		}	
		new_data.push(aux);	
	});
	return new_data;
}



function treemap(url, bra){ // so estados
	d3.json(url, function(data) {
		data = cleanData2(data, bra);

		var sample_data = [
			{"value": 100, "name": "alpha", "group": "group 1"},
			{"value": 70, "name": "beta", "group": "group 2"},
			{"value": 40, "name": "gamma", "group": "group 2"},
			{"value": 15, "name": "delta", "group": "group 2"},
			{"value": 5, "name": "epsilon", "group": "group 1"},
			{"value": 1, "name": "zeta", "group": "group 1"}
			]
		var visualization = d3plus.viz()
			.container("#viz2")
			.data(data)
			.type("tree_map")
			.id(["region","state"])
			.width(1500)
			.height(700)
			.size("enrolled")
			.ui([
				{
					"method": "size",
					"value"	: [ "enrolled" , "num_schools", "classes"]
				}
			])
			.draw()
	});
}