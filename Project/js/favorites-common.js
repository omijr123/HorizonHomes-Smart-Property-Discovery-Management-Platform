
class FavoritesManager {
  constructor(options = {}) {
    this.config = {
      storageKey: options.storageKey || 'favorites',
      favCountSelector: options.favCountSelector || '#fav-count',
      favoritesListSelector: options.favoritesListSelector || '#favorites-list',
      favoritesContainerSelector: options.favoritesContainerSelector || '#favorites-container',
      closeFavoritesSelector: options.closeFavoritesSelector || '#close-favorites',
      noFavoritesMessage: options.noFavoritesMessage || 'You have no favorite properties yet. Browse our listings and click the heart icon to save properties here.',
      ...options
    };
    
    // Initialize favorites array from localStorage
    this.favorites = this.getFavoritesFromStorage();
    
    // Initialize DOM references
    this.initDOMReferences();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Update counts immediately
    this.updateFavCount();
  }
  
  initDOMReferences() {
    this.favCountElement = document.querySelector(this.config.favCountSelector);
    this.favoritesListElement = document.querySelector(this.config.favoritesListSelector);
    this.favoritesContainer = this.favoritesListElement ? this.favoritesListElement.querySelector(this.config.favoritesContainerSelector) : null;
    this.closeFavoritesButton = this.favoritesListElement ? this.favoritesListElement.querySelector(this.config.closeFavoritesSelector) : null;
    this.favoritesLink = document.querySelector('#favorites-link');
  }
  
  setupEventListeners() {
    // Set up favorites link click
    if (this.favoritesLink) {
      this.favoritesLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.showFavorites();
      });
    }
    
    // Set up close favorites button
    if (this.closeFavoritesButton) {
      this.closeFavoritesButton.addEventListener('click', () => {
        this.hideFavorites();
      });
    }
    
    // Add listener for toggling favorites from property cards
    document.addEventListener('click', (e) => {
      if (e.target.closest('.favorite-btn')) {
        const button = e.target.closest('.favorite-btn');
        const propertyId = parseInt(button.getAttribute('data-id'));
        this.toggleFavorite(propertyId);
      }
    });
    
    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', (e) => {
      if (e.key === this.config.storageKey) {
        this.favorites = this.getFavoritesFromStorage();
        this.updateFavCount();
        
        // Update UI if favorites list is currently shown
        if (this.favoritesListElement && this.favoritesListElement.style.display !== 'none') {
          this.renderFavorites();
        }
        
        // Update hearts on property cards
        this.updateAllHeartIcons();
      }
    });
  }
  
  getFavoritesFromStorage() {
    const stored = localStorage.getItem(this.config.storageKey);
    return stored ? JSON.parse(stored) : [];
  }
  
  saveFavoritesToStorage() {
    localStorage.setItem(this.config.storageKey, JSON.stringify(this.favorites));
  }
  
  toggleFavorite(propertyId) {
    const index = this.favorites.indexOf(propertyId);
    
    if (index === -1) {
      // Add to favorites
      this.favorites.push(propertyId);
      this.showToast(`Property added to favorites!`);
    } else {
      // Remove from favorites
      this.favorites.splice(index, 1);
      this.showToast(`Property removed from favorites.`);
    }
    
    // Save to localStorage
    this.saveFavoritesToStorage();
    
    // Update UI
    this.updateFavCount();
    this.updateHeartIcon(propertyId);
    
    // If favorites panel is open, update it
    if (this.favoritesListElement && this.favoritesListElement.style.display !== 'none') {
      this.renderFavorites();
    }
  }
  
  updateFavCount() {
    if (this.favCountElement) {
      this.favCountElement.textContent = this.favorites.length;
    }
  }
  
  updateHeartIcon(propertyId) {
    // Update heart icon in property cards
    document.querySelectorAll(`.favorite-btn[data-id="${propertyId}"]`).forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        const isFavorite = this.favorites.includes(propertyId);
        icon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
      }
    });
    
    // Update heart icon in modal if open
    const modalFavBtn = document.querySelector('.modal-favorite[data-id="' + propertyId + '"]');
    if (modalFavBtn) {
      const isFavorite = this.favorites.includes(propertyId);
      modalFavBtn.innerHTML = isFavorite 
        ? '<i class="fas fa-heart"></i> Remove from Favorites' 
        : '<i class="far fa-heart"></i> Add to Favorites';
    }
  }
  
  updateAllHeartIcons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
      const propertyId = parseInt(btn.getAttribute('data-id'));
      this.updateHeartIcon(propertyId);
    });
  }
  
  showFavorites() {
    if (!this.favoritesListElement) return;
    
    this.renderFavorites();
    this.favoritesListElement.style.display = 'block';
    
    // Apply backdrop and animation
    this.favoritesListElement.classList.add('show-favorites');
    document.body.classList.add('favorites-open');
    
    // Prevent page scrolling
    document.body.style.overflow = 'hidden';
  }
  
  hideFavorites() {
    if (!this.favoritesListElement) return;
    
    this.favoritesListElement.classList.remove('show-favorites');
    document.body.classList.remove('favorites-open');
    
    // Allow page scrolling
    document.body.style.overflow = '';
    
    // Wait for animation to complete
    setTimeout(() => {
      this.favoritesListElement.style.display = 'none';
    }, 300);
  }
  
  renderFavorites() {
    if (!this.favoritesContainer) return;
    
    // Clear existing content
    this.favoritesContainer.innerHTML = '';
    
    if (this.favorites.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'empty-favorites';
      emptyMessage.innerHTML = `
        <i class="far fa-heart" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
        <p>${this.config.noFavoritesMessage}</p>
        <button class="browse-properties-btn">Browse Properties</button>
      `;
      
      this.favoritesContainer.appendChild(emptyMessage);
      
      // Add event listener to the browse properties button
      const browseBtn = emptyMessage.querySelector('.browse-properties-btn');
      if (browseBtn) {
        browseBtn.addEventListener('click', () => {
          this.hideFavorites();
          window.scrollTo({
            top: document.querySelector('#properties-section').offsetTop - 100,
            behavior: 'smooth'
          });
        });
      }
      
      return;
    }
    
    // Create a property card for each favorite
    this.favorites.forEach(propertyId => {
      if (typeof properties === 'undefined') return;
      
      const property = properties.find(p => p.id === propertyId);
      if (!property) return;
      
      // Format price
      const formattedPrice = property.price.toLocaleString();
      
      // Create property stats display
      let propertyStats = '';
      if (property.type !== 'land') {
        propertyStats = `
          <div class="property-stats">
            ${property.bedrooms !== null ? `<span><i class="fas fa-bed"></i> ${property.bedrooms}</span>` : ''}
            ${property.bathrooms !== null ? `<span><i class="fas fa-bath"></i> ${property.bathrooms}</span>` : ''}
            <span><i class="fas fa-ruler-combined"></i> ${property.area.toLocaleString()} sq ft</span>
          </div>
        `;
      } else {
        propertyStats = `
          <div class="property-stats">
            <span><i class="fas fa-ruler-combined"></i> ${property.area.toLocaleString()} sq ft</span>
            <span><i class="fas fa-map"></i> Land</span>
          </div>
        `;
      }
      
      // Create card element
      const card = document.createElement('div');
      card.className = 'favorite-property-card';
      
      card.innerHTML = `
        <div class="property-image-container">
          <img src="${property.image}" alt="${property.title}" loading="lazy">
        </div>
        <div class="favorite-property-details">
          <h3>${property.title}</h3>
          <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
          ${propertyStats}
          <p class="price">$${formattedPrice}</p>
          <div class="favorite-actions">
            <button class="view-details-btn" data-id="${property.id}">View Details</button>
            <button class="remove-favorite-btn" data-id="${property.id}">
              <i class="fas fa-heart"></i> Remove
            </button>
          </div>
        </div>
      `;
      
      // Add event listeners
      const viewDetailsBtn = card.querySelector('.view-details-btn');
      viewDetailsBtn.addEventListener('click', () => {
        this.hideFavorites();
        
        // Delay to allow animation to complete before showing modal
        setTimeout(() => {
          if (typeof showPropertyDetails === 'function') {
            showPropertyDetails(property.id);
          }
        }, 300);
      });
      
      const removeFavBtn = card.querySelector('.remove-favorite-btn');
      removeFavBtn.addEventListener('click', () => {
        this.toggleFavorite(property.id);
      });
      
      this.favoritesContainer.appendChild(card);
    });
  }
  
  showToast(message) {
    // Check for existing toast
    const existingToast = document.querySelector('.favorites-toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'favorites-toast';
    toast.innerHTML = `
      <div class="favorites-toast-content">
        <i class="fas fa-heart"></i>
        ${message}
      </div>
    `;
    
    // Style the toast
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: '2000',
      maxWidth: '300px',
      transform: 'translateY(100px)',
      opacity: '0',
      transition: 'all 0.3s ease'
    });
    
    Object.assign(toast.querySelector('.favorites-toast-content').style, {
      background: '#004466',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
    });
    
    Object.assign(toast.querySelector('i').style, {
      marginRight: '10px',
      color: '#ff6b6b'
    });
    
    // Append to body and animate in
    document.body.appendChild(toast);
    
    // Force reflow
    toast.offsetHeight;
    
    // Animate in
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
}

// Initialize favorites manager when document is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.favoritesManager = new FavoritesManager();
  
  // Initialize favorites count
  updateFavCount();
  
  // Setup favorites link if it exists
  const favoritesLink = document.getElementById('favorites-link');
  if (favoritesLink) {
    favoritesLink.addEventListener('click', function(e) {
      e.preventDefault();
      // Redirect to favorites page or show favorites modal
      window.location.href = 'favorites.html';
    });
  }
});

// For backward compatibility with existing code
function toggleFavorite(propertyId) {
  if (window.favoritesManager) {
    window.favoritesManager.toggleFavorite(propertyId);
  }
}

function updateFavCount() {
  if (window.favoritesManager) {
    window.favoritesManager.updateFavCount();
  }
}

function showFavorites() {
  if (window.favoritesManager) {
    window.favoritesManager.showFavorites();
  }
}
