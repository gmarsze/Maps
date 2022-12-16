// ramzor map -v2

var selectedtheme = 0 ;

sty1 = function(feature) {
        return {
          color: 'red',
          dashArray: "30 10",
          weight: 7
        };
      }
		
black_line = {    
      color: 'black',
      weight: 7
    };

// ------------------------------------------------------------------------

// https://drustack.github.io/Leaflet.SyncView/
const mapproperties = {
	initial_lon: 32.06744693937369,
	initial_lat: 34.82906341552735,
	initial_zm: 13 
};

const mapboxlight = {
	connect: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/light-v9',
	tileSize: 512,
	zoomOffset: -1
};
const mapboxstreets = Object.assign({}, mapboxlight);
mapboxstreets.id = 'mapbox/streets-v11';

const osm = {
		connect: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
		maxZoom: 18
		};
const osm_dark = {
		connect: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', 
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        };

var provider = mapboxlight ;
var mapboxlighttiles = L.tileLayer(provider.connect, {
	maxZoom: provider.maxZoom,
	attribution: provider.attribution,
	id: provider.id,
	tileSize: provider.tileSize,
	zoomOffset: provider.zoomOffset
}) ;

var provider = mapboxstreets ;
var mapboxstreetstiles = L.tileLayer(provider.connect, {
	maxZoom: provider.maxZoom,
	attribution: provider.attribution,
	id: provider.id,
	tileSize: provider.tileSize,
	zoomOffset: provider.zoomOffset
}) ;

//  see https://leafletjs.com/examples/wms/wms.html
var baseMaps = {
	"רקע צבעוני": mapboxstreetstiles,
	"רקע אפור": mapboxlighttiles
};

// -----------------------------------------------


stylvl1 = function(feature) {
	lvl = feature.properties.Lvl;
	if ( lvl == 1 ) {
		c = 'blue'
	} else if ( lvl == 2 ) { 
		c = 'red'
	} else {
		c = 'green'
	}

	return {
		color: c,
		//dashArray: "30 10",
		weight: 5
	};
}



const lyr1 = { 
	name: "דרכים תמא",
	url: "https://gmarsze.github.io/Maps/data/TamaRds.geoJson",
	style: stylvl1,
	popup: function(feature, layer) {
		if (feature.properties) {
				popupcontent = feature.properties.NAME + '<br>'+'סיווג: ' + feature.properties.MAVAT_NAME ;
				if (feature.properties.PLANNO!=null)    { popupcontent = popupcontent + '<br> תכנית: '+feature.properties.PLANNO ;} ;
				if (feature.properties.REMARKS!=null)   { popupcontent = popupcontent + '<br> הערות: '+feature.properties.REMARKS } ;
				layer.bindPopup(popupcontent);
				}  
	},
	onEachFeature: function (feature, layer) {
		layer.setText(feature.properties.ROADNUMBER, {offset: -5});
	},
	/*onEachFeature: function (feature, layer) {
		bindLabel("My Label", {noHide: true, className: "my-label", offset: [0, 0] });
	}*/	
}  

/*


L.geoJson(vessels,{
    onEachFeature: function (feature, layer) {
        layer.bindPopup("ID: " + feature.properties.id + "<br>Name: " + feature.properties.name + "<br>DateTime: " + feature.properties.vdatetime + "<br>Speed: " + feature.properties.speedknots + " knots<br>CMG: " + feature.properties.cmg + "°");
        layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'right'}).openTooltip();
    }
}).addTo(map)
*/

//	flds = { "ID", "Dir", "Length", "ROADNUMBER", "MAVAT_CODE", "MAVAT_NAME",  "RDNMBR_OLD", "NAME", "LABEL", "REMARKS", "PLANNO",
//			  "Lvl", "Substract" ,"hov" ,"transit" ,"special" ,"tunnel"}  // 


	/*	
        style: function () {
            return {
                color: 'red'
            }
        },
        onEachFeature: function (feature, layer) {
            layer.on('mouseover', function () {
                this.setStyle({
                    color: 'green'
                });
            });
            layer.on('mouseout', function () {
                geojsonLayer.resetStyle(this);
            });
        } */


// -----------------------------------------

// var map = L.map('map',{zoomControl: false}).setView([mapproperties.initial_lon, mapproperties.initial_lat], mapproperties.initial_zm);
// var zoom_bar = new L.Control.ZoomBar({position: 'topright'}).addTo(map);

var map = L.map('map').setView([mapproperties.initial_lon, mapproperties.initial_lat], mapproperties.initial_zm);
L.Control.boxzoom({ position:'topleft' }).addTo(map);

mapboxlighttiles.addTo(map);

var overlayMaps = {};
var sss = addlyr(map, lyr1, overlayMaps) ;
//addlyr(map, lyr2, overlayMaps) ;
//addlyr(map, lyr3, overlayMaps) ;


// close ramzor
//var o1 = overlayMaps[lyr1.name]
//o1.remove();


function addlyr (map, lyr, overlaysObj) {
	let geojson1 = new L.GeoJSON.AJAX(lyr.url, {	
		style: lyr.style, 
//		pointToLayer: function (feature, latlng) {
//			return L.circleMarker(latlng, lyr.style);
//			},
		onEachFeature: lyr.popup
		});
	geojson1.addTo(map);
	overlaysObj[lyr.name] = geojson1;
}

L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);

/*
var domainTheme = {};
domainTheme.radius = [ 0, 3, 7 ];
domainTheme.fillColor = [ 0, "#FFFF00", "#FF0000" ];

function addlyr (map, lyr, overlaysObj) {
	var geojson1 = new L.GeoJSON.AJAX(lyr.url, {	
		pointToLayer: function (feature, latlng) {
		//x = domainTheme;
			var thstyle = Object.assign({}, lyr.style);
			thstyle.radius  = domainTheme.radius[feature.properties.domain]
			thstyle.fillColor  = domainTheme.fillColor[feature.properties.domain]
			return L.circleMarker(latlng, thstyle);
			},
		onEachFeature: lyr.popup
		});
	geojson1.addTo(map);
	overlaysObj[lyr.name] = geojson1;
}
*/

// -------------------------------------------------

function mapreset(lyr, newstyle) {
	lyr.eachLayer(function(feature) {
		feature.setStyle(newstyle); 
	});		
}	



// -------------------------------------------------------

function test(src) {
	var x = 0; // to stop
	//alert('hi')	



	//var o1 = overlayMaps[lyr1.name]
	//o1.remove();

	//var z = map ;
	//var y = overlayMaps ;
	
	/*
	var o1 = overlayMaps[lyr1.name]

	o1.eachLayer(function(feature) {
		let yy = feature ;
		//alert(yy.feature.properties.city);
		//alert(feature.feature.properties.city);
		feature.setStyle(yellowcircle);
		});	
	*/		
	/* map.eachLayer(function(layer){
		layer.bindPopup('Hello');
	});

	var layers = [];
	map.eachLayer(function(layer) {
		if( layer instanceof L.TileLayer )
			layers.push(layer);
	}); */
	d=0;

	//console.log(layers)
}


/*

// ------------------------------------------------------------

L.Control.Legend = L.Control.extend({
    onAdd: function(map) {
        let container = L.DomUtil.create('div', 'leaflet-bar control info legend');
        container.title = "מקרא";
        
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);
        container.innerHTML += '<i style="background: #ffaaaa"></i> מודל ארצי <br>'
		container.innerHTML += '<i style="background: #800080"></i> מודל באר שבע <br>'
		container.innerHTML += '<i style="background: #008800"></i> מודל חיפה <br>'
		container.innerHTML += '<i style="background: #880000"></i> מודל ירושלים <br>'
        container.innerHTML += '<i style="background: #000000"></i> נפות <br>'
        container.innerHTML += '<i style="background: #8888FF"></i> מודל תל אביב <br>'

        return container;
    }
})
L.control.legend = function(opts) {
    return new L.Control.Legend(opts);
}
let legendControl = L.control.legend({ position: 'topright' }).addTo(map);
*/
