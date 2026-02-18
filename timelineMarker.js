var customIcon = L.icon({
    iconUrl: 'images/ArrowPin.svg',
    iconSize: [16, 40], // Multiply the desired height with 0.378 to calculate the width (16 [round off] = 40 * 0.378)
    iconAnchor: [8, 40],
    popupAnchor: [0, -30]
});

var marker1 = L.marker([-41140.52, 21552.00], {icon: customIcon})
.bindPopup(`<div align="center">
              <big><b>First Version</b></big><br />
              <img src="images/demo.png" width="150" alt="demo"></img><br />
              <br />
              <a onclick="sidebar.open('versions')" href="#"><big><i class="fa-solid fa-download"></i> Download</big></a><br />
              <small><a onclick="sidebar.open('versions')" href="#">Disclaimer & more</a></small>
            </div>`);

var marker2 = L.marker([-41140.52, 28230.41], {icon: customIcon})
.bindPopup(`<div align="center">
              <big><b>Second Version</b></big><br />
              <img src="images/demo.png" width="150" alt="demo"></img><br />
              <br />
              <a onclick="sidebar.open('versions')" href="#"><big><i class="fa-solid fa-download"></i> Download</big></a><br />
              <small><a onclick="sidebar.open('versions')" href="#">Disclaimer & more</a></small>
            </div>`);

var timelineMarkers = L.layerGroup([marker1, marker2]).addTo(map);

var overlayMaps = {
    "Show Playable Versions": timelineMarkers
};

var layerControl = L.control.layers(null, overlayMaps, {hideSingleBase: true, collapsed: false})
.addTo(map);