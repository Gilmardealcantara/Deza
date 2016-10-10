var url_coords_wld = "http://d3plus.org/topojson/countries.json"


function cleanData(data){
  var keys = data.headers;
  var new_data = {};
  data.data.forEach(function(row){
    aux = {}
    for(var i=0; i<keys.length; i++){
      aux[keys[i]] = row[i];
    } 
    new_data[aux.bra_id] = aux; 
  });
  return new_data;
}

function completeData(data, bra){
  bra.data.forEach(function(row){
      try{
        Object.keys(data[row.id]).forEach(function(attr){
          row[attr] = data[row.id][attr];
        });
        row['completeData'] = true;
      }catch(err){
        row['completeData'] = false;
      }
  });

  return bra.data
}

function geomap(url_coords, container, attr){
      
  d3.json('/graphs/dataviva/' + attr + '?depth=9', function(data){
    data = cleanData(data);
    d3.json('/graphs/dataviva/bra', function(bra){
      data = completeData(data, bra)  
      var index;
      for(index=0; index < data.length; index++){
        if(data[index]['completeData']){
          break;
        }
      }
      keys = Object.keys(data[index]);

      var visualization = d3plus.viz()
        .container(container)       
        .data(data)        
        .coords(url_coords) 
        .type('geo_map')          
        .id('id')            
        .text('name')
        //.color('enrolled')           
        .tooltip(keys)//['id', 'name', 'population', 'enrolled']
        .draw()  

    });
  });
}

//geomap(url_coords_wld, '#viz3');
//geomap('/graphs/coords/all', '#viz4');



geomap('/graphs/coords/4mg', '#viz3', 'sc');

$('document').ready(function(){
  $('#createView').on('click', function(){
      var bra = $('#select_geomap :selected')[0].value
      var dataset  = $('#select_dataset :selected')[0].value
      $('#viz3').empty()
      geomap('/graphs/coords/' + bra, '#viz3', dataset);      
  });
});