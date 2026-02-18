// Store original map center for autopan feature
var originalMapCenter = null;

// Open the commit sidebar with animation
function openCommitSidebar() {
    const commitSidebar = document.getElementById('commit-sidebar');
    commitSidebar.classList.remove('collapsed');
    document.getElementById('sidebar').style.display = 'none';
    
    // Autopan feature: pan the map to adjust for the sidebar
    if (typeof map !== 'undefined') {
        // Check if the Leaflet sidebar is currently open
        const leafletSidebar = document.getElementById('sidebar');
        const isLeafletSidebarOpen = leafletSidebar && !leafletSidebar.classList.contains('collapsed');

        originalMapCenter = map.getCenter();
        
        // Only pan if the Leaflet sidebar is NOT open
        // If it IS open, the map is already shifted, so we just capture that state
        // and avoid double-shifting (which would push the map too far).
        if (!isLeafletSidebarOpen) {
            const sidebarWidth = commitSidebar.offsetWidth || 265; // Default to 265px if not available
            const mapContainer = map.getContainer();
            const mapWidth = mapContainer.offsetWidth;
            
            // Calculate the offset to pan the map
            // Pan left by half the sidebar width to shift content right
            const panOffset = sidebarWidth / 2;
            const centerPoint = map.project(originalMapCenter);
            // Pan LEFT (negative X) to shift map content RIGHT
            centerPoint.x -= panOffset;
            const newCenter = map.unproject(centerPoint);
            
            map.panTo(newCenter, { animate: true, duration: 0.5 });
        }
    }
}

// Close the commit sidebar with animation
function closeCommitSidebar() {
    const commitSidebar = document.getElementById('commit-sidebar');
    commitSidebar.classList.add('collapsed');
    document.getElementById('sidebar').style.display = 'block';
    
    // Autopan feature: restore the original map center when closing
    if (typeof map !== 'undefined' && originalMapCenter) {
        map.panTo(originalMapCenter, { animate: true, duration: 0.5 });
        originalMapCenter = null;
    }
}

// Toggle the commit sidebar
function toggleCommitSidebar() {
    const commitSidebar = document.getElementById('commit-sidebar');
    const isCollapsed = commitSidebar.classList.contains('collapsed');
    
    if (isCollapsed) {
        openCommitSidebar();
    } else {
        closeCommitSidebar();
    }
}

// Navigate map to specific coordinates and zoom level
function navigateToMapPosition(lat, lng, zoom) {
    if (typeof map !== 'undefined') {
        map.setView([lat, lng], zoom, {
            animate: true,
            duration: 1.0
        });
        
        // Optionally close the commit sidebar after navigation
        // Uncomment the line below if you want the sidebar to auto-close after navigation
        //setTimeout(() => closeCommitSidebar(), 500);
        if (window.innerWidth < 768) closeCommitSidebar(); // Auto-close sidebar on mobile after navigation
    } else {
        console.error('Map object not found');
    }
}

// Listen for messages from the commit iframe
window.addEventListener('message', function(event) {
    // Security: Verify the origin of the message
    // Only accept messages from your domain
    if (event.origin !== 'https://devolution.online') {
        return;
    }
    
    // Handle navigation messages
    if (event.data && event.data.type === 'navigateToPosition') {
        const { lat, lng, zoom } = event.data;
        
        if (lat !== undefined && lng !== undefined && zoom !== undefined) {
            navigateToMapPosition(lat, lng, zoom);
        } else {
            console.error('Invalid navigation data:', event.data);
        }
    }
    
    // Handle close sidebar message
    if (event.data && event.data.type === 'closeSidebar') {
        closeCommitSidebar();
    }
});

// Optional: Close sidebar when clicking outside of it
document.addEventListener('click', function(event) {
    const commitSidebar = document.getElementById('commit-sidebar');
    // Basic check if the elements exist
    if (!commitSidebar) return;
    
    // Check if the sidebar is currently open
    const isCollapsed = commitSidebar.classList.contains('collapsed');
    if (isCollapsed) return; // If it's already closed, do nothing in this listener

    const isClickInside = commitSidebar.contains(event.target);
    
    // If click is outside, close it.
    if (!isClickInside) {
        closeCommitSidebar();
    }
});

// Add a clickable area on the map where the commit is located (it will open the commit sidebar when clicked)
var southWestCord = L.latLng(-42190.42, 15360.00);
var northEatCord = L.latLng(-41165.86, 43008.00);
var linkBounds = [southWestCord, northEatCord];
var rectangle = L.rectangle(linkBounds, {
    color: "#66000000"
}).addTo(map).on('click', function(e){
    // Stop the click from propagating to the document so it doesn't immediately trigger the close listener
    L.DomEvent.stopPropagation(e.originalEvent || e); 
    openCommitSidebar();
});
