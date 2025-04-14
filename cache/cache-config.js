// Enhanced right-click protection
(function() {
    // Prevent right-click on the entire document
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
    
    // Disable keyboard shortcuts that could bypass right-click protection
    document.addEventListener('keydown', function(e) {
        // Disable Ctrl+S, Ctrl+U, F12 keys
        if (
            // Ctrl+S (Save)
            (e.ctrlKey && e.keyCode === 83) || 
            // Ctrl+U (View Source)
            (e.ctrlKey && e.keyCode === 85) || 
            // F12 (Developer Tools)
            (e.keyCode === 123)
        ) {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable drag and drop for images
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
            return false;
        }
    });
    
    console.log("Right-click protection initialized");
})();