// Commit Sidebar functionality

// Open the commit sidebar with animation
function openCommitSidebar() {
    const commitSidebar = document.getElementById('commit-sidebar');
    commitSidebar.classList.remove('collapsed');
    document.getElementById('sidebar').style.display = 'none';
}

// Close the commit sidebar with animation
function closeCommitSidebar() {
    const commitSidebar = document.getElementById('commit-sidebar');
    commitSidebar.classList.add('collapsed');
    document.getElementById('sidebar').style.display = 'block';
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
        // setTimeout(() => closeCommitSidebar(), 500);
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
    const isClickInside = commitSidebar.contains(event.target);
    
    // Check if sidebar is open and click is outside
    if (!isClickInside && !commitSidebar.classList.contains('collapsed')) {
        // You can uncomment the line below if you want the sidebar to close when clicking outside
        // closeCommitSidebar();
    }
});
