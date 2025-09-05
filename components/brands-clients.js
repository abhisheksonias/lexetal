// Brands & Clients Component Loader
// This utility helps load and manage the Brands & Clients component

class BrandsClientsComponent {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.options = {
            badgeText: "TRUSTED BY INDUSTRY LEADERS",
            title: "Our Prestigious Clients",
            description: "From Fortune 500 companies to emerging startups, we've earned the trust of organizations across industries through exceptional legal and tax advisory services.",
            logos: [],
            theme: "light", // light or dark
            autoPlay: true,
            animationSpeed: 30, // seconds for full cycle
            pauseOnHover: true,
            ...options
        };
    }

    // Load the component into a container
    async loadComponent() {
        try {
            const response = await fetch('components/brands-clients.html');
            const componentHTML = await response.text();
            
            const container = document.getElementById(this.containerId);
            if (!container) {
                throw new Error(`Container with ID '${this.containerId}' not found`);
            }
            
            container.innerHTML = componentHTML;
            this.customize();
            this.initializeAnimations();
            
            return true;
        } catch (error) {
            console.error('Error loading Brands & Clients component:', error);
            return false;
        }
    }

    // Customize the component with provided options
    customize() {
        // Update badge text
        const badgeElement = document.getElementById('badge-text');
        if (badgeElement) badgeElement.textContent = this.options.badgeText;
        
        // Update section title
        const titleElement = document.getElementById('section-title');
        if (titleElement) titleElement.textContent = this.options.title;
        
        // Update section description
        const descElement = document.getElementById('section-description');
        if (descElement) descElement.textContent = this.options.description;
        
        // Update logos if provided
        if (this.options.logos.length > 0) {
            this.updateLogos();
        }
        
        // Apply theme
        this.applyTheme();
    }

    // Update client logos
    updateLogos() {
        const logoContainer = document.getElementById('logo-slider');
        if (!logoContainer) return;
        
        const createLogoHTML = (logo) => `
            <div class="flex-shrink-0 mx-2 client-logo">
                <div class="bg-white border border-slate-300/40 rounded-lg p-4 transition-all duration-500 hover:border-slate-400 hover:shadow-md hover:scale-105 group w-24 h-16 flex items-center justify-center">
                    <img src="${logo.src}" alt="${logo.alt || 'Client Logo'}" class="h-6 w-auto transition-transform duration-500 group-hover:scale-110">
                </div>
            </div>
        `;
        
        // Create two sets for seamless infinite scroll
        const logoSet = this.options.logos.map(createLogoHTML).join('');
        logoContainer.innerHTML = logoSet + logoSet; // Duplicate for seamless loop
    }

    // Apply theme styling
    applyTheme() {
        const section = document.querySelector('#' + this.containerId + ' section');
        if (!section) return;
        
        if (this.options.theme === 'dark') {
            section.classList.remove('bg-slate-50/30');
            section.classList.add('bg-slate-800/50');
            
            // Update text colors for dark theme
            const elements = section.querySelectorAll('.text-slate-700, .text-slate-800, .text-slate-600');
            elements.forEach(el => {
                el.classList.remove('text-slate-700', 'text-slate-800', 'text-slate-600');
                el.classList.add('text-slate-100', 'text-white', 'text-slate-300');
            });
        }
    }

    // Initialize animations
    initializeAnimations() {
        const sliderTrack = document.querySelector('#' + this.containerId + ' .slider-track');
        if (!sliderTrack) return;
        
        // Set animation duration
        sliderTrack.style.animationDuration = `${this.options.animationSpeed}s`;
        
        // Handle pause on hover
        if (this.options.pauseOnHover) {
            const sliderContainer = document.querySelector('#' + this.containerId + ' .slider-container');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', () => {
                    sliderTrack.style.animationPlayState = 'paused';
                });
                
                sliderContainer.addEventListener('mouseleave', () => {
                    sliderTrack.style.animationPlayState = 'running';
                });
            }
        }
    }

    // Static method to create and load component in one call
    static async create(containerId, options = {}) {
        const component = new BrandsClientsComponent(containerId, options);
        const loaded = await component.loadComponent();
        return loaded ? component : null;
    }

    // Update component options after creation
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.customize();
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrandsClientsComponent;
}

// Global function for easy usage
window.loadBrandsClients = async function(containerId, options = {}) {
    return await BrandsClientsComponent.create(containerId, options);
};

// Example usage:
/*
// Basic usage
loadBrandsClients('clients-section');

// Advanced usage with custom options
loadBrandsClients('partners-section', {
    badgeText: "OUR PARTNERS",
    title: "Trusted Business Partners",
    description: "Collaborating with industry leaders to deliver exceptional results.",
    logos: [
        { src: "images/partner1.png", alt: "Partner 1" },
        { src: "images/partner2.png", alt: "Partner 2" },
        { src: "images/partner3.png", alt: "Partner 3" }
    ],
    theme: "dark",
    animationSpeed: 25,
    pauseOnHover: true
});
*/
