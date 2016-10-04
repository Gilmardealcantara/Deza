function cleanData2(data, bra){
	var keys = data.headers;
	var new_data = [];
	data.data.forEach(function(row){
		aux = {}
		for(var i=0; i<keys.length; i++){
			if(keys[i] == 'bra_id'){
				aux['region'] = row[i][0];
				aux['state'] = row[i].slice(0,3);
				aux['city'] = row[i];
				aux['region_name'] = bra[row[i][0]].name;
				aux['state_name'] = bra[row[i].slice(0,3)].name;
				aux['city_name'] = bra[row[i]].name;

			}

			aux[keys[i]] = row[i];
		}	
		new_data.push(aux);	
	});
	return new_data;
}


function treemap(url, bra){ // so estados
	url='/graphs/dataviva/sc/?depth=9'
	d3.json(url, function(data) {
		data = cleanData2(data, bra);

		var visualization = d3plus.viz()
			.container("#viz2")
			.data(data)
			.type("tree_map")
			.id(["region","state", "city"])
			.width(1500)
			.height(700)
			.size("enrolled")
			.labels({"align": "left", "valign": "top"})
			.text(function(d){
				if(d.bra_id.length == 9){
					return d.city_name;
				}else if(d.state.length == 3){
					return d.state_name;
				}else{
					return d.region_name;
				}
			})
			.ui([
				{
					"method": "size",
					"value"	: [ "enrolled" , "num_schools", "classes"]
				}
			])
			.draw()
	});
}


deza.requireAttrs(['bra'], function(){
	var url='/graphs/dataviva/sc/?depth=3'
	treemap(url , deza.bra);
});



/*
				aux['region'] = row[i][0];
				aux['state'] = row[i].slice(0,3);
				aux['city'] = row[i];
				aux['mesorregion'] = row[i].slice(0,5);
				aux['microrregion'] = row[i].slice(0,7);
				aux['region_name'] = bra[row[i][0]].name;
				aux['state_name'] = bra[row[i].slice(0,3)].name;
				aux['city_name'] = bra[row[i]].name;
				aux['mesorregion_name'] = row[i].slice(0,5);
				aux['microrregion_name'] = row[i].slice(0,7);


				if(d.bra_id.length == 9){
					return d.city_name;
				}else if(d.state.length == 3){
					return d.state_name;
				}else if(d.mesorregion.length == 5){
					return d.mesoregion_name;
				}else if(d.microrregion.length == 7){
					return d.microrregion_name;
				}else{
					return d.region_name;
				}


*/