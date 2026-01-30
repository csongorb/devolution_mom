// Correct approach: Calculate Projected Sizes for CRS.Simple
// CRS.Simple scale = 2^zoom.
// At Zoom 1 (scale=2), we want 3 tiles.
// If actual tile size is 512px: 3 * 512 = 1536 pixels.
// So ProjectedSize = 1536 / 2 = 768 map units.

// ADJUST THIS VALUE TO FIX THE GAP
// Positive value = moves MapB to the left (closer to MapA)
// Negative value = moves MapB to the right
const gapCorrection = 254.5; 

const projectedWidthA = 768;
const projectedHeightA = 768;
const projectedWidthB = 768;
const projectedHeightB = 768;

// Global Map Bounds
// MapA: x 0 to 768, y -768 to 0
// MapB: x 768 to 1536, y -768 to 0

const globalBounds = [[-768, 0], [0, 1536]];

// Create single map
const map = L.map('mapA', {
  crs: L.CRS.Simple,
  minZoom: 1,
  maxZoom: 2,
  zoom: 1,
  center: [-384, 768], // Center of combined map
  attributionControl: true,
  zoomControl: true,
  maxBounds: globalBounds,
  maxBoundsViscosity: 1.0
});

// Create a custom pane for MapB so we can shift it independently
map.createPane('paneB');
// Apply the visual offset
// Function to update the gap correction based on the current zoom level
function updateGapCorrection() {
  const currentZoom = map.getZoom();
  // The gap size scales with the zoom level.
  // At Zoom 1, the scale is 1. At Zoom 2, the scale is 2, etc.
  const scale = Math.pow(2, currentZoom - 1);
  const adjustedGap = gapCorrection * scale;
  map.getPane('paneB').style.marginLeft = `-${adjustedGap}px`;
}

// Initial application
updateGapCorrection();

// Re-apply correction whenever the zoom level changes (after zoom animation)
map.on('zoomend', updateGapCorrection);

// Ensure it sits at the same level as tilePane (200) or slightly above
map.getPane('paneB').style.zIndex = 200;

// Hide mapB container
document.getElementById('mapB').style.display = 'none';

// MapA Layer
// Bounds: 0 to 768.
// At z=1: 768*2 = 1536px -> 3 tiles (0,1,2) of 512px.
L.tileLayer('TilesA/{z}/{x}/{y}.png', {
  minZoom: 1,
  maxZoom: 2,
  tileSize: 512,
  noWrap: true,
  bounds: [[-768, 0], [0, 768]],
  attribution: '&copy; Devolution'
}).addTo(map);

// MapB Layer - with custom offset logic
// It occupies global x 768 to 1536.
// At z=1: Global pixels 1536 to 3072.
// Global tiles: 3, 4, 5.
// We need to map these to local tiles 0, 1, 2.
// Offset = 3.

var OffsetTileLayer = L.TileLayer.extend({
  getTileUrl: function(coords) {
    // Calculate global x in tiles
    // We expect MapB to start at tile index:
    // z=1: start 3
    // z=2: start 6
    // Formula: 3 * 2^(z-1)
    
    var tileOffset = 3 * Math.pow(2, coords.z - 1);
    var localX = coords.x - tileOffset;
    
    // Bounds check for local files
    // z=1: 0,1,2
    // z=2: 0..5
    var maxTiles = 3 * Math.pow(2, coords.z - 1);
    
    if (localX < 0 || localX >= maxTiles) {
       return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    }
    
    return L.Util.template(this._url, L.Util.extend({
      z: coords.z,
      x: localX,
      y: coords.y
    }, this.options));
  }
});

new OffsetTileLayer('TilesB/{z}/{x}/{y}.png', {
  minZoom: 1,
  maxZoom: 2,
  tileSize: 512,
  noWrap: true,
  pane: 'paneB', // Use the custom pane we created
  bounds: [[-768, 768], [0, 1536]], // Global bounds for MapB
  attribution: ''
}).addTo(map);

console.log('Map initialized with corrected CRS bounds (512px base)');
console.log('Gap Correction:', gapCorrection);
console.log('Bounds:', globalBounds);

// Remove attribution prefix
map.attributionControl.setPrefix(false);

// Add mouse position control
L.control.mousePosition().addTo(map);

// Add sidebar to the single map
var sidebar = L.control.sidebar({
  autopan: false,
  closeButton: true,
  container: 'sidebar',
  position: 'left',
}).addTo(map);

sidebar.open(('nav'));

//console.log('Combined map initialized with smart tile routing');
