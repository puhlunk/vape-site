// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Scroll animations for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-category, .brand-card, .day-time, .snack-category, .hookah-feature');
        
        elements.forEach(function(element) {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const setInitialState = function() {
        const elements = document.querySelectorAll('.product-category, .brand-card, .day-time, .snack-category, .hookah-feature');
        
        elements.forEach(function(element, index) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.5s ease ${index * 0.1}s`;
        });
    };
    
    // Initialize animations
    setInitialState();
    animateOnScroll(); // Run once on page load
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Preload hero background image
    const preloadImage = new Image();
    preloadImage.src = 'https://images.unsplash.com/photo-1562184552-997c461abbe6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
});