// Resources page specific JavaScript functionality

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
    const currentPage = 'resources.html';
    const navLinks = document.querySelectorAll('nav .hidden.lg\\:flex a[href*=".html"], nav #mobile-menu a[href*=".html"]');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            // Add active styles
            link.style.backgroundColor = '#ffd54f';
            link.style.color = '#1a1a1a';
        }
    });

    // Add fade-in class to content items
    const contentItems = document.querySelectorAll('.content-item, .card');
    contentItems.forEach(item => {
        item.classList.add('fade-in');
    });
    
    // Initial scroll animation check
    handleScrollAnimations();
    
    // Animate counters after a short delay
    setTimeout(animateCounters, 500);
    
    // Set up scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);

    // Newsletter subscription button setup
    const subscribeButton = document.querySelector('section:last-of-type button');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', subscribeNewsletter);
    }

    // Enhanced search setup
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', enhancedSearch);
    }
});

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Content filtering functionality
function filterContent(filter) {
    const contentItems = document.querySelectorAll('.content-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });
    
    // Filter content
    contentItems.forEach(item => {
        if (filter === 'all') {
            item.classList.remove('hidden');
        } else if (filter === 'blogs' && item.classList.contains('blog-item')) {
            item.classList.remove('hidden');
        } else if (filter === 'videos' && item.classList.contains('video-item')) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Video player functionality
function loadVideo(videoId, title) {
    const iframe = document.getElementById('featured-video');
    const videoTitle = document.querySelector('#videos .max-w-4xl h3');
    
    if (iframe && videoTitle) {
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        videoTitle.textContent = title;
        
        // Scroll to featured video
        document.getElementById('videos').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.content-item, .card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('#blog-count, #video-count');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 30);
    });
}

// Newsletter subscription functionality
function subscribeNewsletter() {
    const emailInput = document.querySelector('input[type="email"]');
    
    if (emailInput) {
        const email = emailInput.value;
        
        if (email && email.includes('@')) {
            alert('Thank you for subscribing! You will receive updates on our latest resources.');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    }
}

// Enhanced search with category filtering
function enhancedSearch() {
    const searchInput = document.getElementById('search-input');
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const contentItems = document.querySelectorAll('.content-item');
    
    if (!searchInput || !activeFilterBtn) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = activeFilterBtn.getAttribute('data-filter');
    
    contentItems.forEach(item => {
        const titleElement = item.querySelector('h3');
        const descriptionElement = item.querySelector('p');
        
        if (!titleElement || !descriptionElement) return;
        
        const title = titleElement.textContent.toLowerCase();
        const description = descriptionElement.textContent.toLowerCase();
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        
        let matchesFilter = true;
        if (activeFilter !== 'all') {
            matchesFilter = (activeFilter === 'blogs' && item.classList.contains('blog-item')) ||
                           (activeFilter === 'videos' && item.classList.contains('video-item'));
        }
        
        if (matchesSearch && matchesFilter) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}
