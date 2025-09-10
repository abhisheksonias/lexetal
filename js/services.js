// Services page specific JavaScript functionality

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
    const currentPage = 'services.html';
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

    // Observe all scroll-reveal elements
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    // Service card interaction effects
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Why choose us cards hover effect
    const whyCards = document.querySelectorAll('.why-card');

    whyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.background = 'linear-gradient(135deg, #ffd54f 0%, #ffd700 100%)';
            card.style.color = '#1a1a1a';
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
            card.style.color = '';
        });
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Add smooth scrolling for internal links
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

// Parallax effect for hero background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-animation');

    parallax.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Scroll animations for services page
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    const slideUpElements = document.querySelectorAll('.slide-in-up');
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    fadeElements.forEach(el => {
        if (isElementInViewport(el) || el.getBoundingClientRect().top < window.innerHeight * 0.8) {
            el.classList.add('visible');
        }
    });

    slideLeftElements.forEach(el => {
        if (isElementInViewport(el) || el.getBoundingClientRect().top < window.innerHeight * 0.8) {
            el.classList.add('visible');
        }
    });

    slideRightElements.forEach(el => {
        if (isElementInViewport(el) || el.getBoundingClientRect().top < window.innerHeight * 0.8) {
            el.classList.add('visible');
        }
    });

    slideUpElements.forEach(el => {
        if (isElementInViewport(el) || el.getBoundingClientRect().top < window.innerHeight * 0.8) {
            el.classList.add('visible');
        }
    });

    scrollRevealElements.forEach(el => {
        if (isElementInViewport(el) || el.getBoundingClientRect().top < window.innerHeight * 0.8) {
            el.classList.add('visible');
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimations();
});

// Check on scroll
window.addEventListener('scroll', handleScrollAnimations);

// Check on resize
window.addEventListener('resize', handleScrollAnimations);
