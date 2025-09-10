// Dynamic Resources Page Functionality
// Handles blogs, YouTube videos, and dynamic routing

class ResourcesManager {
    constructor() {
        this.blogs = [];
        this.youtubeVideos = [];
        this.currentPage = 1;
        this.blogsPerPage = 6;
        this.isLoading = false;
        
        this.init();
    }

    async init() {
        await this.loadBlogs();
        await this.loadYouTubeVideos();
        this.setupEventListeners();
        this.setupRouting();
    }

    // Blog Management
    async loadBlogs() {
        try {
            const response = await fetch('data/blogs.json');
            const data = await response.json();
            this.blogs = data.blogs.filter(blog => blog.status === 'published');
            this.renderBlogs();
        } catch (error) {
            console.error('Error loading blogs:', error);
            this.showError('Failed to load blogs. Please try again later.');
        }
    }

    renderBlogs(page = 1) {
        const startIndex = (page - 1) * this.blogsPerPage;
        const endIndex = startIndex + this.blogsPerPage;
        const blogsToShow = this.blogs.slice(startIndex, endIndex);
        
        const blogsContainer = document.getElementById('blog-grid');
        if (!blogsContainer) return;

        if (page === 1) {
            blogsContainer.innerHTML = '';
        }

        blogsToShow.forEach(blog => {
            const blogCard = this.createBlogCard(blog);
            blogsContainer.appendChild(blogCard);
        });

        this.updatePagination();
        this.animateBlogCards();
    }

    createBlogCard(blog) {
        const card = document.createElement('article');
        card.className = 'content-item blog-item bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group';
        card.setAttribute('data-blog-id', blog.id);
        
        const categoryColor = this.getCategoryColor(blog.category);
        
        card.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${blog.featuredImage || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'}" 
                     alt="${blog.title}"
                     class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute top-4 left-4">
                    <span class="text-white px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400">${blog.category}</span>
                </div>
                <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="bg-white rounded-full p-2 shadow-lg">
                        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-center text-sm text-gray-500 mb-3">
                    <span>${this.formatDate(blog.publishDate)}</span>
                    <span class="mx-2">•</span>
                    <span>${blog.views.toLocaleString()} views</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors cursor-pointer blog-title">
                    ${blog.title}
                </h3>
                <p class="text-gray-600 text-sm mb-4">
                    ${blog.excerpt}
                </p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center text-sm text-gray-500">
                        <img src="${this.getAuthorImage(blog.author)}" alt="${blog.author}" class="w-6 h-6 rounded-full mr-2">
                        <span>${blog.author}</span>
                    </div>
                    <button class="text-yellow-600 hover:text-yellow-700 transition-colors font-medium read-more-btn">
                        Read More →
                    </button>
                </div>
            </div>
        `;

        // Add click event listeners
        card.querySelector('.blog-title').addEventListener('click', () => this.openBlogDetail(blog.id));
        card.querySelector('.read-more-btn').addEventListener('click', () => this.openBlogDetail(blog.id));

        return card;
    }

    // YouTube Management
    async loadYouTubeVideos() {
        try {
            const configResponse = await fetch('data/youtube-config.json');
            const config = await configResponse.json();
            
            if (config.apiKey && config.channelId) {
                await this.fetchYouTubeVideos(config);
            } else {
                this.renderFallbackVideos(config.fallbackVideos);
            }
        } catch (error) {
            console.error('Error loading YouTube videos:', error);
            this.renderFallbackVideos();
        }
    }

    async fetchYouTubeVideos(config) {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${config.channelId}&maxResults=${config.maxResults}&order=date&type=video&key=${config.apiKey}`
            );
            
            if (!response.ok) {
                throw new Error('YouTube API request failed');
            }
            
            const data = await response.json();
            this.youtubeVideos = data.items;
            this.renderYouTubeVideos();
        } catch (error) {
            console.error('Error fetching YouTube videos:', error);
            this.renderFallbackVideos(config.fallbackVideos);
        }
    }

    renderYouTubeVideos() {
        const videoGrid = document.getElementById('video-grid');
        if (!videoGrid || !this.youtubeVideos.length) return;

        // Update featured video iframe
        const featuredIframe = document.getElementById('featured-video');
        if (featuredIframe && this.youtubeVideos[0]) {
            const featuredVideo = this.youtubeVideos[0];
            featuredIframe.src = `https://www.youtube.com/embed/${featuredVideo.id.videoId}`;
            
            // Update featured video title and description
            const featuredTitle = document.querySelector('#featured-video').parentElement.parentElement.parentElement.querySelector('h3');
            const featuredDesc = document.querySelector('#featured-video').parentElement.parentElement.parentElement.querySelector('p');
            if (featuredTitle) featuredTitle.textContent = featuredVideo.snippet.title;
            if (featuredDesc) featuredDesc.textContent = featuredVideo.snippet.description;
        }

        // Render video grid (skip first video as it's featured)
        const gridVideos = this.youtubeVideos.slice(1);
        videoGrid.innerHTML = gridVideos.map(video => this.createVideoCard(video)).join('');

        this.setupVideoEventListeners();
    }

    createVideoCard(video) {
        return `
            <div class="content-item video-item bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                 onclick="loadVideo('${video.id.videoId}', '${video.snippet.title}')">
                <div class="relative">
                    <img src="${video.snippet.thumbnails.medium.url}" 
                         alt="${video.snippet.title}" 
                         class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div class="bg-white bg-opacity-90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                            <svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                    <div class="absolute top-4 right-4">
                        <span class="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">${this.formatDuration(video.contentDetails?.duration || 'PT0S')}</span>
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex items-center text-sm text-gray-500 mb-3">
                        <span>${this.formatDate(video.snippet.publishedAt)}</span>
                        <span class="mx-2">•</span>
                        <span>${this.formatViewCount(video.statistics?.viewCount || '0')} views</span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                        ${video.snippet.title}
                    </h3>
                    <p class="text-gray-600 text-sm">
                        ${video.snippet.description.substring(0, 100)}...
                    </p>
                </div>
            </div>
        `;
    }

    renderFallbackVideos(fallbackVideos = []) {
        const videoGrid = document.getElementById('video-grid');
        if (!videoGrid) return;

        // Keep the static video cards as fallback
        videoGrid.innerHTML = `
            <!-- Video Card 1 -->
            <div class="content-item video-item bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                onclick="loadVideo('dQw4w9WgXcQ', 'Understanding GST Compliance')">
                <div class="relative">
                    <img src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" alt="GST Compliance"
                        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div class="bg-white bg-opacity-90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                            <svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                    <div class="absolute top-4 right-4">
                        <span class="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">15:32</span>
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex items-center text-sm text-gray-500 mb-3">
                        <span>March 15, 2024</span>
                        <span class="mx-2">•</span>
                        <span>1.2K views</span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                        Understanding GST Compliance
                    </h3>
                    <p class="text-gray-600 text-sm">
                        A detailed explanation of GST compliance requirements and best practices for businesses.
                    </p>
                </div>
            </div>
        `;
    }

    // Dynamic Routing
    setupRouting() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            this.handleRouteChange(event.state);
        });

        // Handle initial route
        this.handleRouteChange(window.location.hash);
    }

    handleRouteChange(hash) {
        const route = hash.replace('#', '');
        
        if (route.startsWith('blog/')) {
            const blogId = route.replace('blog/', '');
            this.showBlogDetail(blogId);
        } else {
            this.showBlogList();
        }
    }

    openBlogDetail(blogId) {
        window.location.hash = `blog/${blogId}`;
        this.showBlogDetail(blogId);
    }

    showBlogDetail(blogId) {
        const blog = this.blogs.find(b => b.id === blogId);
        if (!blog) {
            this.showError('Blog not found');
            return;
        }

        const mainContent = document.querySelector('main');
        if (!mainContent) return;

        mainContent.innerHTML = this.createBlogDetailPage(blog);
        this.setupBlogDetailEvents();
    }

    createBlogDetailPage(blog) {
        const author = this.getAuthorInfo(blog.author);
        
        return `
            <div class="min-h-screen bg-white">
                <!-- Blog Header -->
                <section class="py-16 lg:py-24 bg-gradient-to-br from-[#1A1A1A] via-[#333740] to-[#1A1A1A]">
                    <div class="container mx-auto px-8 lg:px-16 xl:px-20">
                        <div class="max-w-4xl mx-auto text-center">
                            <div class="inline-flex items-center px-4 py-2 rounded-full mb-6 bg-[#333740]/50 backdrop-blur-sm border border-[#FFD54F]/30">
                                <span class="text-sm font-medium text-[#FFD54F] font-spartan">${blog.category}</span>
                            </div>
                            <h1 class="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight font-spartan">
                                ${blog.title}
                            </h1>
                            <div class="flex items-center justify-center space-x-6 text-[#EAEAEA]/80 mb-8">
                                <div class="flex items-center">
                                    <img src="${author.image}" alt="${author.name}" class="w-10 h-10 rounded-full mr-3">
                                    <div>
                                        <p class="font-semibold">${author.name}</p>
                                        <p class="text-sm">${author.role}</p>
                                    </div>
                                </div>
                                <span>${this.formatDate(blog.publishDate)}</span>
                                <span>${blog.readTime}</span>
                                <span>${blog.views.toLocaleString()} views</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Blog Content -->
                <section class="py-16 lg:py-20">
                    <div class="container mx-auto px-8 lg:px-16 xl:px-20">
                        <div class="max-w-4xl mx-auto">
                            <div class="prose prose-lg max-w-none blog-content">
                                ${this.formatBlogContent(blog.content)}
                            </div>
                            
                            <!-- Author Bio -->
                            <div class="mt-16 p-8 bg-[#EAEAEA]/30 rounded-2xl">
                                <div class="flex items-start space-x-6">
                                    <img src="${author.image}" alt="${author.name}" class="w-20 h-20 rounded-full">
                                    <div>
                                        <h3 class="text-2xl font-bold text-[#1A1A1A] mb-2 font-spartan">${author.name}</h3>
                                        <p class="text-[#FFD54F] font-semibold mb-3">${author.role}</p>
                                        <p class="text-[#333740] mb-4">${author.bio}</p>
                                        <a href="mailto:${author.email}" 
                                           class="inline-flex items-center px-6 py-3 bg-[#FFD54F] text-[#1A1A1A] font-semibold rounded-xl hover:bg-[#FFD54F]/90 transition-all duration-300">
                                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                            Contact ${author.name.split(' ')[0]}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- Back to Resources -->
                            <div class="mt-12 text-center">
                                <button onclick="resourcesManager.showBlogList()" 
                                        class="inline-flex items-center px-8 py-4 bg-[#333740] text-white font-semibold rounded-xl hover:bg-[#1A1A1A] transition-all duration-300">
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Resources
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    showBlogList() {
        window.location.hash = '';
        window.location.reload(); // Simple reload to show original page
    }

    // Utility Functions
    getCategoryColor(category) {
        const colors = {
            'Tax Law': 'from-[#FFD54F]/20 to-[#333740]/20',
            'Strategy': 'from-[#26A69A]/20 to-[#333740]/20',
            'Compliance': 'from-[#3F51B5]/20 to-[#333740]/20',
            'Advisory': 'from-[#E91E63]/20 to-[#333740]/20',
            'Finance': 'from-[#FF9800]/20 to-[#333740]/20',
            'Innovation': 'from-[#4CAF50]/20 to-[#333740]/20'
        };
        return colors[category] || 'from-[#FFD54F]/20 to-[#333740]/20';
    }

    getAuthorImage(authorName) {
        const authorImages = {
            'Deepak Kumar Jain': '/images/deepak.jpg',
            'Vivek Sarin': '/images/vivek.jpg',
            'Shreyas Shrivastava': '/images/shreya.jpg'
        };
        return authorImages[authorName] || '/images/default-author.jpg';
    }

    getAuthorInfo(authorName) {
        const authors = {
            'Deepak Kumar Jain': {
                name: 'Deepak Kumar Jain',
                role: 'Founding Partner',
                email: 'deepak@lexetal.com',
                bio: 'Chartered Accountant with 24+ years of experience in Indirect Taxes',
                image: '/images/deepak.jpg'
            },
            'Vivek Sarin': {
                name: 'Vivek Sarin',
                role: 'Founding Partner',
                email: 'vivek@lexetal.com',
                bio: 'Litigation Specialist & GST & Indirect Tax Advisor',
                image: '/images/vivek.jpg'
            },
            'Shreyas Shrivastava': {
                name: 'Shreyas Shrivastava',
                role: 'Founding Partner',
                email: 'shreyas@lexetal.com',
                bio: 'Insolvency & Bankruptcy Specialist & Legal Strategist',
                image: '/images/shreya.jpg'
            }
        };
        return authors[authorName] || authors['Deepak Kumar Jain'];
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    formatDuration(duration) {
        // Convert ISO 8601 duration (PT4M13S) to readable format (4:13)
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!match) return '0:00';
        
        const hours = parseInt(match[1] || '0');
        const minutes = parseInt(match[2] || '0');
        const seconds = parseInt(match[3] || '0');
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    formatViewCount(viewCount) {
        const count = parseInt(viewCount);
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M';
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        }
        return count.toString();
    }

    formatBlogContent(content) {
        // Convert markdown-like content to HTML
        return content
            .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-[#1A1A1A] mb-4 mt-8 font-spartan">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-[#1A1A1A] mb-6 mt-12 font-spartan">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-[#1A1A1A] mb-8 mt-16 font-spartan">$1</h1>')
            .replace(/^\* (.*$)/gim, '<li class="mb-2">$1</li>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            .replace(/\n\n/g, '</p><p class="mb-6 text-[#333740] leading-relaxed">')
            .replace(/^(?!<[h|l])/gm, '<p class="mb-6 text-[#333740] leading-relaxed">')
            .replace(/(<li.*<\/li>)/gs, '<ul class="list-disc list-inside mb-6 space-y-2">$1</ul>');
    }

    setupEventListeners() {
        // Load more blogs button
        const loadMoreBtn = document.getElementById('load-more-blogs');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.renderBlogs(this.currentPage);
            });
        }

        // Blog filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterBlogs(category);
            });
        });
    }

    setupVideoEventListeners() {
        // Video thumbnail clicks
        document.querySelectorAll('.video-thumbnail, .featured-video-thumbnail').forEach(thumbnail => {
            thumbnail.addEventListener('click', (e) => {
                const videoId = e.target.dataset.videoId;
                this.openVideoModal(videoId);
            });
        });

        // Play button clicks
        document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const videoId = e.target.closest('[data-video-id]').dataset.videoId;
                this.openVideoModal(videoId);
            });
        });
    }

    setupBlogDetailEvents() {
        // Add any blog detail specific event listeners here
    }

    openVideoModal(videoId) {
        // Create video modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div class="flex justify-between items-center p-6 border-b">
                    <h3 class="text-xl font-bold text-[#1A1A1A] font-spartan">Watch Video</h3>
                    <button class="text-gray-500 hover:text-gray-700 close-modal">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-6">
                    <div class="aspect-video">
                        <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                class="w-full h-full rounded-lg">
                        </iframe>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    filterBlogs(category) {
        const filteredBlogs = category === 'all' ? this.blogs : this.blogs.filter(blog => blog.category === category);
        
        const blogsContainer = document.getElementById('blog-grid');
        if (!blogsContainer) return;

        blogsContainer.innerHTML = '';
        filteredBlogs.forEach(blog => {
            const blogCard = this.createBlogCard(blog);
            blogsContainer.appendChild(blogCard);
        });

        this.animateBlogCards();
    }

    updatePagination() {
        const totalPages = Math.ceil(this.blogs.length / this.blogsPerPage);
        const loadMoreBtn = document.getElementById('load-more-blogs');
        
        if (loadMoreBtn) {
            if (this.currentPage >= totalPages) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    }

    animateBlogCards() {
        const cards = document.querySelectorAll('.blog-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 5000);
    }
}

// Global functions for HTML onclick handlers
window.loadVideo = function(videoId, title) {
    if (window.resourcesManager) {
        window.resourcesManager.openVideoModal(videoId);
    }
};

window.filterContent = function(filter) {
    if (window.resourcesManager) {
        if (filter === 'blogs' || filter === 'all') {
            window.resourcesManager.filterBlogs(filter === 'all' ? 'all' : 'all');
        }
        // Update filter button states
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('bg-[#FFD54F]', 'text-[#1A1A1A]');
            btn.classList.add('text-gray-600');
        });
        const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (activeBtn) {
            activeBtn.classList.add('bg-[#FFD54F]', 'text-[#1A1A1A]');
            activeBtn.classList.remove('text-gray-600');
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.resourcesManager = new ResourcesManager();
});
