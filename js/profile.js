// Profile page specific JavaScript functionality

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
    const currentPage = window.location.pathname.split('/').pop();
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
});

// Scroll reveal animation
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
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

// Email validation for contact forms
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add click tracking for profile actions
document.addEventListener('DOMContentLoaded', function() {
    // Track email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            const email = this.getAttribute('href').replace('mailto:', '');
            console.log('Email clicked:', email);
            // You can add analytics tracking here
        });
    });

    // Track LinkedIn clicks
    const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
    linkedinLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('LinkedIn profile clicked');
            // You can add analytics tracking here
        });
    });

    // Track consultation button clicks
    const consultationButtons = document.querySelectorAll('a[href="contact.html"]');
    consultationButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Consultation button clicked');
            // You can add analytics tracking here
        });
    });
});

// Add loading animation for external links
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add a subtle loading indicator
            const originalText = this.textContent;
            this.textContent = 'Opening...';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 1000);
        });
    });
});

// Add hover effects for profile cards
document.addEventListener('DOMContentLoaded', function() {
    const profileCards = document.querySelectorAll('.scroll-reveal');
    profileCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
