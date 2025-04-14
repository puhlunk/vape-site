// Enhanced right-click protection for PUHLUNK portfolio
(function() {
    // Flag to track if protection is active
    let protectionActive = false;
    
    // Initialize protection
    function initProtection() {
        if (protectionActive) return; // Prevent double initialization
        
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
        
        // Disable text selection for certain elements
        document.querySelectorAll('.hero-section, .product-category, .snack-image, .about-image').forEach(function(element) {
            element.style.userSelect = 'none';
            element.style.webkitUserSelect = 'none';
            element.style.msUserSelect = 'none';
        });
        
        // Mark as active
        protectionActive = true;
        console.log("PUHLUNK Protection: Right-click protection initialized");
    }
    
    // Call initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProtection);
    } else {
        initProtection();
    }
    
    // Double-check initialization after page fully loads
    window.addEventListener('load', initProtection);
})();