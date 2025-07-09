document.addEventListener('DOMContentLoaded', function() {
  // Mock property data - this would come from your main database/API
  const properties = [
    {
      id: 1,
      title: "Modern Family House",
      type: "house",
      location: "New York",
      price: 250000,
      image: "images/house1.jpg.png",
      description: "4 beds, 3 baths, spacious garden with pool",
      coordinates: { top: "30%", left: "40%" }
    },
    {
      id: 2,
      title: "Downtown Apartment",
      type: "apartment",
      location: "San Francisco",
      price: 350000,
      image: "images/apartment1.jpg",
      description: "2 beds, 1 bath, great city view",
      coordinates: { top: "45%", left: "60%" }
    },
    {
      id: 3,
      title: "Large Land Plot",
      type: "land",
      location: "Texas",
      price: 90000,
      image: "images/land1.jpg",
      description: "5 acres near highway, perfect for development",
      coordinates: { top: "60%", left: "25%" }
    },
    {
      id: 4,
      title: "Luxury Villa",
      type: "house",
      location: "Miami",
      price: 780000,
      image: "images/house2.jpg.png",
      description: "5 beds, 4 baths, beachfront property with private deck",
      coordinates: { top: "70%", left: "70%" }
    },
    {
      id: 5,
      title: "Cozy Studio Apartment",
      type: "apartment",
      location: "Chicago",
      price: 120000,
      image: "images/apartment2.jpg",
      description: "Modern studio in downtown, perfect for professionals",
      coordinates: { top: "50%", left: "80%" }
    },
    {
      id: 6,
      title: "Mountain View Cottage",
      type: "house",
      location: "Denver",
      price: 320000,
      image: "images/house3.jpg.png",
      description: "3 beds, 2 baths, spectacular mountain view",
      coordinates: { top: "25%", left: "75%" }
    }
  ];
  
  // Get favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
  // Update favorites count
  const favCount = document.getElementById("fav-count");
  favCount.textContent = favorites.length;
  
  // Populate property list in sidebar
  function renderPropertyList(propList = properties) {
    const propertyListElement = document.getElementById('map-property-list');
    propertyListElement.innerHTML = '';
    
    propList.forEach(property => {
      const propertyCard = document.createElement('div');
      propertyCard.className = 'property-card-small';
      propertyCard.setAttribute('data-id', property.id);
      
      // Format price with comma for thousands
      const formattedPrice = property.price.toLocaleString();
      
      propertyCard.innerHTML = `
        <img src="${property.image}" alt="${property.title}">
        <h4>${property.title}</h4>
        <p><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
        <p class="price">$${formattedPrice}</p>
        <p>${property.description}</p>
      `;
      
      propertyCard.addEventListener('click', () => {
        // Highlight the marker on the map
        highlightMarker(property.id);
        
        // Show popup
        showPropertyPopup(property);
      });
      
      propertyListElement.appendChild(propertyCard);
    });
  }
  
  // Function to apply filters
  function applyFilters() {
    const locationFilter = document.getElementById('search-location').value.toLowerCase();
    const typeFilter = document.getElementById('search-type').value;
    const priceFilter = document.getElementById('search-price').value;
    
    let filteredProperties = properties;
    
    // Filter by location
    if (locationFilter) {
      filteredProperties = filteredProperties.filter(property => 
        property.location.toLowerCase().includes(locationFilter)
      );
    }
    
    // Filter by type
    if (typeFilter !== 'any') {
      filteredProperties = filteredProperties.filter(property => 
        property.type === typeFilter
      );
    }
    
    // Filter by price
    if (priceFilter !== 'any') {
      const [minPrice, maxPrice] = priceFilter.split('-').map(Number);
      filteredProperties = filteredProperties.filter(property => 
        property.price >= minPrice && (!maxPrice || property.price <= maxPrice)
      );
    }
    
    // Update the property list in the sidebar
    renderPropertyList(filteredProperties);
    
    // Update the markers on the map - in a real implementation with a map API
    updateMapMarkers(filteredProperties);
    
    // Save the search to recent searches
    if (locationFilter || typeFilter !== 'any' || priceFilter !== 'any') {
      saveRecentSearch(locationFilter, typeFilter, priceFilter);
    }
  }
  
  // Function to save recent search
  function saveRecentSearch(location, type, price) {
    const searchDescription = `${location || 'Any location'}, ${type !== 'any' ? type : 'any type'}, ${price !== 'any' ? price : 'any price'}`;
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    
    // Add new search to the beginning of the array
    searches.unshift({
      description: searchDescription,
      timestamp: new Date().toISOString(),
      filters: { location, type, price }
    });
    
    // Keep only the most recent 5 searches
    const recentSearches = searches.slice(0, 5);
    
    // Save to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }
  
  // Function to save a search (with name)
  document.getElementById('save-search').addEventListener('click', function() {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      showToast("Please log in to save searches", "warning");
      return;
    }
    
    const searchName = prompt("Enter a name for this search:");
    if (!searchName) return;
    
    const locationFilter = document.getElementById('search-location').value;
    const typeFilter = document.getElementById('search-type').value;
    const priceFilter = document.getElementById('search-price').value;
    
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches')) || [];
    
    savedSearches.push({
      name: searchName,
      timestamp: new Date().toISOString(),
      filters: { location: locationFilter, type: typeFilter, price: priceFilter }
    });
    
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    showToast(`Search "${searchName}" has been saved`, "success");
  });
  
  // Function to highlight a marker (simulated for this example)
  function highlightMarker(propertyId) {
    // Reset all markers
    const allMarkers = document.querySelectorAll('.map-marker');
    allMarkers.forEach(marker => {
      marker.style.zIndex = '1';
      marker.style.transform = 'translate(-50%, -100%)';
      marker.querySelector('i').style.color = '#004466';
    });
    
    // Highlight the selected marker
    const selectedMarker = document.querySelector(`.map-marker[data-id="${propertyId}"]`);
    if (selectedMarker) {
      selectedMarker.style.zIndex = '10';
      selectedMarker.style.transform = 'translate(-50%, -120%) scale(1.2)';
      selectedMarker.querySelector('i').style.color = '#e74c3c';
    }
  }
  
  // Function to show property popup
  function showPropertyPopup(property) {
    const popup = document.getElementById('map-popup');
    
    // Position popup near the marker
    popup.style.top = property.coordinates.top;
    popup.style.left = property.coordinates.left;
    
    // Format price with comma for thousands
    const formattedPrice = property.price.toLocaleString();
    
    // Update popup content
    popup.querySelector('img').src = property.image;
    popup.querySelector('img').alt = property.title;
    popup.querySelector('h4').textContent = property.title;
    popup.querySelector('p i').parentNode.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${property.location}`;
    popup.querySelector('.price').textContent = `$${formattedPrice}`;
    popup.querySelector('.view-btn').setAttribute('href', `property-details.html?id=${property.id}`);
    
    // Show the popup
    popup.style.display = 'block';
  }
  
  // Close popup when clicking X
  document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('map-popup').style.display = 'none';
  });
  
  // Function to update map markers (simulated for this example)
  function updateMapMarkers(filteredProperties) {
    const allMarkers = document.querySelectorAll('.map-marker');
    
    // Hide all markers first
    allMarkers.forEach(marker => {
      marker.style.display = 'none';
    });
    
    // Show only the markers for filtered properties
    filteredProperties.forEach(property => {
      const marker = document.querySelector(`.map-marker[data-id="${property.id}"]`);
      if (marker) {
        marker.style.display = 'block';
      }
    });
  }
  
  // Add click event to each marker
  const markers = document.querySelectorAll('.map-marker');
  markers.forEach(marker => {
    marker.addEventListener('click', function() {
      const propertyId = parseInt(this.getAttribute('data-id'));
      const property = properties.find(p => p.id === propertyId);
      
      // Highlight the marker
      highlightMarker(propertyId);
      
      // Show the popup
      if (property) {
        showPropertyPopup(property);
      }
    });
  });
  
  // Apply filters when the button is clicked
  document.getElementById('apply-map-filters').addEventListener('click', applyFilters);
  
  // Initialize the page
  renderPropertyList();
});

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
    toast.style.color = '#333'; // Darker text for better readability on yellow
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
