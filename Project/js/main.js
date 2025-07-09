// Enhanced property data with more varied properties and multiple images
const properties = [
  {
    id: 1,
    title: "Modern Family House",
    type: "house",
    location: "New York",
    price: 1250000,
    image: "images/house1.jpg",
    images: ["images/house1.jpg", "images/house1-interior.jpg", "images/house1-backyard.jpg"],
    description: "Luxury modern design with spacious garden and pool",
    mapLink: "https://maps.google.com?q=New+York+modern+house",
    features: ["Swimming Pool", "Smart Home", "Double Garage", "Garden", "Modern Kitchen"],
    area: 2800,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2020
  },
  {
    id: 2,
    title: "Downtown Apartment",
    type: "apartment",
    location: "San Francisco, CA",
    price: 350000,
    image: "images/apartment1.jpg",
    images: ["images/apartment1.jpg", "images/apartment1-kitchen.jpg", "images/apartment1-living.jpg"],
    description: "2 beds, 1 bath, great city view, perfect for professionals",
    mapLink: "https://maps.google.com?q=San+Francisco+apartment",
    features: ["City View", "Fitness Center", "Security", "Balcony"],
    area: 1200,
    bedrooms: 2,
    bathrooms: 1,
    yearBuilt: 2018
  },
  {
    id: 3,
    title: "Large Land Plot",
    type: "land",
    location: "Texas",
    price: 90000,
    image: "images/land1.jpg",
    images: ["images/land1.jpg", "images/land1-map.jpg", "images/land1-aerial.jpg"],
    description: "5 acres near highway, perfect for development or agriculture",
    mapLink: "https://maps.google.com?q=Texas+land",
    features: ["Near Highway", "Agricultural Zone", "Flat Terrain", "Utilities Available"],
    area: 217800, // 5 acres in sq ft
    yearBuilt: null,
    bedrooms: null,
    bathrooms: null
  },
  {
    id: 4,
    title: "Suburban Family Home",
    type: "house",
    location: "Austin, TX",
    price: 450000,
    image: "images/house2.jpg",
    images: ["images/house2.jpg", "images/house2-interior.jpg", "images/house2-garden.jpg"],
    description: "Spacious two-story house with double garage and backyard",
    mapLink: "https://maps.google.com?q=Austin+suburban+house",
    features: ["Backyard", "Double Garage", "Fireplace", "Quiet Neighborhood"],
    area: 2200,
    bedrooms: 4,
    bathrooms: 2.5,
    yearBuilt: 2015
  },
  {
    id: 5,
    title: "Cozy Studio Apartment",
    type: "apartment",
    location: "Chicago, IL",
    price: 120000,
    image: "images/apartment2.jpg",
    images: ["images/apartment2.jpg", "images/apartment2-kitchen.jpg", "images/apartment2-bathroom.jpg"],
    description: "Modern studio in downtown, perfect for professionals or students",
    mapLink: "https://maps.google.com?q=Chicago+studio+apartment",
    features: ["Rooftop Terrace", "Gym Access", "In-unit Laundry", "Pet Friendly"],
    area: 550,
    bedrooms: 0,
    bathrooms: 1,
    yearBuilt: 2017
  },
  {
    id: 6,
    title: "Elegant Brick House",
    type: "house",
    location: "Boston, MA",
    price: 550000,
    image: "images/house3.jpg",
    images: ["images/house3.jpg", "images/house3-interior.jpg", "images/house3-kitchen.jpg"],
    description: "Classic design with modern amenities in a historic neighborhood",
    mapLink: "https://maps.google.com?q=Boston+brick+house",
    features: ["Historic Area", "Renovated", "Hardwood Floors", "Basement"],
    area: 1950,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 1940
  },
  {
    id: 7,
    title: "Mountain View Land",
    type: "land",
    location: "Colorado",
    price: 150000,
    image: "images/land2.jpg",
    images: ["images/land2.jpg", "images/land2-view.jpg", "images/land2-map.jpg"],
    description: "3 acres with stunning mountain views, perfect for a vacation home",
    mapLink: "https://maps.google.com?q=Colorado+mountain+land",
    features: ["Mountain Views", "Stream Access", "Wooded", "Road Access"],
    area: 130680, // 3 acres in sq ft
    yearBuilt: null,
    bedrooms: null,
    bathrooms: null
  },
  {
    id: 8,
    title: "Luxury Penthouse",
    type: "apartment",
    location: "Miami, FL",
    price: 950000,
    image: "images/apartment3.jpg",
    images: ["images/apartment3.jpg", "images/apartment3-view.jpg", "images/apartment3-bedroom.jpg"],
    description: "Stunning penthouse with ocean views and private rooftop terrace",
    mapLink: "https://maps.google.com?q=Miami+luxury+penthouse",
    features: ["Ocean View", "Private Terrace", "Floor-to-ceiling Windows", "Smart Home"],
    area: 1800,
    bedrooms: 3,
    bathrooms: 2.5,
    yearBuilt: 2019
  },
  {
    id: 9,
    title: "Waterfront Property",
    type: "land",
    location: "Florida Keys",
    price: 320000,
    image: "images/land3.jpg",
    images: ["images/land3.jpg", "images/land3-aerial.jpg", "images/land3-sunset.jpg"],
    description: "Rare waterfront lot with deep water access, perfect for boating enthusiasts",
    mapLink: "https://maps.google.com?q=Florida+Keys+waterfront",
    features: ["Waterfront", "Boat Access", "Building Permit Ready", "Utilities"],
    area: 21780, // 0.5 acres in sq ft
    yearBuilt: null,
    bedrooms: null,
    bathrooms: null
  }
];

// Favorites stored in localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// DOM elements
const propertiesList = document.getElementById("properties-list");
const priceFilter = document.getElementById("price-filter");
const typeFilter = document.getElementById("type-filter");
const locationFilter = document.getElementById("location-filter");
const filterBtn = document.getElementById("filter-btn");
const clearBtn = document.getElementById("clear-btn");

const favoritesLink = document.getElementById("favorites-link");
const favCount = document.getElementById("fav-count");
const favoritesList = document.getElementById("favorites-list");
const favoritesContainer = document.getElementById("favorites-container");
const closeFavorites = document.getElementById("close-favorites");

const newsletterForm = document.getElementById("newsletter-form");
const propertyModal = document.getElementById("property-modal");
const modalContent = document.getElementById("modal-property-details");
const closeModalBtn = document.querySelector(".close");
const viewDetailsBtns = document.querySelectorAll(".view-details-btn");

// Render property cards
function renderProperties(list) {
  propertiesList.innerHTML = "";
  if(list.length === 0) {
    propertiesList.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <p>No properties found matching your filters.</p>
        <button id="reset-search">Reset Filters</button>
      </div>
    `;
    document.getElementById("reset-search").addEventListener("click", () => {
      priceFilter.value = "any";
      typeFilter.value = "any";
      locationFilter.value = "";
      applyFilters();
    });
    return;
  }
  
  list.forEach((prop, index) => {
    const card = document.createElement("div");
    card.className = "property-card";
    card.style.setProperty('--card-index', index);
    
    // Format price with commas for thousands
    const formattedPrice = prop.price.toLocaleString();
    
    // Create feature badges if available
    let featureBadges = '';
    if (prop.features && prop.features.length > 0) {
      featureBadges = `
        <div class="feature-badges">
          ${prop.features.slice(0, 3).map(feature => `<span class="feature-badge">${feature}</span>`).join('')}
          ${prop.features.length > 3 ? `<span class="feature-badge">+${prop.features.length-3} more</span>` : ''}
        </div>
      `;
    }
    
    // Prepare property stats
    let propertyStats = '';
    if (prop.type !== 'land') {
      propertyStats = `
        <div class="property-stats">
          ${prop.bedrooms !== null ? `<span><i class="fas fa-bed"></i> ${prop.bedrooms} ${prop.bedrooms !== 1 ? 'beds' : 'bed'}</span>` : ''}
          ${prop.bathrooms !== null ? `<span><i class="fas fa-bath"></i> ${prop.bathrooms} ${prop.bathrooms !== 1 ? 'baths' : 'bath'}</span>` : ''}
          <span><i class="fas fa-ruler-combined"></i> ${prop.area.toLocaleString()} sq ft</span>
        </div>
      `;
    } else {
      propertyStats = `
        <div class="property-stats">
          <span><i class="fas fa-ruler-combined"></i> ${prop.area.toLocaleString()} sq ft</span>
          <span><i class="fas fa-map"></i> Land</span>
        </div>
      `;
    }
    
    // Get property type icon
    const typeIcon = prop.type === 'apartment' ? 'building' : prop.type === 'land' ? 'map' : 'home';

    card.innerHTML = `
      <div class="property-image-container">
        <img src="${prop.image}" alt="${prop.title}" loading="lazy"/>
        <div class="property-type-badge">
          <i class="fas fa-${typeIcon}"></i> ${prop.type.charAt(0).toUpperCase() + prop.type.slice(1)}
        </div>
      </div>
      <div class="property-details">
        <h3>${prop.title}</h3>
        <p class="location"><i class="fas fa-map-marker-alt"></i> ${prop.location}</p>
        ${propertyStats}
        <p class="price">$${formattedPrice}</p>
        ${featureBadges}
        <div class="property-actions">
          <button class="view-details-btn" data-id="${prop.id}">View Details</button>
          <button class="favorite-btn" data-id="${prop.id}">
            <i class="fa${favorites.includes(prop.id) ? 's' : 'r'} fa-heart"></i>
          </button>
        </div>
      </div>
    `;
    propertiesList.appendChild(card);
  });
  
  // Add event listeners for view details buttons
  document.querySelectorAll(".view-details-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const propertyId = parseInt(this.getAttribute("data-id"));
      showPropertyDetails(propertyId);
    });
  });
  
  // Add event listeners for favorite buttons
  document.querySelectorAll(".favorite-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const propertyId = parseInt(this.getAttribute("data-id"));
      toggleFavorite(propertyId);
    });
  });
}

// Enhanced function to show property details with image gallery
function showPropertyDetails(propertyId) {
  const property = properties.find(p => p.id === propertyId);
  if (!property) return;
  
  // Get the year built display text
  let yearBuiltText = property.yearBuilt ? `Built in ${property.yearBuilt}` : 'N/A';
  
  // Create image gallery HTML
  let imageGalleryHTML = '';
  if (property.images && property.images.length > 0) {
    const thumbnailsHTML = property.images.map((img, index) => 
      `<img src="${img}" alt="${property.title} image ${index+1}" class="${index === 0 ? 'active-thumb' : ''}" loading="lazy">`
    ).join('');
    
    imageGalleryHTML = `
      <div class="image-gallery-thumbs">
        ${thumbnailsHTML}
      </div>
    `;
  }
  
  modalContent.innerHTML = `
    <div class="modal-property">
      <div class="modal-property-images">
        <img src="${property.image}" alt="${property.title}" class="modal-main-image">
        ${imageGalleryHTML}
      </div>
      
      <div class="modal-property-info">
        <div class="modal-property-header">
          <div>
            <span class="property-badge ${property.type}">${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
            <h2>${property.title}</h2>
            <p class="modal-property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
          </div>
          <div class="modal-property-price">$${property.price.toLocaleString()}</div>
        </div>
        
        <div class="modal-property-details">
          ${property.type !== 'land' ? `
            <div class="detail-item">
              <i class="fas fa-bed"></i>
              <div>
                <span class="detail-value">${property.bedrooms}</span>
                <span class="detail-label">Bedroom${property.bedrooms !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <div class="detail-item">
              <i class="fas fa-bath"></i>
              <div>
                <span class="detail-value">${property.bathrooms}</span>
                <span class="detail-label">Bathroom${property.bathrooms !== 1 ? 's' : ''}</span>
              </div>
            </div>
          ` : ''}
          <div class="detail-item">
            <i class="fas fa-ruler-combined"></i>
            <div>
              <span class="detail-value">${property.area.toLocaleString()}</span>
              <span class="detail-label">sq ft</span>
            </div>
          </div>
          <div class="detail-item">
            <i class="fas fa-calendar-alt"></i>
            <div>
              <span class="detail-value">${yearBuiltText}</span>
              <span class="detail-label">Year</span>
            </div>
          </div>
        </div>
        
        <div class="modal-property-description">
          <h3>Property Description</h3>
          <p>${property.description}</p>
          <p>This ${property.type} is located in a prime area of ${property.location}, offering convenient access to schools, shopping centers, and public transportation.</p>
        </div>
        
        ${property.features && property.features.length > 0 ? `
          <div class="modal-property-features">
            <h3>Property Features</h3>
            <ul>
              ${property.features.map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        <div class="modal-property-actions">
          <a href="${property.mapLink}" target="_blank" class="map-link-btn">
            <i class="fas fa-map-marked-alt"></i> View on Map
          </a>
          <button class="favorite-btn modal-favorite" data-id="${property.id}">
            ${favorites.includes(property.id) 
              ? '<i class="fas fa-heart"></i> Remove from Favorites' 
              : '<i class="far fa-heart"></i> Add to Favorites'
            }
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Add event listener to favorite button in modal
  modalContent.querySelector('.favorite-btn').addEventListener('click', function() {
    const id = parseInt(this.getAttribute('data-id'));
    toggleFavorite(id);
    this.innerHTML = favorites.includes(id) 
      ? '<i class="fas fa-heart"></i> Remove from Favorites'
      : '<i class="far fa-heart"></i> Add to Favorites';
  });
  
  // Show the modal
  propertyModal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling
  
  // Add image gallery functionality if we have multiple images
  const thumbs = document.querySelectorAll('.image-gallery-thumbs img');
  const mainImage = document.querySelector('.modal-main-image');
  
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      // Update main image
      mainImage.src = this.src;
      mainImage.alt = this.alt;
      
      // Update active thumb
      document.querySelector('.image-gallery-thumbs img.active-thumb')?.classList.remove('active-thumb');
      this.classList.add('active-thumb');
    });
  });
}

// Toggle favorite function
function toggleFavorite(id) {
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
    showToast("Property added to favorites!");
  } else {
    favorites.splice(index, 1);
    showToast("Property removed from favorites!");
  }
  
  // Update localStorage
  localStorage.setItem("favorites", JSON.stringify(favorites));
  
  // Update UI
  updateFavCount();
  
  // Update favorite buttons
  document.querySelectorAll(`.favorite-btn[data-id="${id}"] i`).forEach(icon => {
    icon.className = favorites.includes(id) ? "fas fa-heart" : "far fa-heart";
  });
}

// Update favorites count in the header
function updateFavCount() {
  const count = favorites.length;
  favCount.textContent = count;
}

// Display favorites panel
function showFavorites() {
  favoritesList.style.display = "block";
  favoritesContainer.innerHTML = "";
  
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = `
      <div class="empty-favorites">
        <i class="far fa-heart" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
        <p>You haven't added any properties to your favorites yet.</p>
        <button id="browse-properties" class="cta-button">Browse Properties</button>
      </div>
    `;
    
    document.getElementById("browse-properties").addEventListener("click", () => {
      favoritesList.style.display = "none";
    });
    return;
  }
  
  // Get favorite properties from the main properties array
  const favoriteProperties = properties.filter(p => favorites.includes(p.id));
  
  favoriteProperties.forEach(prop => {
    const card = document.createElement("div");
    card.className = "favorite-card";
    card.innerHTML = `
      <img src="${prop.image}" alt="${prop.title}">
      <div class="favorite-info">
        <h3>${prop.title}</h3>
        <p class="location"><i class="fas fa-map-marker-alt"></i> ${prop.location}</p>
        <p class="price">$${prop.price.toLocaleString()}</p>
        <div class="favorite-buttons">
          <button class="view-details-btn" data-id="${prop.id}">View Details</button>
          <button class="remove-favorite-btn" data-id="${prop.id}">
            <i class="fas fa-trash"></i> Remove
          </button>
        </div>
      </div>
    `;
    favoritesContainer.appendChild(card);
  });
  
  // Add event listeners to the view details buttons in favorites
  favoritesContainer.querySelectorAll(".view-details-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const propertyId = parseInt(this.getAttribute("data-id"));
      showPropertyDetails(propertyId);
      favoritesList.style.display = "none";
    });
  });
}

// Filter properties based on user selection
function applyFilters() {
  const priceRange = priceFilter.value;
  const propertyType = typeFilter.value;
  const location = locationFilter.value.toLowerCase();
  
  let filteredProperties = properties;
  
  // Filter by price
  if (priceRange !== "any") {
    const [min, max] = priceRange.split("-").map(Number);
    if (max) {
      filteredProperties = filteredProperties.filter(p => p.price >= min && p.price <= max);
    } else {
      filteredProperties = filteredProperties.filter(p => p.price >= min);
    }
  }
  
  // Filter by type
  if (propertyType !== "any") {
    filteredProperties = filteredProperties.filter(p => p.type === propertyType);
  }
  
  // Filter by location
  if (location) {
    filteredProperties = filteredProperties.filter(p => 
      p.location.toLowerCase().includes(location)
    );
  }
  
  renderProperties(filteredProperties);
}

// Function to handle image loading errors and provide fallback
function handleImageError(img) {
  img.onerror = function() {
    this.src = 'images/placeholder-property.jpg';
    this.alt = 'Image not available';
  };
  return img;
}

// Create toast notification
function showToast(message) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Add styling to the toast
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#004466',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    zIndex: '2000',
    opacity: '0',
    transition: 'opacity 0.3s ease'
  });
  
  // Animate in
  setTimeout(() => { toast.style.opacity = '1'; }, 10);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Event listeners
filterBtn.addEventListener("click", applyFilters);

clearBtn.addEventListener("click", () => {
  priceFilter.value = "any";
  typeFilter.value = "any";
  locationFilter.value = "";
  applyFilters();
});

propertiesList.addEventListener("click", (e) => {
  if(e.target.classList.contains("favorite-btn") || e.target.closest(".favorite-btn")) {
    const button = e.target.closest(".favorite-btn");
    const id = Number(button.getAttribute("data-id"));
    toggleFavorite(id);
  }
});

favoritesLink.addEventListener("click", (e) => {
  e.preventDefault();
  showFavorites();
});

favoritesContainer.addEventListener("click", (e) => {
  if(e.target.classList.contains("remove-favorite-btn") || e.target.closest(".remove-favorite-btn")) {
    const button = e.target.closest(".remove-favorite-btn");
    const id = Number(button.getAttribute("data-id"));
    toggleFavorite(id);
    showFavorites();
  }
});

closeFavorites.addEventListener("click", () => {
  favoritesList.style.display = "none";
});

// Close modal when clicking the X
closeModalBtn.addEventListener("click", () => {
  propertyModal.style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
});

// Close modal when clicking outside the content
window.addEventListener("click", (e) => {
  if (e.target === propertyModal) {
    propertyModal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
  }
});

// Handle featured property view details buttons
document.querySelectorAll(".view-details-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    // Find the property that matches the title in the card
    const cardTitle = this.closest('.property-card').querySelector('h3').textContent;
    const property = properties.find(p => p.title.includes(cardTitle));
    if (property) {
      showPropertyDetails(property.id);
    }
  });
});

// Handle newsletter form submission
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    this.reset();
    showToast(`Thank you! ${email} has been subscribed to our newsletter.`);
  });
}

// Immediate initialization: render properties when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Initialize favorite count
  updateFavCount();
  
  // Ensure properties are rendered on page load
  if (propertiesList) {
    renderProperties(properties);
  } else {
    console.warn("Properties list container not found on this page");
  }
  
  // Add staggered animation to property cards
  setTimeout(() => {
    const propertyCards = document.querySelectorAll('#properties-list .property-card');
    propertyCards.forEach((card, index) => {
      card.style.setProperty('--card-index', index);
    });
  }, 100);
  
  // Setup filter event listeners
  setupFilterListeners();
});

// Improve filter functionality by applying filters immediately when selecting options
function setupFilterListeners() {
  if(priceFilter) priceFilter.addEventListener('change', applyFilters);
  if(typeFilter) typeFilter.addEventListener('change', applyFilters);
  if(locationFilter) locationFilter.addEventListener('keyup', debounce(applyFilters, 500));
}

// Helper function to debounce inputs
function debounce(func, delay) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

// Call setup for filter listeners
setupFilterListeners();

// Initialize
updateFavCount();
renderProperties(properties);

// Add CSS for property stats
const style = document.createElement('style');
style.textContent = `
  .property-stats {
    display: flex;
    gap: 15px;
    margin: 10px 0;
    font-size: 0.9rem;
    color: #666;
  }
  
  .property-stats span {
    display: flex;
    align-items: center;
  }
  
  .property-stats i {
    color: #0077b6;
    margin-right: 5px;
  }
  
  .feature-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin: 10px 0;
  }
  
  .feature-badge {
    background: #e6f3ff;
    color: #0077b6;
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 0.8rem;
  }
  
  .property-actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }
  
  .favorite-btn, .remove-favorite-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .favorite-btn i, .remove-favorite-btn i {
    margin-right: 5px;
  }
  
  .view-details-btn {
    flex: 1;
  }
  
  .no-results {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .empty-favorites {
    text-align: center;
    padding: 3rem 1rem;
  }
  
  /* Modal Styling */
  .modal-property {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .modal-property-images {
    flex: 1;
    min-width: 300px;
  }
  
  .modal-main-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .modal-property-info {
    flex: 1;
    min-width: 300px;
  }
  
  .modal-property-location {
    color: #666;
    margin-bottom: 10px;
  }
  
  .modal-property-location i {
    color: #0077b6;
    margin-right: 5px;
  }
  
  .modal-property-price {
    font-size: 1.8rem;
    font-weight: bold;
    color: #004466;
    margin-bottom: 20px;
  }
  
  .modal-property-details {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px 0;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 8px;
  }
  
  .detail-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .detail-item i {
    color: #0077b6;
    font-size: 1.2rem;
  }
  
  .modal-property-description h3,
  .modal-property-features h3 {
    color: #004466;
    margin: 20px 0 10px 0;
  }
  
  .modal-property-features ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 10px;
  }
  
  .modal-property-features li {
    display: flex;
    align-items: center;
  }
  
  .modal-property-features li i {
    color: #4CAF50;
    margin-right: 8px;
  }
  
  .modal-property-actions {
    display: flex;
    gap: 15px;
    margin-top: 30px;
  }
  
  .map-link-btn {
    background: #004466;
    color: white;
    text-decoration: none;
    padding: 12px 20px;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
  }
  
  .map-link-btn:hover {
    background: #00598a;
  }
  
  @media (max-width: 768px) {
    .property-actions {
      flex-direction: column;
    }
  }
`;
document.head.appendChild(style);

// Add event listener for the Contact Agent button
document.addEventListener('DOMContentLoaded', function() {
  const contactAgentBtn = document.querySelector('.cta-button.secondary');
  if (contactAgentBtn) {
    contactAgentBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'agents.html';
    });
  }
});
