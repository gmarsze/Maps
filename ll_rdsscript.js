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
	initial_lon: 32.048403,
	initial_lat: 34.957556,
	initial_zm: 11 
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
		c = 'blue',
		w = 7
	} else if ( lvl == 2 ) { 
		c = 'red'
		w = 5
	} else {
		c = 'green'
		w = 4
	}

	return {
		color: c,
		//dashArray: "30 10",
		// smoothFactor: 0,
		weight: w
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
			//layer.setText(feature.properties.ROADNUMBER, { center: true, offset: 0, repeat: false, orientation: 'flip', 
			//			attributes: { fill: 'black',  'stroke': 'blue', 'background-color': 'red', 'font-size': '20', 'font-weight': 'bold' } });
			if (feature.properties.Length>1)  {lbl = feature.properties.ROADNUMBER } 
			else {lbl = null }
			layer.bindTooltip(lbl, {permanent: true, direction: 'center', className: 'RoadLabel'}).openTooltip();
			}  
	},
}  

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

map.on('zoomend', function () {
    var zoomLevel = map.getZoom();
	//alert(zoomLevel);
	// document.getElementById("Zoom").innerHTML = zoomLevel.toString();	
	
	var boxes = document.querySelectorAll('.RoadLabel');

	boxes.forEach(box => {
	  //box.style.backgroundColor = 'purple';
	  //box.style.width = '30px';
	  if (zoomLevel<11) { num = 8; }
	  else if (zoomLevel<13) {num = 12 }
	  else {num = 15 }
	  box.style.fontSize = num.toString() + 'px';
	});	
});

// -------------------------------------------------------

function tooglelbl() {
	// Get the checkbox
	var checkBox = document.getElementById("labels");
	// Get the output text
	var boxes = document.querySelectorAll('.RoadLabel');
	//var text = document.getElementById("text");

	// If the checkbox is checked, display the output text
	if (checkBox.checked == true){
		display = "block";
	} else {
		display = "none";
	}
	
	boxes.forEach(box => {
	  box.style.display = display;
	});
	
}
/*
function showStuff(id, text, btn) {
    document.getElementById(id).style.display = 'block';
    // hide the lorem ipsum text
    document.getElementById(text).style.display = 'none';
    // hide the link
    btn.style.display = 'none';
}
*/
	
/*	
let num = 15;
let text = num.toString();

font-size: 12px;
    //var tooltip = $('.leaflet-tooltip');
	const tooltip = document.querySelector('.leaflet-tooltip');

    switch (zoomLevel) {
        case -2:
            //tooltip.css('font-size', 7);
            break;
        case -1:
            //tooltip.css('font-size', 10);
            break;
        case 0:
            //tooltip.css('font-size', 12);
            break;
        case 1:
            //tooltip.css('font-size', 14);
            break;
        case 2:
            //tooltip.css('font-size', 16);
            break;
        case 3:
            //tooltip.css('font-size', 18);
            break;
        default:
            //tooltip.css('font-size', 14);
    }
*/	


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


function changeview(src) {
	
	selectedtheme = src.value;	
	//alert(src.value);

	if (selectedtheme=="1") {
		map.setView([32.83430827354381, 35.19882202148438], 11);
	}
	else if (selectedtheme=="2") {
		map.setView([mapproperties.initial_lon, mapproperties.initial_lat], mapproperties.initial_zm);
	}
	else if (selectedtheme=="3") {
		map.setView([31.272687, 34.758303], 11);
	}
	
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

