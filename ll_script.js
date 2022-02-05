// ramzor map

var geojsonMarkerOptions = {
    radius: 6,
    fillColor: "#FF0000", //"#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// ---------------------------------------------

// https://drustack.github.io/Leaflet.SyncView/
const mapproperties = {
	initial_lon: 32.06744693937369,
	initial_lat: 34.82906341552735,
	initial_zm: 13 
}

const mapbox = {
	connect: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/light-v9',
	tileSize: 512,
	zoomOffset: -1
};

const osm = {
		connect: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
		maxZoom: 18
		};
const osm_dark = {
		connect: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', 
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        };

const lyr = { 
	url: "https://gmarsze.github.io/Maps/data/ramzor2021.geoJson",
	//style: geojsonMarkerOptions, // {color: '#ffaaaa'},  // ,weight:2,fillOpacity: 0
	popup: '2021<br>' //+ 'יישוב:' + feature.properties.city + ' <br> צומת:'+feature.properties.TzName
}

// -----------------------------------------
var provider = mapbox ;

// var map = L.map('map',{zoomControl: false}).setView([mapproperties.initial_lon, mapproperties.initial_lat], mapproperties.initial_zm);
// var zoom_bar = new L.Control.ZoomBar({position: 'topright'}).addTo(map);

var map = L.map('map').setView([mapproperties.initial_lon, mapproperties.initial_lat], mapproperties.initial_zm);
L.Control.boxzoom({ position:'topleft' }).addTo(map);

var tiles = L.tileLayer(provider.connect, {
	maxZoom: provider.maxZoom,
	attribution: provider.attribution,
	id: provider.id,
	tileSize: provider.tileSize,
	zoomOffset: provider.zoomOffset
}).addTo(map);

/*var baseMaps = {
	"Mapbox": tiles
};*/

var geojson1 = new L.GeoJSON.AJAX(lyr.url, {	
	//style: lyr.style, 
	pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
		},
	onEachFeature: function(feature, layer) {
		if (feature.properties) {
				var popupcontent = '2021<br>'+'יישוב:' + feature.properties.city + ' <br> צומת:'+feature.properties.TzName;
				layer.bindPopup(popupcontent);
				}
		}
	});
geojson1.addTo(map);

// flds = { "mahoz","semel","city","nrashut","TzName","streets","Authority","new"

/*
var overlayMaps = {
	"שכבת מודל ארצי": geojson1,
	"שכבת מודל באר שבע":geojson2,
	"שכבת מודל חיפה":geojson3,
	'שכבת מודל ירושלים - יו"ש':geojson4,
	"שכבת נפות":geojson5,
	"שכבת מודל תל אביב":geojson6
};
L.control.layers(baseMaps,overlayMaps).addTo(map);

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
