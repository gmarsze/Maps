// ketaim map -v1

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
	initial_lon: 32.05,
	initial_lat: 34.9,
	initial_zm: 12 
};


const osm = {
		connect: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
		maxZoom: 18
		};
const osm_dark = {
		connect: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', 
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        };
		
var CartoDB_Voyager = { // color
	connect: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', 
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
	};

var CartoDB_Positron = {  // light
	connect: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', 
	//connect: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
	};
		
// -------------------------------------------------

var provider = CartoDB_Voyager ;
var streetstiles = L.tileLayer(provider.connect, {
	attribution: provider.attribution,
	//id: provider.id,
	//tileSize: provider.tileSize,
	//zoomOffset: provider.zoomOffset,
	maxZoom: provider.maxZoom
}) ;

var provider = CartoDB_Positron ;
var lighttiles = L.tileLayer(provider.connect, {
	attribution: provider.attribution,
	//id: provider.id,
	//tileSize: provider.tileSize,
	//zoomOffset: provider.zoomOffset,
	maxZoom: provider.maxZoom
}) ;

//  see https://leafletjs.com/examples/wms/wms.html
var baseMaps = {
	"רקע צבעוני": streetstiles,
	"רקע אפור": lighttiles
};

// -----------------------------------------------


stylvl1 = function(feature) {
	lvl = feature.properties.LEVEL;
	if ( lvl == 1 ) {
		//c = 'blue',
		c = 'red'
		w = 6
	} else if ( lvl == 2 ) { 
		c = 'green'
		w = 5
	} else {
		c = '#32CD32'  // 'green'
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
	name: "רשת ראשית/אזורית",
	url: "https://gmarsze.github.io/Maps/data/RASHIT_EZORIT.geoJson",
	style: stylvl1,
	pane: 'back',
	popup: function(feature, layer) {
		if (feature.properties) {
			popupcontent = feature.properties.keta + '<br>'+'סיווג: ' + feature.properties.LEVEL + '<br>'+'אורך: ' + feature.properties.Length ;
			//if (feature.properties.PLANNO!=null)    { popupcontent = popupcontent + '<br> תכנית: '+feature.properties.PLANNO ;} ;
			//if (feature.properties.REMARKS!=null)   { popupcontent = popupcontent + '<br> הערות: '+feature.properties.REMARKS } ;
			
			layer.bindPopup(popupcontent);
			//layer.setText(feature.properties.ROADNUMBER, { center: true, offset: 0, repeat: false, orientation: 'flip', 
			//			attributes: { fill: 'black',  'stroke': 'blue', 'background-color': 'red', 'font-size': '20', 'font-weight': 'bold' } });
			
			if (feature.properties.Length>0.3)  {lbl = feature.properties.keta } 
			else {lbl = null }
			//lbl = feature.properties.keta
			layer.bindTooltip(lbl, {permanent: true, direction: 'center', className: 'RoadLabel'}).openTooltip();
			}  
	}
}  

// https://leafletjs.com/reference.html#path
const lyr2 = { 
	name: "דרכים מקומיות",
	url: "https://gmarsze.github.io/Maps/data/MEKOMIT.geoJson",
	pane: 'back',
	style: {
		color: '#8B4513',
		weight: 2.5
		},
	popup: function(feature, layer) {
		if (feature.properties) {
			popupcontent = feature.properties.keta + '<br>'+'סיווג: ' + feature.properties.LEVEL ;
			//if (feature.properties.PLANNO!=null)    { popupcontent = popupcontent + '<br> תכנית: '+feature.properties.PLANNO ;} ;
			//if (feature.properties.REMARKS!=null)   { popupcontent = popupcontent + '<br> הערות: '+feature.properties.REMARKS } ;
			
			layer.bindPopup(popupcontent);
			//layer.setText(feature.properties.ROADNUMBER, { center: true, offset: 0, repeat: false, orientation: 'flip', 
			//			attributes: { fill: 'black',  'stroke': 'blue', 'background-color': 'red', 'font-size': '20', 'font-weight': 'bold' } });
			
			//if (feature.properties.Length>1)  {lbl = feature.properties.keta } 
			//else {lbl = null }
			//lbl = feature.properties.keta
			//layer.bindTooltip(lbl, {permanent: true, direction: 'center', className: 'RoadLabel'}).openTooltip();
			}  
	}
}  


var blackcircle1 = {
	pane: 'front',
    radius: 6,
    fillColor: "black",
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};

var c1 = {
	  pane: 'markers1',
	  "radius": 5,
	  "fillColor": "#ff7800",
	  "color": "#ff7800",
	  "weight": 1,
	  "opacity": 1
	}


var blacksquare = {
	pane: 'front',
    radius: 3,
	shape: "square",
    fillColor: "black",
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 1,
	rotation: 0
	}	
	

const lyr3 = { 
	name: "קצה קטע רשת ראשית/אזורית",
	url: "https://gmarsze.github.io/Maps/data/RASHIT_EZORIT_Node.geoJson",
	//pane: 'front',
	// style: blackcircle1
	style: blacksquare
}  


var blackcircle2 = {
	pane: 'front',
    radius: 2,
    fillColor: "black",
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};

const lyr4 = { 
	name: "קצה קטע מקומי",
	url: "https://gmarsze.github.io/Maps/data/MEKOMIT_Node.geoJson",
	//pane: 'front',
	style: blackcircle2
}  



/*
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

map.createPane('back');
map.getPane('back').style.zIndex = 500;
map.createPane('front');
map.getPane('front').style.zIndex = 1500;

L.Control.boxzoom({ position:'topleft' }).addTo(map);
lighttiles.addTo(map);

var overlayMaps = {};
var slyr1 = addlyr(map, lyr1, overlayMaps) ;
var slyr3 = addplyr1(map, lyr3, overlayMaps) ;
var slyr2 = addlyr(map, lyr2, overlayMaps) ;
var slyr4 = addplyr(map, lyr4, overlayMaps) ;


// close local
var o1 = overlayMaps[lyr2.name]
o1.remove();
var o1 = overlayMaps[lyr4.name]
o1.remove();

map.on('zoomend', function () {
    var zoomLevel = map.getZoom();
	//alert(zoomLevel);
	// document.getElementById("Zoom").innerHTML = zoomLevel.toString();	
	
	var boxes = document.querySelectorAll('.RoadLabel');

	boxes.forEach(box => {
	  //box.style.backgroundColor = 'purple';
	  //box.style.width = '30px';
	  if (zoomLevel<11) { num = 4; }
	  else if (zoomLevel<13) {num = 7 }
	  else {num = 9 }
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


function lblsoff() {
	var boxes = document.querySelectorAll('.RoadLabel');
	//var text = document.getElementById("text");

	display = "none";
	
	boxes.forEach(box => {
	  box.style.display = display;
	});

}


/*
function addlbl() {
	var o1 = overlayMaps[lyr1.name]
	o1.eachLayer(function(feature) {
		let yy = feature ;
		let Len  = yy.feature.properties.Length ;
		let keta = yy.feature.properties.keta ;
                    
		if (Len>0.5)  {lbl = keta } 
		else {lbl = null }
		//lbl = feature.properties.keta
		o1.bindTooltip(lbl, {permanent: true, direction: 'center', className: 'RoadLabel'}).openTooltip();
		});	
		

} /


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
		pane: lyr.pane, 
		style: lyr.style, 
//		pointToLayer: function (feature, latlng) {
//			return L.circleMarker(latlng, lyr.style);
//			},
		onEachFeature: lyr.popup
		});
	geojson1.addTo(map);
	overlaysObj[lyr.name] = geojson1;
}


function addplyr (map, lyr, overlaysObj) {
	let geojson1 = new L.GeoJSON.AJAX(lyr.url, {	
		// pane: lyr.pane, 
		// style: lyr.style, 
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, lyr.style);
			//locationMarker = L.circleMarker(e.latlng, { pane: "locationMarker" });
			} //,
		//onEachFeature: lyr.popup
		});
	geojson1.addTo(map);
	overlaysObj[lyr.name] = geojson1;
}


function addplyr1 (map, lyr, overlaysObj) {
	let geojson1 = new L.GeoJSON.AJAX(lyr.url, {	
		pointToLayer: function (feature, latlng) {
			return L.shapeMarker(latlng, lyr.style)
			//return L.circleMarker(latlng, lyr.style);
			//locationMarker = L.circleMarker(e.latlng, { pane: "locationMarker" });
			} //,
		//onEachFeature: lyr.popup
		});
	geojson1.addTo(map);
	overlaysObj[lyr.name] = geojson1;
}


/*

		var myLayer = L.geoJson(sampleGeoJSON, {
			pointToLayer: function (feature, latlng) {
				const r = randomIntFromInterval(0, 360)
				return L.shapeMarker(latlng, {
					shape: "square",
					rotation: r
				})
			}
		}). addTo(map);

*/

L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);
//  lblsoff();

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

/*
function mapreset(lyr, newstyle) {
	lyr.eachLayer(function(feature) {
		feature.setStyle(newstyle); 
	});		
}	
*/ 

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

