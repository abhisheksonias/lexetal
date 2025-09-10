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
            
            if (entry.isIntersecting) {
                if (isMobile()) {
                    // MOBILE: Immediately show all elements for horizontal scroll
                    const mobileElements = container.querySelectorAll('.lg\\:hidden .scroll-circle-left, .lg\\:hidden .scroll-circle-center, .lg\\:hidden .scroll-circle-right');
                    mobileElements.forEach(element => {
                        if (element) {
                            element.style.opacity = '1';
                            element.style.transform = 'none';
                            element.style.transition = 'opacity 0.3s ease';
                        }
                    });
                } else {
                    // DESKTOP: Full animation - Get desktop elements
                    const desktopContainer = container.querySelector('.hidden.lg\\:block');
                    if (desktopContainer) {
                        const leftCircle = desktopContainer.querySelector('.scroll-circle-left');
                        const centerCircle = desktopContainer.querySelector('.scroll-circle-center');
                        const rightCircle = desktopContainer.querySelector('.scroll-circle-right');
                        const textContent = desktopContainer.querySelector('.scroll-text');
                        
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
                }
            } else {
                if (isMobile()) {
                    // MOBILE: Keep elements visible even when out of view
                    return;
                } else {
                    // DESKTOP: Exit animation - Get desktop elements
                    const desktopContainer = container.querySelector('.hidden.lg\\:block');
                    if (desktopContainer) {
                        const leftCircle = desktopContainer.querySelector('.scroll-circle-left');
                        const centerCircle = desktopContainer.querySelector('.scroll-circle-center');
                        const rightCircle = desktopContainer.querySelector('.scroll-circle-right');
                        const textContent = desktopContainer.querySelector('.scroll-text');
                        
                        if (leftCircle) {
                            leftCircle.style.opacity = '0';
                            leftCircle.style.transform = 'translateX(-150px)';
                        }
                        
                        if (centerCircle) {
                            centerCircle.style.opacity = '0';
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
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px'
    });

    // Listen for window resize to handle orientation changes
    window.addEventListener('resize', () => {
        const container = document.getElementById('core-pillars-circles');
        if (container) {
            if (isMobile()) {
                // Reset all mobile elements to visible state on mobile
                const mobileElements = container.querySelectorAll('.lg\\:hidden .scroll-circle-left, .lg\\:hidden .scroll-circle-center, .lg\\:hidden .scroll-circle-right');
                mobileElements.forEach(element => {
                    if (element) {
                        element.style.opacity = '1';
                        element.style.transform = 'none';
                        element.style.transition = 'opacity 0.3s ease';
                    }
                });
            } else {
                // Reset desktop elements to initial state for animation
                const desktopContainer = container.querySelector('.hidden.lg\\:block');
                if (desktopContainer) {
                    const leftCircle = desktopContainer.querySelector('.scroll-circle-left');
                    const centerCircle = desktopContainer.querySelector('.scroll-circle-center');
                    const rightCircle = desktopContainer.querySelector('.scroll-circle-right');
                    const textContent = desktopContainer.querySelector('.scroll-text');
                    
                    // Reset to initial animated state
                    if (leftCircle) {
                        leftCircle.style.opacity = '0';
                        leftCircle.style.transform = 'translateX(-150px)';
                    }
                    if (centerCircle) {
                        centerCircle.style.opacity = '0';
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

// Hero Slider Script
let currentSlideIndex = 1;
const totalSlides = 4;
let autoSlideInterval;

// Initialize slider
document.addEventListener('DOMContentLoaded', function () {
    showSlide(currentSlideIndex);
    startAutoSlide();
});

// Show specific slide
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (n > totalSlides) currentSlideIndex = 1;
    if (n < 1) currentSlideIndex = totalSlides;

    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add('active');
    }
    if (dots[currentSlideIndex - 1]) {
        dots[currentSlideIndex - 1].classList.add('active');
    }
}

// Go to specific slide
function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

// Next slide
function nextSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

// Previous slide
function prevSlide() {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

// Auto advance slides
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, 6000); // Change slide every 6 seconds
}

// Reset auto slide timer
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize touch/swipe support for mobile
function initTouchSupport() {
    const sliderContainer = document.getElementById('hero-slider');
    if (!sliderContainer) return;

    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
    }
}

// Initialize slider hover effects
function initSliderHoverEffects() {
    const sliderContainer = document.getElementById('hero-slider');
    if (!sliderContainer) return;

    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Initialize all slider functionality
document.addEventListener('DOMContentLoaded', function() {
    initTouchSupport();
    initSliderHoverEffects();
});

// Initialize Brands & Clients Component
function initBrandsClientsComponent() {
    console.log('Loading brands-clients component...');

    loadBrandsClients('brands-clients-container').then((success) => {
        if (success) {
            console.log('Brands-clients component loaded successfully');

            // Check if customizeBrandsClients function exists
            if (typeof customizeBrandsClients === 'function') {
                console.log('Customizing brands-clients component...');
                customizeBrandsClients({
                    badgeText: "TRUSTED BY INDUSTRY LEADERS",
                    title: "Our Prestigious Clients",
                    description: "From Fortune 500 companies to emerging startups, we've earned the trust of organizations across industries through exceptional legal and tax advisory services."
                });
                console.log('Component customized successfully');
            } else {
                console.warn('customizeBrandsClients function not found');
            }
        } else {
            console.error('Failed to load brands-clients component');
        }
    }).catch(error => {
        console.error('Error loading component:', error);
    });
}

// Initialize brands clients component when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initBrandsClientsComponent();
});