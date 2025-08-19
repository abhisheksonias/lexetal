// Index page specific JavaScript functionality

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', async function () {
    await ComponentLoader.loadComponents([
        { path: 'components/hero.html', target: '#hero-container' },
    ]);

    // Ensure mobile menu is working after components load
    setTimeout(() => {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');

        if (mobileMenuButton && mobileMenu && menuIcon && closeIcon) {
            // Remove any existing event listeners by cloning the button
            const newButton = mobileMenuButton.cloneNode(true);
            mobileMenuButton.parentNode.replaceChild(newButton, mobileMenuButton);

            // Add new event listener
            newButton.addEventListener('click', function() {
                console.log('Mobile menu button clicked'); // Debug log
                mobileMenu.classList.toggle('hidden');
                
                const newMenuIcon = document.getElementById('menu-icon');
                const newCloseIcon = document.getElementById('close-icon');
                
                if (newMenuIcon && newCloseIcon) {
                    newMenuIcon.classList.toggle('hidden');
                    newCloseIcon.classList.toggle('hidden');
                }
            });
            
            console.log('Mobile menu initialized successfully'); // Debug log
        } else {
            console.log('Mobile menu elements not found:', {
                button: !!mobileMenuButton,
                menu: !!mobileMenu,
                menuIcon: !!menuIcon,
                closeIcon: !!closeIcon
            }); // Debug log
        }

        // Explicitly set active nav link for homepage
        const currentPage = 'index.html';
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
    }, 100);
});

// Additional fallback for mobile menu - direct implementation
function initMobileMenuFallback() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuButton && mobileMenu && menuIcon && closeIcon) {
        mobileMenuButton.onclick = function() {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        };
    }
}

// Try to initialize immediately and also after a delay
initMobileMenuFallback();
setTimeout(initMobileMenuFallback, 500);

// Simple Scroll Animation for Core Pillars Circles (Desktop Only)
function initScrollAnimations() {
    // Check if device is mobile (screen width < 1024px)
    const isMobile = () => window.innerWidth < 1024;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const container = entry.target;
            const leftCircle = container.querySelector('.scroll-circle-left');
            const centerCircle = container.querySelector('.scroll-circle-center');
            const rightCircle = container.querySelector('.scroll-circle-right');
            const textContent = container.querySelector('.scroll-text');
            
            if (entry.isIntersecting) {
                if (isMobile()) {
                    // MOBILE: No animation - just show elements
                    if (leftCircle) {
                        leftCircle.style.opacity = '1';
                        leftCircle.style.transform = 'none';
                        leftCircle.style.transition = 'none';
                    }
                    
                    if (centerCircle) {
                        centerCircle.style.opacity = '1';
                        centerCircle.style.transform = 'none';
                        centerCircle.style.transition = 'none';
                    }
                    
                    if (rightCircle) {
                        rightCircle.style.opacity = '1';
                        rightCircle.style.transform = 'none';
                        rightCircle.style.transition = 'none';
                    }
                    
                    if (textContent) {
                        textContent.style.opacity = '1';
                        textContent.style.transform = 'none';
                        textContent.style.transition = 'none';
                    }
                } else {
                    // DESKTOP: Full animation - Slide in from left and right
                    if (leftCircle) {
                        leftCircle.style.opacity = '1';
                        leftCircle.style.transform = 'translateX(0)';
                    }
                    
                    if (centerCircle) {
                        centerCircle.style.opacity = '1';
                        centerCircle.style.transform = 'scale(1)';
                    }
                    
                    if (rightCircle) {
                        rightCircle.style.opacity = '1';
                        rightCircle.style.transform = 'translateX(0)';
                    }
                    
                    if (textContent) {
                        textContent.style.opacity = '1';
                        textContent.style.transform = 'translateY(0)';
                    }
                }
            } else {
                if (isMobile()) {
                    // MOBILE: No exit animation - keep elements visible
                    return;
                } else {
                    // DESKTOP: Exit animation - Slide out to left and right
                    if (leftCircle) {
                        leftCircle.style.opacity = '0';
                        leftCircle.style.transform = 'translateX(-150px)';
                    }
                    
                    if (centerCircle) {
                        centerCircle.style.opacity = '0.3';
                        centerCircle.style.transform = 'scale(0.9)';
                    }
                    
                    if (rightCircle) {
                        rightCircle.style.opacity = '0';
                        rightCircle.style.transform = 'translateX(150px)';
                    }
                    
                    if (textContent) {
                        textContent.style.opacity = '0';
                        textContent.style.transform = 'translateY(30px)';
                    }
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px'
    });

    // Listen for window resize to handle orientation changes
    window.addEventListener('resize', () => {
        const container = document.getElementById('core-pillars-circles');
        if (container && isMobile()) {
            // Reset all elements to visible state on mobile
            const leftCircle = container.querySelector('.scroll-circle-left');
            const centerCircle = container.querySelector('.scroll-circle-center');
            const rightCircle = container.querySelector('.scroll-circle-right');
            const textContent = container.querySelector('.scroll-text');
            
            [leftCircle, centerCircle, rightCircle, textContent].forEach(element => {
                if (element) {
                    element.style.opacity = '1';
                    element.style.transform = 'none';
                    element.style.transition = 'none';
                }
            });
        }
    });

    // Observe the core pillars container
    const corePillarsContainer = document.getElementById('core-pillars-circles');
    if (corePillarsContainer) {
        observer.observe(corePillarsContainer);
    }
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all elements are rendered
    setTimeout(initScrollAnimations, 100);
});

// Also initialize when page is fully loaded as a fallback
window.addEventListener('load', function() {
    setTimeout(initScrollAnimations, 200);
});
