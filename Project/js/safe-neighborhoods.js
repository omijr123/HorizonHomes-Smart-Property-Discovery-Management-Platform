document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const schoolDistance = document.getElementById('school-distance');
  const selectedDistance = document.getElementById('selected-distance');
  const safetyLevel = document.getElementById('safety-level');
  const selectedSafety = document.getElementById('selected-safety');
  const applyFilters = document.getElementById('apply-filters');
  const resetFilters = document.getElementById('reset-filters');
  const propertyListings = document.getElementById('safe-property-listings');
  const mapMarkers = document.querySelectorAll('.map-marker');
  const propertyPopup = document.getElementById('property-popup');
  const closePopup = document.querySelector('.close-popup');
  
  // Get favorites count from localStorage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  updateFavCount();
  
  // Sample properties data for safe neighborhoods
  const safeProperties = [
    {
      id: 101,
      title: "Modern Family Home",
      location: "Wilson School District, New York",
      price: 350000,
      image: "images/house2.jpg.png",
      safety: 8.5,
      schools: ["Wilson Elementary (0.5 miles)", "Washington Middle School (1.2 miles)"],
      position: { top: "40%", left: "30%" }
    },
    {
      id: 102,
      title: "Cozy Suburban House",
      location: "Lincoln Heights, New York",
      price: 275000,
      image: "images/house1.jpg.png",
      safety: 7.9,
      schools: ["Lincoln Elementary (0.7 miles)"],
      position: { top: "45%", left: "35%" }
    },
    {
      id: 103,
      title: "Luxury Family Villa",
      location: "Parkside, New York",
      price: 420000,
      image: "images/house3.jpg.png",
      safety: 9.2,
      schools: ["Parkside Elementary (0.4 miles)", "Westside High School (1.8 miles)"],
      position: { top: "50%", left: "40%" },
      safest: true
    },
    {
      id: 104,
      title: "Renovated Townhouse",
      location: "Oakwood District, New York",
      price: 320000,
      image: "images/apartment1.jpg",
      safety: 8.1,
      schools: ["Oakwood Elementary (1.2 miles)"],
      position: { top: "55%", left: "25%" }
    },
    {
      id: 105,
      title: "Modern Apartment",
      location: "Riverside, New York",
      price: 395000,
      image: "images/apartment2.jpg",
      safety: 7.8,
      schools: ["Riverside Elementary (1.5 miles)", "East Side Middle School (1.9 miles)"],
      position: { top: "35%", left: "60%" }
    },
    {
      id: 106,
      title: "Executive Home",
      location: "Greenwood Heights, New York",
      price: 450000,
      image: "images/house1.jpg.png",
      safety: 9.4,
      schools: ["Greenwood Elementary (0.3 miles)", "Greenwood High School (0.9 miles)"],
      position: { top: "25%", left: "55%" },
      safest: true
    }
  ];
  
  // School data
  const schools = [
    {
      name: "Wilson Elementary School",
      rating: 8.7,
      type: "elementary",
      position: { top: "43%", left: "33%" }
    },
    {
      name: "Westside High School",
      rating: 9.0,
      type: "high",
      position: { top: "60%", left: "35%" }
    }
  ];

  // Update range input display values
  schoolDistance.addEventListener('input', function() {
    selectedDistance.textContent = `${this.value} miles`;
  });
  
  safetyLevel.addEventListener('input', function() {
    selectedSafety.textContent = `${this.value}/10 or higher`;
    
    // Update safety needle position
    const needle = document.querySelector('.needle');
    if (needle) {
      needle.style.left = `calc(${this.value * 10}% - 4px)`;
    }
    
    // Update safety score color
    const scoreValue = document.querySelector('.score-value');
    if (scoreValue) {
      const value = parseFloat(this.value);
      if (value <= 3) {
        scoreValue.style.color = '#dc3545';
      } else if (value <= 7) {
        scoreValue.style.color = '#ffc107';
      } else {
        scoreValue.style.color = '#28a745';
      }
    }
  });
  
  // Reset filters
  resetFilters.addEventListener('click', function() {
    schoolDistance.value = 2;
    selectedDistance.textContent = "2 miles";
    safetyLevel.value = 7;
    selectedSafety.textContent = "7/10 or higher";
    document.getElementById('price-range').value = "any";
    document.getElementById('elementary').checked = true;
    document.getElementById('middle').checked = true;
    document.getElementById('high').checked = true;
    
    // Update safety needle
    const needle = document.querySelector('.needle');
    if (needle) {
      needle.style.left = "calc(70% - 4px)";
    }
    
    renderProperties(safeProperties);
  });
  
  // Apply filters
  applyFilters.addEventListener('click', function() {
    const minSafety = parseInt(safetyLevel.value);
    const maxDistance = parseFloat(schoolDistance.value);
    const priceRange = document.getElementById('price-range').value;
    const elementary = document.getElementById('elementary').checked;
    const middle = document.getElementById('middle').checked;
    const high = document.getElementById('high').checked;
    
    // Filter properties based on criteria
    let filtered = safeProperties.filter(property => property.safety >= minSafety);
    
    // Filter by price
    if (priceRange !== 'any') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(property => property.price >= min && property.price <= max);
      } else {
        // For the "1000000+" option
        filtered = filtered.filter(property => property.price >= min);
      }
    }
    
    // Show success message
    showToast(`Found ${filtered.length} properties in safe areas near schools`);
    
    // Render filtered properties
    renderProperties(filtered);
  });
  
  // Show property popup when clicking on map markers
  mapMarkers.forEach(marker => {
    marker.addEventListener('click', function() {
      if (this.classList.contains('school-marker')) {
        // Show school info
        showToast("This is a school location");
      } else {
        // Show property popup near the marker
        const rect = this.getBoundingClientRect();
        const mapRect = document.getElementById('map').getBoundingClientRect();
        
        propertyPopup.style.top = `${this.style.top}`;
        propertyPopup.style.left = `${this.style.left}`;
        propertyPopup.style.display = 'block';
      }
    });
  });
  
  // Close popup
  closePopup.addEventListener('click', function() {
    propertyPopup.style.display = 'none';
  });
  
  // Close popup when clicking outside
  document.getElementById('map').addEventListener('click', function(e) {
    if (e.target === this) {
      propertyPopup.style.display = 'none';
    }
  });
  
  // Render properties in the sidebar
  function renderProperties(properties) {
    propertyListings.innerHTML = '';
    
    if (properties.length === 0) {
      propertyListings.innerHTML = '<p>No properties match your criteria.</p>';
      return;
    }
    
    properties.forEach(property => {
      const propertyCard = document.createElement('div');
      propertyCard.className = 'property-card-small';
      propertyCard.dataset.id = property.id;
      
      // Format price with commas
      const formattedPrice = property.price.toLocaleString();
      
      propertyCard.innerHTML = `
        <img src="${property.image}" alt="${property.title}">
        <h4>${property.title}</h4>
        <div class="location">${property.location}</div>
        <div class="price">$${formattedPrice}</div>
        <div class="safety-tag">Safety Score: ${property.safety}/10</div>
      `;
      
      propertyCard.addEventListener('click', function() {
        // Highlight on map
        highlightMapMarker(property);
        
        // Show popup
        const marker = getMarkerForProperty(property);
        if (marker) {
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          marker.dispatchEvent(clickEvent);
        }
      });
      
      propertyListings.appendChild(propertyCard);
    });
  }
  
  function highlightMapMarker(property) {
    // This is a simplified version - in a real implementation, you'd find the
    // corresponding marker on the map and highlight it
    showToast(`Property selected: ${property.title}`);
  }
  
  function getMarkerForProperty(property) {
    // In a real implementation, you'd match markers to properties
    // This is simplified for the demo
    return document.querySelector(`.map-marker[style*="${property.position.top}"][style*="${property.position.left}"]`);
  }
  
  // Update favorites count
  function updateFavCount() {
    const favCount = document.getElementById("fav-count");
    if (favCount) {
      favCount.textContent = favorites.length;
    }
  }
  
  // Toast notification function
  function showToast(message, type = "success") {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Set background color based on message type
    let backgroundColor = '#004466'; // Default color
    if (type === 'error') {
      backgroundColor = '#dc3545';
    } else if (type === 'warning') {
      backgroundColor = '#ffc107';
      toast.style.color = '#333';
    }
    
    // Add styling to the toast
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: backgroundColor,
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: '2000',
      opacity: '0',
      transition: 'opacity 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => { toast.style.opacity = '1'; }, 10);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  // Initialize property listings
  renderProperties(safeProperties);
});
