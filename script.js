// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Fix for hero background image
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.backgroundImage = 'url("assets/vapeinside.jpg")';
    }
    
    // Fix background images in CSS
    document.querySelectorAll('.hookah-image.actual-image').forEach(el => {
        el.style.backgroundImage = 'url("assets/vapebar.jpg")';
    });
    
    // Set up base URL for assets
    const baseUrl = function() {
        // Check if we're on GitHub Pages
        if (window.location.hostname.includes('github.io')) {
            // Get the repository name from the pathname
            const repoName = window.location.pathname.split('/')[1];
            return `/${repoName}`;
        }
        // Otherwise, assume we're at the root
        return '';
    }();
    
    // Fix ALL image paths including snack images
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src && src.includes('assets/')) {
            // Handle both ./assets/ and assets/ patterns
            const fixedSrc = src.replace(/^\.?\/?assets\//, `${baseUrl}/assets/`);
            img.src = fixedSrc;
        }
    });
    
    // Element references
    const navPanel = document.getElementById('navPanel');
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const navLinks = document.querySelectorAll('.nav-link');
    const ageVerificationBanner = document.getElementById('ageVerificationBanner');
    const verifyAgeButton = document.getElementById('verifyAgeButton');
    const rejectAgeButton = document.getElementById('rejectAgeButton');
    
    // Check if user has already verified age
    if (!localStorage.getItem('ageVerified')) {
        // Show age verification banner
        ageVerificationBanner.style.display = 'block';
    }
    
    // Verify age button click handler
    verifyAgeButton.addEventListener('click', function() {
        // Hide age verification banner
        ageVerificationBanner.style.display = 'none';
        
        // Set age verified in local storage
        localStorage.setItem('ageVerified', 'true');
    });
    
    // Reject age button click handler
    rejectAgeButton.addEventListener('click', function() {
        // Redirect to a warning page or Google
        window.location.href = 'https://www.google.com';
    });
    
    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', function() {
        navPanel.classList.toggle('mobile-open');
        mobileMenuButton.classList.toggle('open');
    });
    
    // Close mobile menu when clicking a navigation link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navPanel.classList.remove('mobile-open');
            mobileMenuButton.classList.remove('open');
            
            // Update active link
            navLinks.forEach(function(navLink) {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Active navigation based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ============================================================
    // COMPLETELY REVISED ANIMATION SYSTEM
    // ============================================================
    
    // Get all elements that need to be animated
    const animatedElements = document.querySelectorAll(
        '.product-category, .brand-card, .day-time, .snack-category, .hookah-feature, .snack-image, .about-image'
    );
    
    // Apply initial animation state
    animatedElements.forEach((element, index) => {
        // Store original opacity and transform for later use
        element.dataset.originalOpacity = window.getComputedStyle(element).opacity;
        
        // Set initial invisible state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        
        // Flag as not yet animated
        element.dataset.animated = 'false';
    });
    
    // Function to check if element is in viewport with a generous buffer
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Consider element in viewport if it's within 150% of the viewport height
        return (
            rect.top <= windowHeight * 1.5 && 
            rect.bottom >= -windowHeight * 0.5
        );
    }
    
    // Function to animate elements when they're visible
    function animateVisibleElements() {
        animatedElements.forEach(element => {
            // Only process elements that haven't been animated yet
            if (element.dataset.animated === 'false' && isInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.dataset.animated = 'true';
            }
        });
    }
    
    // Animate elements on scroll with requestAnimationFrame for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                animateVisibleElements();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Animate elements already in viewport on page load
    // Small timeout to ensure all styles are applied
    setTimeout(animateVisibleElements, 100);
    
    // Also trigger animation check on window resize
    window.addEventListener('resize', animateVisibleElements);
    
    // ============================================================
    // END OF ANIMATION SYSTEM
    // ============================================================
    
    // Preload all important images
    ['assets/vapeinside.jpg', 'assets/vapebar.jpg', 'assets/vapesnack.jpg', 'assets/vapesnack1.jpg', 'assets/vapesnack2.jpg', 'assets/vape1.jpg'].forEach(src => {
        const img = new Image();
        img.src = src;
    });
});