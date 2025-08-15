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
    const navLinks = document.querySelectorAll('nav a[href*=".html"]');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            // Add active styles
            link.style.backgroundColor = '#ffda57';
            link.style.color = '#1a1a1a';
        }
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFormSubmission();
    initTestimonialCarousel();
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    setActiveNavLink(currentPage);
});
