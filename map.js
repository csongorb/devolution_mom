const mapWidth = 158144;
const mapHeight = 113144;

const bounds = [[-mapHeight, 0], [0, mapWidth]];

const map = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: -8,
      maxZoom: 1,
      //maxBounds: bounds,
      zoomSnap: 0.2
    }).setView([-51596.56, 81022.00], -7.3);

    //map.fitBounds(bounds);

L.tileLayer("Leaflet_tiles/{z}/{x}/{y}.png", {
    minZoom: -8,
    maxZoom: 1,
    minNativeZoom: -8,
    maxNativeZoom: -4,
    noWrap: true,
    bounds: bounds
}).addTo(map);

// remove original Leaflet attribution (will be added to Credits)
map.attributionControl.setPrefix(false);

//map.attributionControl.addAttribution(`<a onclick="sidebar.open('privacy')" href="#">Privacy Policy</a> &VerticalLine; <a onclick="sidebar.open('imprint')" href="#">Imprint</a>`);
map.attributionControl.addAttribution(`<a target="_blank" rel="noopener" href="https://devolution.online/privacypolicy/">Privacy Policy</a> &VerticalLine; <a target="_blank" rel="noopener" href="https://devolution.online/imprint/">Imprint</a>`);

// close sidebar
map.on('click', function() {
    sidebar.close();
} );

// Add a control to display the mouse position (for debugging purposes)
L.control.mousePosition().addTo(map);


// Copy the coordinates of a clicked point to the clipboard (for debugging purposes)
//  map.on('click', async (e) => {
//     const x = e.latlng.lng;
//     const y = e.latlng.lat;
//     const zoom = map.getZoom();

//     const text = `${y.toFixed(2)}, ${x.toFixed(2)}`;

//     try {
//       await navigator.clipboard.writeText(text);
//       console.log('Coordinates copied to clipboard:', text);
//     } catch {
//       const ta = document.createElement('textarea');
//       ta.value = text;
//       document.body.appendChild(ta);
//       ta.select();
//       document.execCommand('copy');
//       document.body.removeChild(ta);
//       console.log('Coordinates copied (fallback):', text);
//     }
//   });
