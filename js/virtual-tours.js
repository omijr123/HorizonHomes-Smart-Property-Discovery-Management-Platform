// Virtual Tours Page Functionality

// Sample tour data with real 3D video links
const toursData = [
    {
        id: 1,
        title: "Luxury Modern Villa",
        location: "Beverly Hills, CA",
        price: 2850000,
        type: "villa",
        style: "3d",
        bedrooms: 5,
        bathrooms: 4,
        sqft: 4200,
        youtubeId: "zH9b1L4bOmI", // 3D house tour
        thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop",
        featured: true
    },
    {
        id: 2,
        title: "Manhattan Penthouse",
        location: "Manhattan, NY",
        price: 3200000,
        type: "penthouse",
        style: "3d",
        bedrooms: 4,
        bathrooms: 3, 
        sqft: 2800,
        youtubeId: "QbF6b3sKw1Q", // Luxury apartment tour
        thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop"
    },
    {
        id: 3,
        title: "Modern Family Home",
        location: "Austin, TX",
        price: 750000,
        type: "house",
        style: "360",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2500,
        youtubeId: "FhE-qkSzGdg", // Modern home tour
        thumbnail: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=250&fit=crop"
    },
    {
        id: 4,
        title: "Beachfront Condo",
        location: "Miami, FL",
        price: 950000,
        type: "condo",
        style: "vr",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        youtubeId: "3_QWpcO0aNc", // Beachfront property tour
        thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop"
    },
    {
        id: 5,
        title: "Contemporary Townhouse",
        location: "Seattle, WA",
        price: 680000,
        type: "house",
        style: "3d",
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 2000,
        youtubeId: "8mOAECFl6ZY", // Townhouse tour
        thumbnail: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop"
    },
    {
        id: 6,
        title: "Downtown Loft",
        location: "Chicago, IL",
        price: 520000,
        type: "apartment",
        style: "video",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1400,
        youtubeId: "yU6R3E6nCn0", // Loft apartment tour
        thumbnail: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop"
    }
];

let filteredTours = [...toursData];
let currentView = 'grid';

document.addEventListener('DOMContentLoaded', function() {
    initializeVirtualTours();
    loadTours();
    initializeFilters();
    initializeFeaturedTour();
    initializeVRExperience();
    initializeTourBooking();
    initializeNewsletter();
    initializeScrollAnimations();
});

function initializeVirtualTours() {
    // View toggle functionality
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentView = this.getAttribute('data-view');
            updateToursDisplay();
        });
    });
    
    // Load more button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreTours);
    }
}

function initializeFilters() {
    const filterInputs = document.querySelectorAll('.filter-select');
    const applyBtn = document.getElementById('applyFilters');
    const resetBtn = document.querySelector('.reset-filters');
    
    // Apply filters button
    if (applyBtn) {
        applyBtn.addEventListener('click', applyFilters);
    }
    
    // Reset filters button
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
    
    // Auto-apply filters on change
    filterInputs.forEach(input => {
        input.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    const location = document.getElementById('tour-location')?.value;
    const type = document.getElementById('tour-type')?.value;
    const style = document.getElementById('tour-style')?.value;
    
    filteredTours = toursData.filter(tour => {
        if (location && !tour.location.toLowerCase().includes(location)) return false;
        if (type && tour.type !== type) return false;
        if (style && tour.style !== style) return false;
        return true;
    });
    
    loadTours();
}

function resetFilters() {
    document.querySelectorAll('.filter-select').forEach(select => {
        select.value = '';
    });
    
    filteredTours = [...toursData];
    loadTours();
}

function initializeFeaturedTour() {
    const startTourBtn = document.querySelector('.start-tour-btn');
    const scheduleBtn = document.querySelector('.schedule-btn');
    const vrModeBtn = document.querySelector('.vr-mode-btn');
    const playButton = document.querySelector('.play-button');
    
    if (startTourBtn) {
        startTourBtn.addEventListener('click', () => {
            playFeaturedTour();
        });
    }
    
    if (playButton) {
        playButton.addEventListener('click', () => {
            playFeaturedTour();
        });
    }
    
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', () => {
            showScheduleModal();
        });
    }
    
    if (vrModeBtn) {
        vrModeBtn.addEventListener('click', () => {
            startVRMode('zH9b1L4bOmI');
        });
    }
    
    // Control buttons
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const vrBtn = document.querySelector('.vr-btn');
    
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    if (vrBtn) {
        vrBtn.addEventListener('click', () => startVRMode('zH9b1L4bOmI'));
    }
}

function loadTours() {
    const toursGrid = document.getElementById('tours-grid');
    if (!toursGrid) return;
    
    if (filteredTours.length === 0) {
        toursGrid.innerHTML = `
            <div class="no-tours-found">
                <i class="fas fa-search"></i>
                <h3>No tours found</h3>
                <p>Try adjusting your filter criteria</p>
                <button class="btn btn-primary" onclick="resetFilters()">Reset Filters</button>
            </div>
        `;
        return;
    }
    
    toursGrid.innerHTML = filteredTours.map(tour => createTourCard(tour)).join('');
    
    // Add event listeners to tour cards
    document.querySelectorAll('.tour-card').forEach(card => {
        const tourId = parseInt(card.getAttribute('data-tour-id'));
        const playBtn = card.querySelector('.tour-play-btn');
        
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.preventDefault();
                playTour(tourId);
            });
        }
        
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.tour-play-btn')) {
                showTourDetails(tourId);
            }
        });
    });
}

function createTourCard(tour) {
    const typeLabels = {
        '3d': '3D Virtual',
        '360': '360° Tour',
        'vr': 'VR Ready',
        'video': 'HD Video'
    };
    
    return `
        <div class="tour-card" data-tour-id="${tour.id}">
            <div class="tour-thumbnail">
                <img src="${tour.thumbnail}" alt="${tour.title}" />
                <div class="tour-type-badge">${typeLabels[tour.style]}</div>
                <button class="tour-play-btn">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="tour-card-info">
                <h4>${tour.title}</h4>
                <div class="location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${tour.location}
                </div>
                <div class="price">$${tour.price.toLocaleString()}</div>
                <div class="tour-card-features">
                    <span><i class="fas fa-bed"></i> ${tour.bedrooms} Beds</span>
                    <span><i class="fas fa-bath"></i> ${tour.bathrooms} Baths</span>
                    <span><i class="fas fa-expand-arrows-alt"></i> ${tour.sqft.toLocaleString()} sqft</span>
                </div>
            </div>
        </div>
    `;
}

function updateToursDisplay() {
    const toursGrid = document.getElementById('tours-grid');
    if (!toursGrid) return;
    
    if (currentView === 'list') {
        toursGrid.classList.add('list-view');
    } else {
        toursGrid.classList.remove('list-view');
    }
}

function playTour(tourId) {
    const tour = toursData.find(t => t.id === tourId);
    if (!tour) return;
    
    // Create modal for playing the tour
    createTourModal(tour);
}

function playFeaturedTour() {
    const featuredTour = toursData.find(t => t.featured);
    if (featuredTour) {
        playTour(featuredTour.id);
    }
}

function createTourModal(tour) {
    const modal = document.createElement('div');
    modal.className = 'tour-modal';
    modal.innerHTML = `
        <div class="tour-modal-content">
            <div class="tour-modal-header">
                <h3>${tour.title}</h3>
                <button class="tour-modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="tour-modal-body">
                <div class="tour-video-container">
                    <iframe
                        src="https://www.youtube.com/embed/${tour.youtubeId}?autoplay=1&rel=0"
                        title="${tour.title} Virtual Tour"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="tour-modal-info">
                    <div class="tour-modal-details">
                        <span><i class="fas fa-map-marker-alt"></i> ${tour.location}</span>
                        <span><i class="fas fa-dollar-sign"></i> $${tour.price.toLocaleString()}</span>
                        <span><i class="fas fa-bed"></i> ${tour.bedrooms} Beds</span>
                        <span><i class="fas fa-bath"></i> ${tour.bathrooms} Baths</span>
                        <span><i class="fas fa-expand-arrows-alt"></i> ${tour.sqft.toLocaleString()} sqft</span>
                    </div>
                    <div class="tour-modal-actions">
                        <button class="btn btn-primary" onclick="startVRMode('${tour.youtubeId}')">
                            <i class="fas fa-vr-cardboard"></i> VR Mode
                        </button>
                        <button class="btn btn-secondary" onclick="showScheduleModal()">
                            <i class="fas fa-calendar"></i> Schedule Visit
                        </button>
                        <button class="btn btn-outline" onclick="contactAgent()">
                            <i class="fas fa-phone"></i> Contact Agent
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.tour-modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Restore body scroll when modal is closed
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                if (!document.body.contains(modal)) {
                    document.body.style.overflow = 'auto';
                    observer.disconnect();
                }
            }
        });
    });
    
    observer.observe(document.body, { childList: true });
}

function startVRMode(youtubeId) {
    // Open VR-compatible YouTube link
    const vrUrl = `https://www.youtube.com/watch?v=${youtubeId}&vr=1`;
    window.open(vrUrl, '_blank');
    
    showNotification('VR mode activated! Put on your VR headset for the best experience.', 'success');
}

function toggleFullscreen() {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;
    
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

function showScheduleModal() {
    showNotification('Schedule booking feature coming soon!', 'info');
}

function contactAgent() {
    showNotification('Redirecting to contact page...', 'info');
    setTimeout(() => {
        window.location.href = 'contact.html';
    }, 1500);
}

function showTourDetails(tourId) {
    const tour = toursData.find(t => t.id === tourId);
    if (!tour) return;
    
    // For now, just play the tour
    playTour(tourId);
}

function loadMoreTours() {
    showNotification('Loading more tours...', 'info');
    // Simulate loading more tours
    setTimeout(() => {
        showNotification('All available tours are already displayed.', 'success');
    }, 1000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add required styles for modal and notifications
const additionalStyles = `
.tour-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
}

.tour-modal-content {
    background: white;
    border-radius: 20px;
    max-width: 1200px;
    width: 90%;
    max-height: 90vh;
    overflow: hidden;
    animation: slideIn 0.3s ease-out;
}

.tour-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid var(--border-color);
    background: var(--gradient-primary);
    color: white;
}

.tour-modal-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.tour-modal-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

.tour-modal-body {
    padding: 0;
}

.tour-video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
}

.tour-video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.tour-modal-info {
    padding: 30px;
}

.tour-modal-details {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 25px;
    font-size: 1.1rem;
    color: var(--text-color);
}

.tour-modal-details span {
    display: flex;
    align-items: center;
    gap: 8px;
}

.tour-modal-details i {
    color: var(--primary-color);
}

.tour-modal-actions {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

.tour-modal-actions .btn {
    padding: 12px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.no-tours-found {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 20px;
    color: var(--text-light);
}

.no-tours-found i {
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: 20px;
}

.no-tours-found h3 {
    margin-bottom: 10px;
    color: var(--text-color);
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
}

.notification.show {
    transform: translateX(0);
}

.notification-content {
    background: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 10px;
    border-left: 4px solid var(--primary-color);
}

.notification.success .notification-content {
    border-left-color: #28a745;
}

.notification.error .notification-content {
    border-left-color: #dc3545;
}

.notification button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-light);
    margin-left: auto;
}

.tours-grid.list-view {
    grid-template-columns: 1fr;
}

.tours-grid.list-view .tour-card {
    display: flex;
    align-items: stretch;
}

.tours-grid.list-view .tour-thumbnail {
    width: 300px;
    flex-shrink: 0;
}

.tours-grid.list-view .tour-card-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

@media (max-width: 768px) {
    .tour-modal-content {
        width: 95%;
        margin: 20px;
    }
    
    .tour-modal-details {
        flex-direction: column;
        gap: 10px;
    }
    
    .tour-modal-actions {
        flex-direction: column;
    }
    
    .tours-grid.list-view .tour-card {
        flex-direction: column;
    }
    
    .tours-grid.list-view .tour-thumbnail {
        width: 100%;
        height: 250px;
    }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize additional functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    initializeVRExperience();
    initializeTourBooking();
    initializeNewsletter();
    initializeScrollAnimations();
});

function initializeVRExperience() {
    const vrVisual = document.querySelector('.vr-visual');
    const downloadBtn = document.querySelector('.vr-info .btn');
    
    if (vrVisual) {
        vrVisual.addEventListener('click', function() {
            playVRDemo();
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            downloadVRApp();
        });
    }
}

function initializeTourBooking() {
    const bookingForm = document.getElementById('tour-booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleTourBooking();
        });
    }
    
    // Set minimum date to today
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSignup();
        });
    }
}

function initializeScrollAnimations() {
    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.vr-feature, .benefit, .tour-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

function playVRDemo() {
    // Create VR demo modal
    const modal = document.createElement('div');
    modal.className = 'vr-demo-modal';
    modal.innerHTML = `
        <div class="vr-demo-content">
            <div class="vr-demo-header">
                <h3>VR Experience Demo</h3>
                <button class="vr-demo-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="vr-demo-body">
                <div class="vr-instructions">
                    <h4>How to Experience VR Tours:</h4>
                    <ol>
                        <li>Put on your VR headset or use your smartphone</li>
                        <li>Open the YouTube VR app or use a VR browser</li>
                        <li>Search for "Horizon Homes Virtual Tours"</li>
                        <li>Select any property tour and enjoy!</li>
                    </ol>
                </div>
                <div class="vr-demo-video">
                    <iframe
                        src="https://www.youtube.com/embed/zH9b1L4bOmI?vr=1"
                        title="VR Demo"
                        frameborder="0"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.vr-demo-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function downloadVRApp() {
    // Simulate VR app download
    showNotification('Redirecting to app store...', 'info');
    
    // Detect device and redirect accordingly
    const userAgent = navigator.userAgent;
    let appStoreUrl = '';
    
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        appStoreUrl = 'https://apps.apple.com/app/youtube-vr/id1235902842';
    } else if (/Android/.test(userAgent)) {
        appStoreUrl = 'https://play.google.com/store/apps/details?id=com.google.android.apps.youtube.vr';
    } else {
        appStoreUrl = 'https://store.oculus.com/apps/rift/';
    }
    
    setTimeout(() => {
        window.open(appStoreUrl, '_blank');
    }, 1500);
}

function handleTourBooking() {
    const formData = new FormData(document.getElementById('tour-booking-form'));
    const bookingData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateBookingForm(bookingData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('#tour-booking-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear form
        document.getElementById('tour-booking-form').reset();
        
        // Show success message
        showNotification('Tour booking submitted successfully! We\'ll contact you shortly.', 'success');
        
        // Send confirmation email (simulated)
        sendBookingConfirmation(bookingData);
    }, 2000);
}

function validateBookingForm(data) {
    const requiredFields = ['name', 'email', 'phone', 'property', 'date', 'time'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field.`, 'error');
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Validate phone
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }
    
    // Validate date (not in past)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('Please select a future date.', 'error');
        return false;
    }
    
    return true;
}

function sendBookingConfirmation(bookingData) {
    // Simulate sending confirmation email
    console.log('Booking confirmation sent:', bookingData);
    
    // Show additional success actions
    setTimeout(() => {
        const confirmation = document.createElement('div');
        confirmation.className = 'booking-confirmation';
        confirmation.innerHTML = `
            <div class="confirmation-content">
                <i class="fas fa-check-circle"></i>
                <h4>Booking Confirmed!</h4>
                <p>Reference ID: VT${Date.now().toString().slice(-6)}</p>
                <p>You'll receive an email confirmation shortly.</p>
            </div>
        `;
        
        document.querySelector('.booking-form').appendChild(confirmation);
        
        setTimeout(() => {
            if (confirmation.parentNode) {
                confirmation.remove();
            }
        }, 5000);
    }, 1000);
}

function handleNewsletterSignup() {
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.newsletter-form button');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear input
        emailInput.value = '';
        
        // Show success message
        showNotification('Successfully subscribed to our newsletter!', 'success');
    }, 1500);
}

// Add CSS animations for scroll effects
const scrollAnimationStyles = `
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.vr-demo-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
}

.vr-demo-content {
    background: white;
    border-radius: 20px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow: hidden;
    animation: slideIn 0.3s ease-out;
}

.vr-demo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid var(--border-color);
    background: var(--gradient-primary);
    color: white;
}

.vr-demo-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.vr-demo-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

.vr-demo-body {
    padding: 30px;
}

.vr-instructions {
    margin-bottom: 30px;
}

.vr-instructions h4 {
    color: var(--text-color);
    margin-bottom: 15px;
}

.vr-instructions ol {
    color: var(--text-light);
    padding-left: 20px;
}

.vr-instructions li {
    margin-bottom: 8px;
    line-height: 1.5;
}

.vr-demo-video {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
}

.vr-demo-video iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.booking-confirmation {
    margin-top: 20px;
    padding: 20px;
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
    border-radius: 15px;
    text-align: center;
    animation: slideInUp 0.5s ease-out;
}

.confirmation-content i {
    font-size: 3rem;
    margin-bottom: 15px;
}

.confirmation-content h4 {
    margin-bottom: 10px;
    font-size: 1.5rem;
}

.confirmation-content p {
    margin: 5px 0;
    opacity: 0.9;
}

@media (max-width: 768px) {
    .vr-demo-content {
        width: 95%;
        margin: 20px;
    }
    
    .vr-demo-body {
        padding: 20px;
    }
}
`;

// Inject the additional styles
const additionalStyleSheet = document.createElement('style');
additionalStyleSheet.textContent = scrollAnimationStyles;
document.head.appendChild(additionalStyleSheet);
