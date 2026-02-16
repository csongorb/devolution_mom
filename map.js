const mapWidth = 152144;
const mapHeight = 80144;

const bounds = [[-mapHeight, 0], [0, mapWidth]];

const map = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: -8,
      maxZoom: -1,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      zoomSnap: 1
    });

    map.fitBounds(bounds);

L.tileLayer("Leaflet_tiles/{z}/{x}/{y}.png", {
    minZoom: -8,
    maxZoom: -1,
    //minNativeZoom: 0,
    //maxNativeZoom: 1,
    noWrap: true,
    bounds: bounds
}).addTo(map);