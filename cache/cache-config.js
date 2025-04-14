// Simple right-click protection without dev tools detection
(function() {
    // Prevent right-click only
    document.addEventListener('contextmenu', function(e) {
        // Only prevent right-click on the main content, not in text inputs
        if (e.target.tagName.toLowerCase() !== 'input' && 
            e.target.tagName.toLowerCase() !== 'textarea') {
            e.preventDefault();
            
            // Show simple alert popup
            alert("Contact @puhlunk for access :)");
            
            return false;
        }
    });
})();