var url_coords_wld = "http://d3plus.org/topojson/countries.json"

function geomap(url_coords, container){
  var id = url_coords.split('/')[3];
  var attr = (id == 'all' || id == '4mg' ) ? 'bra' : 'wld'  ;
      
  d3.json('/graphs/dataviva/' + attr, function(data){
    // instantiate d3plus
    var visualization = d3plus.viz()
      .container(container)        // container DIV to hold the visualization
      .data(data.data)        // data to use with the visualization
      .coords(url_coords) // pass topojson coordinates
      .type('geo_map')          // visualization type
      .id('id')            // key for which our data is unique on
      .text('name')             // key to use for display text
      //.color(value)           // key for coloring countries
      //.tooltip(value)         // keys to place in tooltip
      .draw()  

  });
}

geomap(url_coords_wld, '#viz3');
geomap('/graphs/coords/all', '#viz4');
geomap('/graphs/coords/4mg', '#viz5');
