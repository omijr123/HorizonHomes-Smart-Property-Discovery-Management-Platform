document.addEventListener('DOMContentLoaded', function() {
  // Get favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  updateFavCount();

  // Virtual tour controls (simplified for demo)
  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');
  const fullscreenBtn = document.getElementById('fullscreen');
  const playTourBtn = document.getElementById('play-tour');
  const pauseTourBtn = document.getElementById('pause-tour');
  
  let currentZoom = 1;
  const panoramaImg = document.querySelector('.panorama');
  
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', function() {
      currentZoom += 0.1;
      if (currentZoom > 2) currentZoom = 2;
      panoramaImg.style.transform = `scale(${currentZoom})`;
    });
  }
  
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', function() {
      currentZoom -= 0.1;
      if (currentZoom < 0.5) currentZoom = 0.5;
      panoramaImg.style.transform = `scale(${currentZoom})`;
    });
  }
  
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', function() {
      if (panoramaImg.requestFullscreen) {
        panoramaImg.requestFullscreen();
      } else if (panoramaImg.webkitRequestFullscreen) { /* Safari */
        panoramaImg.webkitRequestFullscreen();
      } else if (panoramaImg.msRequestFullscreen) { /* IE11 */
        panoramaImg.msRequestFullscreen();
      }
    });
  }
  
  // Demo for auto-play tour
  let tourInterval;
  if (playTourBtn) {
    playTourBtn.addEventListener('click', function() {
      // Simulate a tour by changing panorama positions
      let position = 0;
      clearInterval(tourInterval);
      tourInterval = setInterval(() => {
        position += 10;
        panoramaImg.style.objectPosition = `${position % 100}% 50%`;
      }, 100);
    });
  }
  
  if (pauseTourBtn) {
    pauseTourBtn.addEventListener('click', function() {
      clearInterval(tourInterval);
    });
  }
  
  // Tour hotspots - in a real implementation, these would move the camera to specific rooms
  const tourHotspots = document.querySelectorAll('.tour-hotspot');
  tourHotspots.forEach(hotspot => {
    hotspot.addEventListener('click', function() {
      const room = this.getAttribute('data-room');
      
      // Demo behavior: showing a message
      showToast(`Navigating to ${room.replace('-', ' ')}`);
      
      // Simulate changing the view
      const positions = {
        'living-room': '0% 50%',
        'kitchen': '20% 50%',
        'master-bedroom': '40% 50%',
        'backyard': '60% 50%',
        'bathroom': '80% 50%'
      };
      
      if (panoramaImg) {
        panoramaImg.style.objectPosition = positions[room] || '0% 50%';
      }
    });
  });
  
  // Favorite functionality
  const favoriteBtn = document.querySelector('.favorite-btn');
  if (favoriteBtn) {
    const propertyId = parseInt(favoriteBtn.getAttribute('data-id'));
    updateFavoriteButton(favoriteBtn, propertyId);
    
    favoriteBtn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      toggleFavorite(id);
      updateFavoriteButton(this, id);
    });
  }
  
  // View more tours
  const viewTourBtns = document.querySelectorAll('.view-tour-btn');
  viewTourBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      // In a real implementation, this would load a different tour
      showToast(`Loading virtual tour for property #${id}...`);
      
      // For demo, we'll simulate loading by scrolling to the top after a delay
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    });
  });
  
  // Contact agent button
  const contactBtn = document.querySelector('.contact-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', function() {
      window.location.href = "agents.html";
    });
  }
  
  // Schedule in-person tour button
  const scheduleBtn = document.querySelector('.schedule-btn');
  if (scheduleBtn) {
    scheduleBtn.addEventListener('click', function() {
      // Check if user is logged in
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        showToast("Please login to schedule a tour", "warning");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
        return;
      }
      
      // For demo, show a success message
      showToast("Tour scheduling request sent! An agent will contact you shortly.", "success");
    });
  }
  
  // Helper functions
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
  
  function updateFavoriteButton(button, id) {
    if (favorites.includes(id)) {
      button.innerHTML = `<i class="fas fa-heart"></i> Remove from Favorites`;
    } else {
      button.innerHTML = `<i class="far fa-heart"></i> Add to Favorites`;
    }
  }
  
  function updateFavCount() {
    const favCount = document.getElementById("fav-count");
    if (favCount) {
      favCount.textContent = favorites.length;
    }
  }
  
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
});
