// ramzor map

var selectedtheme = 0 ;

// -----------------------------------

const redcircle = {
    radius: 4,
    fillColor: "#FF0000", // red   //"#ff7800" - orange,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
const violetcircle = Object.assign({}, redcircle);
violetcircle.fillColor = "#EE82EE";

const yellowcircle = Object.assign({}, redcircle);
yellowcircle.fillColor = "#FFFF00";

const kikar = {
    radius: 4,
    fillColor: "#FFFFFF", // white 
    color: "#9400D3",  // violet
    weight: 2,
    opacity: 1,
    fillOpacity: 0.3
};


// ------------------------------------------------------------------------

// https://drustack.github.io/Leaflet.SyncView/
const mapproperties = {
	initial_lon: 32.06744693937369,
	initial_lat: 34.82906341552735,
	initial_zm: 13 
}

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

const lyr1 = { 
	name: "רמזורים - סוף 2021",
	url: "https://gmarsze.github.io/Maps/data/ramzor2021.geoJson",
	style: redcircle,
	popup: function(feature, layer) {
		if (feature.properties) {
				var popupcontent = 'רמזור<br>'+'יישוב: ' + feature.properties.city ;
				if (feature.properties.TzName!=null)    { popupcontent = popupcontent + '<br> צומת: '+feature.properties.TzName ;} ;
				if (feature.properties.streets!=null)   { popupcontent = popupcontent + '<br> רחובות: '+feature.properties.streets } ;
				if (feature.properties.Authority!=null) { popupcontent = popupcontent + '<br> רשות תמרור: '+feature.properties.Authority };
				layer.bindPopup(popupcontent);
				}  //{ "mahoz","semel","city","nrashut","TzName","streets","Authority","new"}
	}	
}  

const lyr2 = { 
	name: "מעגלי תנועה - סוף 2021",
	url: "https://gmarsze.github.io/Maps/data/kikar2021.geoJson",
	style: kikar, // yellowcircle,
	popup: function(feature, layer) {
		if (feature.properties) {
				var popupcontent = 'מעגל תנועה<br>'+'יישוב: ' + feature.properties.city ;
				if (feature.properties.TzName!=null)    { popupcontent = popupcontent + '<br> צומת: '+feature.properties.TzName ;} ;
				if (feature.properties.streets!=null)   { popupcontent = popupcontent + '<br> רחובות: '+feature.properties.streets } ;
				if (feature.properties.Authority!=null) { popupcontent = popupcontent + '<br> רשות תמרור: '+feature.properties.Authority };
				layer.bindPopup(popupcontent);
				}
	}	
}

// -----------------------------------------

// var map = L.map('map',{zoomControl: false}).setView([mapproperties.initial_lon, mapproperties.initial_lat], mapproperties.initial_zm);
// var zoom_bar = new L.Control.ZoomBar({position: 'topright'}).addTo(map);

var map = L.map('map').setView([mapproperties.initial_lon, mapproperties.initial_lat], mapproperties.initial_zm);
L.Control.boxzoom({ position:'topleft' }).addTo(map);


mapboxstreetstiles.addTo(map);


var domainTheme = {};
domainTheme.radius = [ 0, 3, 7 ];
domainTheme.fillColor = [ 0, "#FFFF00", "#FF0000" ];

var overlayMaps = {};
addlyr(map, lyr1, overlayMaps) ;
addlyr(map, lyr2, overlayMaps) ;


/*
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

function addlyr (map, lyr, overlaysObj) {
	var geojson1 = new L.GeoJSON.AJAX(lyr.url, {	
		//style: lyr.style, 
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, lyr.style);
			},
		onEachFeature: lyr.popup
		});
	geojson1.addTo(map);
	overlaysObj[lyr.name] = geojson1;
}

L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);

/*
function maptheme(src) {
	selectedtheme = src.value;	
	alert(src.value);
	
	}

function test(src) {
	var x = 0; //to stop
	//alert('hi')	

	var z = map ;

	var y = map.layers ;
	
	map.eachLayer(function(layer){
		layer.bindPopup('Hello');
	});

	var layers = [];
	map.eachLayer(function(layer) {
		if( layer instanceof L.TileLayer )
			layers.push(layer);
	});

	console.log(layers)
	}

*/	

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

