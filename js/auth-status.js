// Authentication Status Manager

class AuthStatusManager {
    constructor() {
        this.init();
    }

    init() {
        this.updateNavigation();
        this.bindEvents();
    }

    // Check if user is authenticated
    isAuthenticated() {
        const token = localStorage.getItem('horizonhomes_auth_token');
        const userData = localStorage.getItem('horizonhomes_user_data');
        return !!(token && userData);
    }

    // Get user data
    getUserData() { 
        const userData = localStorage.getItem('horizonhomes_user_data');
        return userData ? JSON.parse(userData) : null;
    }

    // Update navigation based on auth status
    updateNavigation() {
        const navAuth = document.getElementById('navAuth');
        if (!navAuth) return;

        if (this.isAuthenticated()) {
            const userData = this.getUserData();
            navAuth.innerHTML = this.getAuthenticatedNavHTML(userData);
        } else {
            navAuth.innerHTML = this.getGuestNavHTML();
        }
    }

    // HTML for authenticated user navigation
    getAuthenticatedNavHTML(userData) {
        const initials = this.getInitials(userData.firstName, userData.lastName);
        return `
            <div class="nav-dropdown">
                <div class="nav-user-info">
                    <div class="user-avatar">${initials}</div>
                    <div class="user-info">
                        <span class="user-name">${userData.firstName} ${userData.lastName}</span>
                        <span class="user-status">Verified Member</span>
                    </div>
                    <i class="fas fa-chevron-down" style="color: var(--text-light); font-size: 0.8rem;"></i>
                </div>
                <div class="nav-dropdown-menu">
                    <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
                    <a href="my-properties.html"><i class="fas fa-home"></i> My Properties</a>
                    <a href="favorites.html"><i class="fas fa-heart"></i> Favorites</a>
                    <a href="messages.html"><i class="fas fa-envelope"></i> Messages</a>
                    <a href="settings.html"><i class="fas fa-cog"></i> Settings</a>
                    <a href="#" class="logout-btn" onclick="authStatusManager.logout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            </div>
        `;
    }

    // HTML for guest navigation
    getGuestNavHTML() {
        return `
            <a href="login.html" class="nav-link">Login</a>
            <a href="register.html" class="btn-outline-small">Register</a>
        `;
    }

    // Get user initials
    getInitials(firstName, lastName) {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    }

    // Login user
    login(userData, token = null) {
        // Store auth data
        localStorage.setItem('horizonhomes_user_data', JSON.stringify(userData));
        localStorage.setItem('horizonhomes_auth_token', token || this.generateToken());
        localStorage.setItem('horizonhomes_login_time', new Date().toISOString());

        // Update navigation
        this.updateNavigation();

        // Show success message if on login page
        if (window.location.pathname.includes('login.html')) {
            this.showLoginSuccess(userData);
        }

        // Trigger auth change event
        this.triggerAuthChange(true);
    }

    // Register user
    register(userData) {
        // Store auth data
        localStorage.setItem('horizonhomes_user_data', JSON.stringify(userData));
        localStorage.setItem('horizonhomes_auth_token', this.generateToken());
        localStorage.setItem('horizonhomes_login_time', new Date().toISOString());

        // Update navigation
        this.updateNavigation();

        // Show success message if on register page
        if (window.location.pathname.includes('register.html')) {
            this.showRegistrationSuccess(userData);
        }

        // Trigger auth change event
        this.triggerAuthChange(true);
    }

    // Logout user
    logout() {
        // Clear auth data
        localStorage.removeItem('horizonhomes_user_data');
        localStorage.removeItem('horizonhomes_auth_token');
        localStorage.removeItem('horizonhomes_login_time');

        // Update navigation
        this.updateNavigation();

        // Show notification
        this.showNotification('You have been logged out successfully.', 'info');

        // Redirect to home if on protected page
        const protectedPages = ['profile.html', 'my-properties.html', 'favorites.html', 'messages.html', 'settings.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage)) {
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }

        // Trigger auth change event
        this.triggerAuthChange(false);
    }

    // Show login success message
    showLoginSuccess(userData) {
        const successMessage = document.getElementById('successMessage');
        const authContainer = document.getElementById('authContainer');
        
        if (successMessage && authContainer) {
            authContainer.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Auto redirect after 3 seconds
            setTimeout(() => {
                const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
                window.location.href = redirectUrl;
            }, 3000);
        }
    }

    // Show registration success message
    showRegistrationSuccess(userData) {
        const successMessage = document.getElementById('successMessage');
        const authContainer = document.getElementById('authContainer');
        
        if (successMessage && authContainer) {
            authContainer.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Auto redirect after 5 seconds
            setTimeout(() => {
                window.location.href = 'properties.html';
            }, 5000);
        }
    }

    // Show error message
    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        const authContainer = document.getElementById('authContainer');
        
        if (errorMessage && errorText && authContainer) {
            errorText.textContent = message;
            authContainer.style.display = 'none';
            errorMessage.style.display = 'block';
        }
    }

    // Generate auth token
    generateToken() {
        return 'horizonhomes_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    // Bind events
    bindEvents() {
        // Update auth status on storage change (for multiple tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === 'horizonhomes_user_data' || e.key === 'horizonhomes_auth_token') {
                this.updateNavigation();
            }
        });
    }

    // Trigger authentication change event
    triggerAuthChange(isAuthenticated) {
        const event = new CustomEvent('authChange', {
            detail: { isAuthenticated, userData: this.getUserData() }
        });
        window.dispatchEvent(event);
    }

    // Show notification
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

// Global function to hide messages
function hideMessage(messageId) {
    const message = document.getElementById(messageId);
    const authContainer = document.getElementById('authContainer');
    
    if (message && authContainer) {
        message.style.display = 'none';
        authContainer.style.display = 'block';
    }
}

// Initialize auth status manager
window.authStatusManager = new AuthStatusManager();

// Update auth handler if it exists
if (window.authHandler) {
    window.authHandler.isAuthenticated = window.authStatusManager.isAuthenticated();
    if (window.authHandler.isAuthenticated) {
        window.authHandler.enableAuthRequiredElements();
    }
}
