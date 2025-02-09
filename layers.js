// Calculate center bounds for the SVG overlay
var centerLat = (mapExtent[2] + mapExtent[3]) / 2;
var centerLng = (mapExtent[0] + mapExtent[1]) / 2;
var svgBounds = [
    [centerLat - (canvasSize / 2), centerLng - (canvasSize / 2)], // Adjust these values to fit your SVG size
    [centerLat + (canvasSize / 2), centerLng + (canvasSize / 2)]
];

//Add Background Layer to Map
var background = new XMLHttpRequest();
background.open('GET', 'timeline-tiles/Timeline-Base.svg', true); // Replace with the path to your SVG file
background.onreadystatechange = function () {
    if (background.readyState === 4 && background.status === 200) {
        var svgElement = background.responseXML.documentElement;
        L.svgOverlay(svgElement, svgBounds).addTo(map);
    }
};
background.send();

//Add layer 1 to map
var layer1 = new XMLHttpRequest();
layer1.open('GET', 'timeline-tiles/Zoom Level=Level 1.svg', true);
layer1.onreadystatechange = function () {
    if (layer1.readyState === 4 && layer1.status === 200) {
        var svgElement = layer1.responseXML.documentElement;
        var svgOverlay = L.svgOverlay(svgElement, svgBounds).addTo(map);

        // Function to control layer visibility based on zoom level
        function updateSvgVisibility() {
            var zoom = map.getZoom();
            if (zoom >= 2 && zoom <= 3) {
                svgOverlay.getElement().style.display = 'block';
            } else {
                svgOverlay.getElement().style.display = 'none';
            }
        }

        // Initial visibility check
        updateSvgVisibility();

        // Update visibility on zoom end
        map.on('zoomend', updateSvgVisibility);
    }
};
layer1.send();

//Add layer 2 to map
var layer2 = new XMLHttpRequest();
layer2.open('GET', 'timeline-tiles/Zoom Level=Level 2.svg', true); // Replace with the path to your SVG file
layer2.onreadystatechange = function () {
    if (layer2.readyState === 4 && layer2.status === 200) {
        var svgElement = layer2.responseXML.documentElement;
        var svgOverlay = L.svgOverlay(svgElement, svgBounds).addTo(map);

        // Function to control layer visibility based on zoom level
        function updateSvgVisibility() {
            var zoom = map.getZoom();
            if (zoom >= 4 && zoom <= 5) {
                svgOverlay.getElement().style.display = 'block';
            } else {
                svgOverlay.getElement().style.display = 'none';
            }
        }

        // Initial visibility check
        updateSvgVisibility();

        // Update visibility on zoom end
        map.on('zoomend', updateSvgVisibility);
    }
};
layer2.send();

//Add layer 3 to map
var layer3 = new XMLHttpRequest();
layer3.open('GET', 'timeline-tiles/Zoom Level=Level 3.svg', true); // Replace with the path to your SVG file
layer3.onreadystatechange = function () {
    if (layer3.readyState === 4 && layer3.status === 200) {
        var svgElement = layer3.responseXML.documentElement;
        var svgOverlay = L.svgOverlay(svgElement, svgBounds).addTo(map);

        // Function to control layer visibility based on zoom level
        function updateSvgVisibility() {
            var zoom = map.getZoom();
            if (zoom >= 6 && zoom <= 7) {
                svgOverlay.getElement().style.display = 'block';
            } else {
                svgOverlay.getElement().style.display = 'none';
            }
        }

        // Initial visibility check
        updateSvgVisibility();

        // Update visibility on zoom end
        map.on('zoomend', updateSvgVisibility);
    }
};
layer3.send();

//Add layer 4 to map
var layer4 = new XMLHttpRequest();
layer4.open('GET', 'timeline-tiles/Zoom Level=Level 4.svg', true); // Replace with the path to your SVG file
layer4.onreadystatechange = function () {
    if (layer4.readyState === 4 && layer4.status === 200) {
        var svgElement = layer4.responseXML.documentElement;
        var svgOverlay = L.svgOverlay(svgElement, svgBounds).addTo(map);

        // Function to control layer visibility based on zoom level
        function updateSvgVisibility() {
            var zoom = map.getZoom();
            if (zoom >= 8 && zoom <= 9) {
                svgOverlay.getElement().style.display = 'block';
            } else {
                svgOverlay.getElement().style.display = 'none';
            }
        }

        // Initial visibility check
        updateSvgVisibility();

        // Update visibility on zoom end
        map.on('zoomend', updateSvgVisibility);
    }
};
layer4.send();