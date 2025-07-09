// Authentication Handler for Buy/Sell/Rent Pages

class AuthHandler {
    constructor() {
        this.isAuthenticated = false; // Simulate authentication state
        this.init();
    }

    init() {
        // Check if user is logged in (simulate with localStorage)
        this.checkAuthStatus();
        
        // Add event listeners
        this.addEventListeners();
        
        // Load auth modal styles 
        this.loadAuthStyles();
    }

    checkAuthStatus() {
        // Check if user is logged in (you can replace this with actual auth check)
        const authToken = localStorage.getItem('horizonhomes_auth_token');
        const userData = localStorage.getItem('horizonhomes_user_data');
        
        this.isAuthenticated = !!(authToken && userData);
        
        if (this.isAuthenticated) {
            this.enableAuthRequiredElements();
        } else {
            this.setupAuthRequiredElements();
        }
    }

    addEventListeners() {
        // Auth required buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.auth-required')) {
                e.preventDefault();
                e.stopPropagation();
                
                if (!this.isAuthenticated) {
                    this.showAuthModal();
                } else {
                    this.handleAuthenticatedAction(e.target.closest('.auth-required'));
                }
            }
        });

        // Close modal events
        document.addEventListener('click', (e) => {
            if (e.target.id === 'closeAuthModal' || e.target.closest('#closeAuthModal')) {
                this.hideAuthModal();
            }
            
            if (e.target.id === 'authModal') {
                this.hideAuthModal();
            }
        });

        // Toggle service sections in rent page
        document.addEventListener('click', (e) => {
            if (e.target.closest('.toggle-btn')) {
                if (!this.isAuthenticated) {
                    e.preventDefault();
                    this.showAuthModal();
                } else {
                    this.handleServiceToggle(e.target.closest('.toggle-btn'));
                }
            }
        });

        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.closest('form') && !this.isAuthenticated) {
                e.preventDefault();
                this.showAuthModal();
            }
        });
    }

    setupAuthRequiredElements() {
        // Disable form elements that require auth
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (!input.hasAttribute('data-allow-guest')) {
                    input.disabled = true;
                }
            });
        });

        // Update button texts to indicate auth requirement
        const authButtons = document.querySelectorAll('.auth-required');
        authButtons.forEach(button => {
            const originalText = button.textContent.trim();
            if (!button.hasAttribute('data-original-text')) {
                button.setAttribute('data-original-text', originalText);
                button.innerHTML = `<i class="fas fa-lock"></i> ${originalText}`;
            }
        });
    }

    enableAuthRequiredElements() {
        // Enable form elements
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.disabled = false;
            });
        });

        // Restore button texts
        const authButtons = document.querySelectorAll('.auth-required');
        authButtons.forEach(button => {
            const originalText = button.getAttribute('data-original-text');
            if (originalText) {
                button.textContent = originalText;
            }
        });

        // Hide auth notices
        const authNotices = document.querySelectorAll('.auth-notice, .auth-warning');
        authNotices.forEach(notice => {
            notice.style.display = 'none';
        });
    }

    showAuthModal() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Add animation
            setTimeout(() => {
                modal.querySelector('.auth-modal-content').style.transform = 'scale(1)';
                modal.querySelector('.auth-modal-content').style.opacity = '1';
            }, 10);
        }
    }

    hideAuthModal() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    handleAuthenticatedAction(element) {
        const service = element.getAttribute('data-service');
        
        switch (service) {
            case 'search':
            case 'search-rentals':
                window.location.href = 'properties.html';
                break;
            case 'mortgage':
                window.location.href = 'mortgage.html';
                break;
            case 'agent':
            case 'contact-agent':
            case 'contact-specialist':
                window.location.href = 'contact.html';
                break;
            case 'calculator':
                window.location.href = 'mortgage.html';
                break;
            case 'neighborhoods':
                window.location.href = 'neighborhoods.html';
                break;
            case 'all-properties':
            case 'browse':
            case 'browse-rentals':
                window.location.href = 'properties.html';
                break;
            case 'all-rentals':
                window.location.href = 'properties.html?type=rent';
                break;
            case 'home-value':
                this.handleHomeValueCalculation();
                break;
            case 'list-property':
                this.handlePropertyListing();
                break;
            default:
                this.showNotification('Service available to authenticated users!', 'success');
        }
    }

    handleServiceToggle(button) {
        const service = button.getAttribute('data-service');
        const allButtons = document.querySelectorAll('.toggle-btn');
        const allContent = document.querySelectorAll('.service-content');
        
        // Remove active class from all buttons and content
        allButtons.forEach(btn => btn.classList.remove('active'));
        allContent.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const contentId = service === 'tenant' ? 'tenant-content' : 'landlord-content';
        const content = document.getElementById(contentId);
        if (content) {
            content.classList.add('active');
        }
    }

    handleHomeValueCalculation() {
        // Simulate home value calculation
        this.showNotification('Calculating your home value...', 'info');
        
        setTimeout(() => {
            const estimatedValue = Math.floor(Math.random() * (800000 - 300000) + 300000);
            this.showNotification(`Estimated home value: $${estimatedValue.toLocaleString()}`, 'success');
        }, 2000);
    }

    handlePropertyListing() {
        // Simulate property listing submission
        this.showNotification('Processing your property listing...', 'info');
        
        setTimeout(() => {
            this.showNotification('Property listing submitted successfully! We\'ll contact you within 24 hours.', 'success');
        }, 2000);
    }

    loadAuthStyles() {
        // Load auth modal CSS if not already loaded
        if (!document.querySelector('link[href*="auth-modal.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/auth-modal.css';
            document.head.appendChild(link);
        }
    }

    // Simulate login (for testing)
    simulateLogin(userData = { name: 'Test User', email: 'test@example.com' }) {
        localStorage.setItem('horizonhomes_auth_token', 'test_token_' + Date.now());
        localStorage.setItem('horizonhomes_user_data', JSON.stringify(userData));
        
        this.isAuthenticated = true;
        this.enableAuthRequiredElements();
        this.hideAuthModal();
        
        this.showNotification('Successfully logged in!', 'success');
    }

    // Simulate logout
    simulateLogout() {
        localStorage.removeItem('horizonhomes_auth_token');
        localStorage.removeItem('horizonhomes_user_data');
        
        this.isAuthenticated = false;
        this.setupAuthRequiredElements();
        
        this.showNotification('Successfully logged out!', 'info');
    }

    showNotification(message, type = 'info') {
        // Create notification element
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
}

// Initialize auth handler when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.authHandler = new AuthHandler();
    
    // Add test buttons for development (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const testControls = document.createElement('div');
        testControls.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 9999; background: white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 12px;';
        testControls.innerHTML = `
            <div>Test Controls:</div>
            <button onclick="authHandler.simulateLogin()" style="margin: 2px; padding: 5px; font-size: 10px;">Login</button>
            <button onclick="authHandler.simulateLogout()" style="margin: 2px; padding: 5px; font-size: 10px;">Logout</button>
        `;
        document.body.appendChild(testControls);
    }
});

// Notification styles
const notificationStyles = `
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
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
