document.addEventListener('DOMContentLoaded', function() {
  // Get properties data (same structure as main.js)
  const properties = [
    {
      id: 1,
      title: "Modern Family House",
      type: "house",
      location: "New York",
      price: 250000,
      image: "images/house1.jpg.png",
      description: "4 beds, 3 baths, spacious garden with pool",
      features: ["Swimming Pool", "Garage", "Garden", "Modern Kitchen"],
      area: 2500,
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2019
    },
    {
      id: 2,
      title: "Downtown Apartment",
      type: "apartment",
      location: "San Francisco",
      price: 350000,
      image: "images/apartment1.jpg",
      description: "2 beds, 1 bath, great city view",
      features: ["City View", "Fitness Center", "Security", "Balcony"],
      area: 1200,
      bedrooms: 2,
      bathrooms: 1,
      yearBuilt: 2020
    },
    {
      id: 3,
      title: "Large Land Plot",
      type: "land",
      location: "Texas",
      price: 90000,
      image: "images/land1.jpg",
      description: "5 acres near highway, perfect for development",
      features: ["Near Highway", "Agricultural Zone", "Flat Terrain", "Utilities Available"],
      area: 217800,
      yearBuilt: null,
      bedrooms: null,
      bathrooms: null
    },
    {
      id: 4,
      title: "Luxury Villa",
      type: "house",
      location: "Miami",
      price: 780000,
      image: "images/house2.jpg.png",
      description: "5 beds, 4 baths, beachfront property with private deck",
      features: ["Beachfront", "Private Pool", "Smart Home", "Wine Cellar"],
      area: 4200,
      bedrooms: 5,
      bathrooms: 4,
      yearBuilt: 2018
    },
    {
      id: 5,
      title: "Cozy Studio Apartment",
      type: "apartment",
      location: "Chicago",
      price: 120000,
      image: "images/apartment2.jpg",
      description: "Modern studio in downtown, perfect for professionals",
      features: ["Rooftop Terrace", "Gym Access", "In-unit Laundry", "Pet Friendly"],
      area: 550,
      bedrooms: 0,
      bathrooms: 1,
      yearBuilt: 2017
    },
    {
      id: 6,
      title: "Mountain View Cottage",
      type: "house",
      location: "Denver",
      price: 320000,
      image: "images/house3.jpg.png",
      description: "3 beds, 2 baths, spectacular mountain view",
      features: ["Mountain View", "Fireplace", "Large Deck", "Hiking Trails"],
      area: 1800,
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2015
    },
  ];

  // Get favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  updateFavCount();

  // Populate property selector with all properties
  const selectorGrid = document.getElementById('property-selector-grid');
  
  properties.forEach(property => {
    const propertyCard = document.createElement('div');
    propertyCard.className = 'property-card-small';
    propertyCard.setAttribute('data-id', property.id);
    
    const formattedPrice = property.price.toLocaleString();
    
    propertyCard.innerHTML = `
      <img src="${property.image}" alt="${property.title}">
      <div class="property-card-small-info">
        <h4>${property.title}</h4>
        <p>${property.location}</p>
        <p class="price">$${formattedPrice}</p>
      </div>
    `;
    
    propertyCard.addEventListener('click', function() {
      // Add to comparison table
      addToCompare(property.id);
    });
    
    selectorGrid.appendChild(propertyCard);
  });

  // Set up comparison functionality
  let comparisonList = [];
  const maxCompare = 3;

  function addToCompare(propertyId) {
    // Check if already in comparison
    if (comparisonList.includes(propertyId)) {
      showToast("This property is already in your comparison", "info");
      return;
    }
    
    // Check if comparison list is full
    if (comparisonList.length >= maxCompare) {
      showToast("You can only compare up to 3 properties at once", "warning");
      return;
    }
    
    // Add to comparison list
    comparisonList.push(propertyId);
    showToast("Property added to comparison");
    
    // Update the UI (simplified for demo)
    updateComparisonTable();
  }

  function updateComparisonTable() {
    // In a real implementation, this would modify the comparison table's cells with actual data
    // For demo purposes, we'll just show a toast
    showToast(`Comparison updated with ${comparisonList.length} properties`);
  }

  // Add event listeners to comparison action buttons
  document.getElementById('reset-comparison').addEventListener('click', function() {
    comparisonList = [];
    showToast("Comparison reset");
    // In a real implementation, clear the table cells
  });

  document.getElementById('save-comparison').addEventListener('click', function() {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      showToast("Please login to save comparisons", "warning");
      return;
    }
    
    // Save the comparison
    const comparisons = JSON.parse(localStorage.getItem('savedComparisons')) || [];
    comparisons.push({
      id: Date.now(),
      properties: comparisonList,
      date: new Date().toISOString()
    });
    localStorage.setItem('savedComparisons', JSON.stringify(comparisons));
    
    showToast("Comparison saved successfully");
  });

  document.getElementById('share-comparison').addEventListener('click', function() {
    // Generate a shareable link
    const compareString = comparisonList.join('-');
    const shareUrl = `${window.location.origin}/compare.html?props=${compareString}`;
    
    // In a real app, this could open a modal with sharing options
    // For demo, copy to clipboard
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        showToast("Comparison link copied to clipboard");
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
        showToast("Failed to copy link", "error");
      });
  });

  // Handle view and favorite buttons in comparison table
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const propertyId = parseInt(this.getAttribute('data-id'));
      // Redirect to property details page
      window.location.href = `index.html?view=${propertyId}`;
    });
  });

  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const propertyId = parseInt(this.getAttribute('data-id'));
      toggleFavorite(propertyId);
    });
  });

  // Check if there's a shared comparison in the URL
  function checkUrlForComparison() {
    const urlParams = new URLSearchParams(window.location.search);
    const propsParam = urlParams.get('props');
    
    if (propsParam) {
      const propIds = propsParam.split('-').map(Number);
      propIds.forEach(id => {
        if (properties.some(p => p.id === id) && !comparisonList.includes(id) && comparisonList.length < maxCompare) {
          comparisonList.push(id);
        }
      });
      
      if (comparisonList.length > 0) {
        showToast(`Loaded shared comparison with ${comparisonList.length} properties`);
        updateComparisonTable();
      }
    }
  }

  // Toggle favorite status
  function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index > -1) {
      favorites.splice(index, 1);
      showToast("Property removed from favorites");
    } else {
      favorites.push(id);
      showToast("Property added to favorites");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavCount();
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
      toast.style.color = '#333'; // Darker text for better readability on yellow
    } else if (type === 'info') {
      backgroundColor = '#0dcaf0';
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

  // Check URL for shared comparison on page load
  checkUrlForComparison();
});
