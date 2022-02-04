var map = L.map('map').setView([31.5, 35], 7);


var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/light-v9',
	tileSize: 512,
	zoomOffset: -1
}).addTo(map);

var baseMaps = {
	"Mapbox": tiles
};

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var geojson1 = new L.GeoJSON.AJAX("./data/ramzor2021.geojson",{
	style: geojsonMarkerOptions;
	/*style:{color: '#ffaaaa'},  // ,weight:2,fillOpacity: 0
	onEachFeature: function(feature, layer) {
		if (feature.properties) {
				var popupcontent = '2021<br>'+'יישוב:' + feature.properties.city + ' <br> צומת:'+feature.properties.TzName;
				layer.bindPopup(popupcontent);
				}
		}*/
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
