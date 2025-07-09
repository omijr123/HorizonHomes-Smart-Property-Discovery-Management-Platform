// Property Details JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializePropertyDetails();
});

function initializePropertyDetails() {
    // Initialize image gallery
    initImageGallery();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize property actions
    initPropertyActions();
    
    // Initialize virtual tour
    initVirtualTour();
}

// Image Gallery Functions
function initImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail-grid img');
    const mainImage = document.getElementById('mainImage');
    
    if (thumbnails.length > 0 && mainImage) {  
        // Set first thumbnail as active
        thumbnails[0].classList.add('active');
        
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Change main image
                changeMainImage(this.src);
            });
        });
    }
}

function changeMainImage(src) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.style.opacity = '0.7';
        
        setTimeout(() => {
            mainImage.src = src;
            mainImage.style.opacity = '1';
        }, 200);
    }
}

function openGallery() {
    // Create gallery modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal active';
    modal.innerHTML = `
        <span class="gallery-close">&times;</span>
        <img src="${document.getElementById('mainImage').src}" alt="Property Image">
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.gallery-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });
}

// Contact Form Functions
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Message sent successfully! The agent will contact you soon.', 'success');
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Property Actions
function initPropertyActions() {
    // Save to favorites
    const saveBtn = document.querySelector('.btn:has(.fa-heart)');
    if (saveBtn) {
        saveBtn.addEventListener('click', handleSaveToFavorites);
    }
    
    // Share property
    const shareBtn = document.querySelector('.btn:has(.fa-share)');
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShareProperty);
    }
    
    // Mortgage calculator
    const calcBtn = document.querySelector('.btn:has(.fa-calculator)');
    if (calcBtn) {
        calcBtn.addEventListener('click', handleMortgageCalculator);
    }
}

function handleSaveToFavorites(e) {
    e.preventDefault();
    
    const btn = e.currentTarget;
    const icon = btn.querySelector('i');
    const text = btn.querySelector('span') || btn;
    
    // Check if already saved
    const isSaved = icon.classList.contains('fas');
    
    if (isSaved) {
        // Remove from favorites
        icon.classList.remove('fas');
        icon.classList.add('far');
        if (btn.querySelector('span')) {
            text.textContent = ' Save to Favorites';
        }
        showNotification('Property removed from favorites', 'info');
    } else {
        // Add to favorites
        icon.classList.remove('far');
        icon.classList.add('fas');
        if (btn.querySelector('span')) {
            text.textContent = ' Saved to Favorites';
        }
        showNotification('Property saved to favorites!', 'success');
    }
    
    // Add animation
    btn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
}

function handleShareProperty(e) {
    e.preventDefault();
    
    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: 'Check out this amazing property!',
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Property link copied to clipboard!', 'success');
        }).catch(() => {
            // Show share modal as fallback
            showShareModal();
        });
    }
}

function showShareModal() {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <h3>Share This Property</h3>
            <div class="share-links">
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-link facebook">
                    <i class="fab fa-facebook-f"></i> Facebook
                </a>
                <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out this amazing property!" target="_blank" class="share-link twitter">
                    <i class="fab fa-twitter"></i> Twitter
                </a>
                <a href="mailto:?subject=Check out this property&body=${encodeURIComponent(window.location.href)}" class="share-link email">
                    <i class="fas fa-envelope"></i> Email
                </a>
            </div>
            <div class="share-url">
                <input type="text" value="${window.location.href}" readonly>
                <button onclick="copyShareUrl(this)">Copy</button>
            </div>
            <button class="close-share" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function copyShareUrl(button) {
    const input = button.previousElementSibling;
    input.select();
    document.execCommand('copy');
    
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = 'Copy';
    }, 2000);
}

function handleMortgageCalculator(e) {
    e.preventDefault();
    
    // Get property price from the page
    const priceElement = document.querySelector('.property-price-main .price');
    const price = priceElement ? priceElement.textContent.replace(/[$,]/g, '') : '0';
    
    // Open mortgage calculator (could be a modal or redirect)
    showMortgageCalculator(price);
}

function showMortgageCalculator(propertyPrice) {
    const modal = document.createElement('div');
    modal.className = 'mortgage-modal';
    modal.innerHTML = `
        <div class="mortgage-modal-content">
            <div class="mortgage-header">
                <h3>Mortgage Calculator</h3>
                <button class="close-mortgage" onclick="this.closest('.mortgage-modal').remove()">×</button>
            </div>
            <div class="mortgage-form">
                <div class="form-group">
                    <label>Home Price</label>
                    <input type="number" id="homePrice" value="${propertyPrice}" placeholder="Home Price">
                </div>
                <div class="form-group">
                    <label>Down Payment</label>
                    <input type="number" id="downPayment" placeholder="Down Payment">
                </div>
                <div class="form-group">
                    <label>Interest Rate (%)</label>
                    <input type="number" id="interestRate" step="0.01" placeholder="Interest Rate">
                </div>
                <div class="form-group">
                    <label>Loan Term (years)</label>
                    <select id="loanTerm">
                        <option value="15">15 years</option>
                        <option value="30" selected>30 years</option>
                    </select>
                </div>
                <button onclick="calculateMortgage()" class="btn btn-primary">Calculate</button>
                <div id="mortgageResult" style="margin-top: 20px;"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function calculateMortgage() {
    const homePrice = parseFloat(document.getElementById('homePrice').value) || 0;
    const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    const loanTerm = parseInt(document.getElementById('loanTerm').value) || 30;
    
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else {
        monthlyPayment = loanAmount / totalPayments;
    }
    
    const totalInterest = (monthlyPayment * totalPayments) - loanAmount;
    
    document.getElementById('mortgageResult').innerHTML = `
        <div class="mortgage-results">
            <h4>Calculation Results</h4>
            <div class="result-item">
                <span>Monthly Payment:</span>
                <strong>$${monthlyPayment.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
            </div>
            <div class="result-item">
                <span>Total Interest:</span>
                <strong>$${totalInterest.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
            </div>
            <div class="result-item">
                <span>Total Amount:</span>
                <strong>$${(loanAmount + totalInterest).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
            </div>
        </div>
    `;
}

// Virtual Tour
function initVirtualTour() {
    const virtualTourBtn = document.querySelector('.virtual-tour-btn');
    
    if (virtualTourBtn) {
        virtualTourBtn.addEventListener('click', handleVirtualTour);
    }
}

function handleVirtualTour(e) {
    e.preventDefault();
    
    // Create virtual tour modal
    const modal = document.createElement('div');
    modal.className = 'virtual-tour-modal';
    modal.innerHTML = `
        <div class="virtual-tour-content">
            <div class="tour-header">
                <h3>Virtual Tour</h3>
                <button class="close-tour" onclick="this.closest('.virtual-tour-modal').remove()">×</button>
            </div>
            <div class="tour-viewer">
                <div class="tour-placeholder">
                    <i class="fas fa-vr-cardboard"></i>
                    <h4>360° Virtual Tour</h4>
                    <p>Experience this property in immersive 360° virtual reality</p>
                    <div class="tour-controls">
                        <button class="btn btn-primary">Start Tour</button>
                        <button class="btn btn-secondary">VR Mode</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Utility Functions
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

// Smooth scrolling for anchor links
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

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
