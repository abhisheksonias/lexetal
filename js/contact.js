// Contact page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuButton && mobileMenu && menuIcon && closeIcon) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

    // Set active navigation link for current page
    const currentPage = 'contact.html';
    const navLinks = document.querySelectorAll('nav .hidden.lg\\:flex a[href*=".html"], nav #mobile-menu a[href*=".html"]');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Reset all links to default state first
        link.classList.remove('nav-link-active');
        
        if (href === currentPage) {
            // Add active styles
            link.classList.add('nav-link-active');
        }
    });

    // Initialize scroll animations
    initScrollAnimations();
    
    // Form handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
});

// Scroll animations for contact page
function initScrollAnimations() {
    const slideElements = document.querySelectorAll('.slide-in-left, .slide-in-right');
    slideElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Initial check
    handleScrollAnimations();
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Form submission handling
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formObject = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    // Basic validation
    const requiredFields = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !formObject[field] || formObject[field].trim() === '');
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields: ' + missingFields.join(', '));
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formObject.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        e.target.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 10) {
        value = value.substring(0, 10);
    }
    if (value.length >= 6) {
        value = value.substring(0, 6) + ' ' + value.substring(6);
    }
    if (value.length >= 3) {
        value = value.substring(0, 3) + ' ' + value.substring(3);
    }
    input.value = value;
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"], input[placeholder*="Phone"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});
