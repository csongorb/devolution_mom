var map = L.map('map', {
    maxBounds: [[83.31362, 151.56738], [-17.60214, -164.15771]],
    maxBoundsViscosity: 0.9
}).setView([60, -7], 3);

L.tileLayer('Leaflet_Tiles/{z}/{x}/{y}.png', {
    maxZoom: 7,
    minZoom: 3,
    maxNativeZoom: 6,
    zoomSnap: 0.2,
    mapMaxResolution: 2,
    mapMinResolution: Math.pow(3, 7) * 2,
    noWrap: true,
    attribution: '&copy; Devolution'
}).addTo(map);

// remove original Leaflet attribution (will be added to Credits)
map.attributionControl.setPrefix(false);
// add individual attribution
//map.attributionControl.addAttribution(`<a onclick="sidebar.open('privacy')" href="#">Privacy Policy</a> &VerticalLine; <a onclick="sidebar.open('imprint')" href="#">Imprint</a>`);

L.control.mousePosition().addTo(map);