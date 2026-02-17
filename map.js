const mapWidth = 152144;
const mapHeight = 80144;

const bounds = [[-mapHeight, 0], [0, mapWidth]];

const map = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: -8,
      maxZoom: 1,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      zoomSnap: 1
    });

    map.fitBounds(bounds);

L.tileLayer("Leaflet_tiles/{z}/{x}/{y}.png", {
    minZoom: -8,
    maxZoom: 1,
    minNativeZoom: -8,
    maxNativeZoom: -4,
    noWrap: true,
    bounds: bounds,
    attribution: '&copy; Devolution'
}).addTo(map);

map.attributionControl.setPrefix(false);

// Add a control to display the mouse position (for debugging purposes)
//L.control.mousePosition().addTo(map);

// Add a clickable area on the map where the commit is located (it will open the commit sidebar when clicked)
var southWestCord = L.latLng(-42190.42, 15360.00);
var northEatCord = L.latLng(-41165.86, 43008.00);
var linkBounds = [southWestCord, northEatCord];
var rectangle = L.rectangle(linkBounds, {
    color: "#66000000"
}).addTo(map).on('click', function(){
    openCommitSidebar();
});

// Copy the coordinates of a clicked point to the clipboard (for debugging purposes)
// map.on('click', async (e) => {
//    const x = e.latlng.lng;
//    const y = e.latlng.lat;
//    const zoom = map.getZoom();

//    const text = `Lat: ${y.toFixed(2)}, Lng: ${x.toFixed(2)}, Zoom: ${zoom}`;

//    try {
//      await navigator.clipboard.writeText(text);
//      console.log('Coordinates copied to clipboard:', text);
//    } catch {
//      const ta = document.createElement('textarea');
//      ta.value = text;
//      document.body.appendChild(ta);
//      ta.select();
//      document.execCommand('copy');
//      document.body.removeChild(ta);
//      console.log('Coordinates copied (fallback):', text);
//    }
//  });
