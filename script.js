// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Fix for hero background image
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        // Force background image to reload with the correct path
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
    
    // Adjust image paths if necessary
    document.querySelectorAll('img[src^="./assets/"]').forEach(img => {
        img.src = img.src.replace('./assets/', `${baseUrl}/assets/`);
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
    
    // Initialize animations with Intersection Observer for better performance
    const initAnimations = function() {
        const elements = document.querySelectorAll('.product-category, .brand-card, .day-time, .snack-category, .hookah-feature, .snack-image, .about-image');
        
        // Set initial state
        elements.forEach(function(element, index) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.5s ease ${index * 0.1}s`;
        });
        
        // Create the observer with more generous threshold
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // Stop observing once animation is done
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,  // Trigger when just 10% of element is visible
            rootMargin: '0px 0px -10% 0px'  // Add margin to trigger earlier
        });
        
        // Observe each element
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Initialize animations with better performance
    initAnimations();
    
    // Preload hero background image
    const preloadImage = new Image();
    preloadImage.src = 'assets/vapeinside.jpg';
});