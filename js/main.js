// Lexetal Website JavaScript Functions

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }
}

// Form Submission Handler
function initFormSubmission() {
    const inquiryForm = document.getElementById('inquiry-form');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your inquiry! We will contact you shortly.');
            inquiryForm.reset();
        });
    }
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-carousel .card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.display = 'block';
            } else {
                testimonial.style.display = 'none';
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    if (testimonials.length > 0) {
        // Initialize testimonials
        showTestimonial(0);

        // Auto-rotate testimonials every 5 seconds
        setInterval(nextTestimonial, 5000);
    }
}

// Smooth scroll functions for hero buttons
function scrollToContact() {
    const contactForm = document.getElementById('inquiry-form');
    if (contactForm) {
        contactForm.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        // Focus on the first input
        setTimeout(() => {
            const firstInput = contactForm.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 500);
    }
}

function scrollToServices() {
    // Look for services section or services link
    const servicesSection = document.querySelector('[href*="services"]') ||
        document.querySelector('#services') ||
        document.querySelector('.services');
    if (servicesSection) {
        servicesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // If no services section found, go to services page
        window.location.href = 'services.html';
    }
}

// Set active navigation link
function setActiveNavLink(currentPage) {
    // Select only navigation menu links, not the logo
    const navLinks = document.querySelectorAll('nav .hidden.lg\\:flex a[href*=".html"], nav #mobile-menu a[href*=".html"]');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Reset all links to default state first
        link.style.backgroundColor = '';
        link.style.color = '';
        
        if (href === currentPage) {
            // Add active styles
            link.style.backgroundColor = '#ffd54f';
            link.style.color = '#1a1a1a';
        }
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu - ensure it runs regardless of component loading
    initMobileMenu();
    
    initFormSubmission();
    initTestimonialCarousel();
    
    // Set active nav link based on current page (only if nav exists)
    if (document.querySelector('nav a[href*=".html"]')) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        setActiveNavLink(currentPage);
    }
});

// Also initialize mobile menu after components are loaded (for safety)
window.addEventListener('load', function() {
    // Re-initialize mobile menu after everything is loaded
    setTimeout(() => {
        initMobileMenu();
    }, 100);
});
