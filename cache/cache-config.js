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

(function() {
    // Create and insert watermark dynamically
    function addWatermark() {
        if (document.querySelector('.puhlunk-watermark')) return; // Already exists
        
        const watermark = document.createElement('div');
        watermark.className = 'puhlunk-watermark';
        watermark.setAttribute('aria-hidden', 'true');
        document.body.insertBefore(watermark, document.body.firstChild);
        
        // Add watermark styles
        const style = document.createElement('style');
        style.textContent = `
            .puhlunk-watermark {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 4; 
                opacity: 0.04;
                background-image: url('cache/7.png');
                background-repeat: repeat;
                background-position: 15% center;
                background-size: 40% auto;
                transform: rotate(-5deg);
            }
        `;
        document.head.appendChild(style);
        
        // Additional protection against removing via devtools
        setInterval(function() {
            if (!document.querySelector('.puhlunk-watermark')) {
                addWatermark(); // Re-add if removed
            }
        }, 1000);
    }
    
    // Initialize watermark
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addWatermark);
    } else {
        addWatermark();
    }
})();