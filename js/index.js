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
