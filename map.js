var canvasSize = 200000;
var mapExtent = [(canvasSize/2), -(canvasSize/2), (canvasSize/2), -(canvasSize/2)];
var mapMinZoom = 0;
var mapMaxZoom = 9;
var mapMaxResolution = 1.00000000;
var mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
var tileExtent = [(canvasSize/2), -(canvasSize/2), (canvasSize/2), -(canvasSize/2)];
var crs = L.CRS.Simple;
crs.transformation = new L.Transformation(1, -tileExtent[0], -1, tileExtent[3]);
crs.scale = function(zoom) {
    return Math.pow(2, zoom) / mapMinResolution;
};
crs.zoom = function(scale) {
    return Math.log(scale * mapMinResolution) / Math.LN2;
};

var layer;

var map = new L.Map('map', {
    maxZoom: mapMaxZoom,
    minZoom: mapMinZoom,
    crs: crs
});

// Set the initial view to zoom level 1
map.setView([0, 0], 1);

//Debug Mouse Position on leaflet
L.control.mousePosition().addTo(map)

var centerLat = (mapExtent[2] + mapExtent[3]) / 2;
var centerLng = (mapExtent[0] + mapExtent[1]) / 2;

// Calculate map bounds to double the size of the layer bounds
var mapBounds = [
    [centerLat - (canvasSize * 2), centerLng - (canvasSize * 2)], // Double the size
    [centerLat + (canvasSize * 2), centerLng + (canvasSize * 2)]
];

// Set the map's maximum bounds
map.setMaxBounds(mapBounds);

// remove original Leaflet attribution
map.attributionControl.setPrefix(false);
// add individual attribution
//map.attributionControl.addAttribution(`<a onclick="sidebar.open('privacy')" href="#">Privacy Policy</a> &VerticalLine; <a onclick="sidebar.open('imprint')" href="#">Imprint</a>`);


/*
layer = L.tileLayer('Leaflet_Tiles/{z}/{x}_{y}.png', {
    minZoom: mapMinZoom, maxZoom: mapMaxZoom,
    tileSize: L.point(512, 512),
    noWrap: true,
    tms: false
}).addTo(map);*/

/*
map.fitBounds([
    crs.unproject(L.point(mapExtent[2], mapExtent[3])), //bottom right
    crs.unproject(L.point(mapExtent[0], mapExtent[1])) //top left
]);*/

///Debug Functions 

// Function to print the current zoom level in the console
function printZoomLevel() {
    console.log('Current Zoom Level:', map.getZoom());
}

// Print the zoom level initially and on zoom end
printZoomLevel();
map.on('zoomend', printZoomLevel);

// Function to print mouse position on right mouse button down and up
function printMousePosition(event) {
    var latlng = map.mouseEventToLatLng(event);
    console.log('Mouse Position:', latlng);
}


// Prevent the default context menu
map.on('contextmenu', function(event) {
    event.originalEvent.preventDefault(); 
});

// Add event listeners for right mouse button down and up
map.on('mousedown', function(event) {
    if (event.originalEvent.button === 2) { // Check if the right mouse button was released
        printMousePosition(event.originalEvent);
    }
});

map.on('mouseup', function(event) {
    if (event.originalEvent.button === 2) { // Check if the right mouse button was released
        printMousePosition(event.originalEvent);
    }
});