var firstlatlngs = [
    [-46662.69, 28131.70],
    [-49848.88, 28131.70]
];

var secondlatlngs = [
    [-45600.70, 31720.92],
    [-37205.10, 31720.92],
    [-37162.87, 39502.10],
    [-34905.17, 39529.96]
];

var firstLine = L.polyline(firstlatlngs, {
    color: 'black',
    weight: 3,
    interactive: false,
    dashArray: '8, 5',
    lineCap: 'butt'
}).addTo(map);

var secondLine = L.polyline(secondlatlngs, {
    color: 'black',
    weight: 3,
    interactive: false,
    lineCap: 'butt'
}).addTo(map);

function updateDashArray() {
    var currentZoom = map.getZoom();
    
    if (currentZoom <= -6) {
        firstLine.setStyle({ dashArray: '3, 2' });
    } else {
        firstLine.setStyle({ dashArray: '8, 5' });
    }
}

map.on('zoomend', () => {
    updateDashArray();
});

updateDashArray();

