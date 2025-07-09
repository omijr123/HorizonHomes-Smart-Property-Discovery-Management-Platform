document.addEventListener('DOMContentLoaded', function() {
  // Get user data
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }
  
  const userData = JSON.parse(currentUser);
  
  // Update user info in the UI
  document.getElementById('username').textContent = userData.firstName || "User";
  document.getElementById('user-fullname').textContent = `${userData.firstName} ${userData.lastName}` || "User";
  
  // Fill profile form with user data
  if (document.getElementById('profile-firstname')) {
    document.getElementById('profile-firstname').value = userData.firstName || "";
    document.getElementById('profile-lastname').value = userData.lastName || "";
    document.getElementById('profile-email').value = userData.email || "";
    document.getElementById('profile-phone').value = userData.phone || "";
    
    // Load preferences if they exist
    if (userData.preferences) {
      document.getElementById('profile-preferences').value = userData.preferences;
    }
    
    if (userData.budget) {
      document.getElementById('profile-budget').value = userData.budget;
    }
  }
  
  // Load favorites
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  document.getElementById('favorites-count').textContent = favorites.length;
  document.getElementById('fav-count').textContent = favorites.length;
  
  // Mock data for other stats
  document.getElementById('searches-count').textContent = '2';
  document.getElementById('viewings-count').textContent = '2';
  document.getElementById('messages-count').textContent = '2';
  
  // Tab switching
  const tabLinks = document.querySelectorAll('.dashboard-menu a');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links and contents
      tabLinks.forEach(item => item.classList.remove('active'));
      tabContents.forEach(item => item.classList.remove('active'));
      
      // Add active class to clicked link and corresponding content
      this.classList.add('active');
      document.getElementById(this.getAttribute('data-tab') + '-tab').classList.add('active');
    });
  });
  
  // Handle profile form submission
  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Update user data
      userData.firstName = document.getElementById('profile-firstname').value;
      userData.lastName = document.getElementById('profile-lastname').value;
      userData.phone = document.getElementById('profile-phone').value;
      userData.preferences = document.getElementById('profile-preferences').value;
      userData.budget = document.getElementById('profile-budget').value;
      
      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      // Update users array
      const users = JSON.parse(localStorage.getItem('horizonUsers')) || [];
      const userIndex = users.findIndex(user => user.id === userData.id);
      
      if (userIndex !== -1) {
        users[userIndex] = {...users[userIndex], ...userData};
        localStorage.setItem('horizonUsers', JSON.stringify(users));
      }
      
      // Show confirmation
      showToast("Profile updated successfully!");
      
      // Update displayed name
      document.getElementById('username').textContent = userData.firstName;
      document.getElementById('user-fullname').textContent = `${userData.firstName} ${userData.lastName}`;
    });
  }
  
  // Handle password form submission
  const passwordForm = document.getElementById('password-form');
  if (passwordForm) {
    passwordForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      // Get the full user data from users array (including password)
      const users = JSON.parse(localStorage.getItem('horizonUsers')) || [];
      const user = users.find(u => u.id === userData.id);
      
      if (!user) {
        showToast("Error updating password. User not found.", "error");
        return;
      }
      
      // Check current password
      if (user.password !== currentPassword) {
        showToast("Current password is incorrect.", "error");
        return;
      }
      
      // Check that new passwords match
      if (newPassword !== confirmPassword) {
        showToast("New passwords don't match.", "error");
        return;
      }
      
      // Update password
      user.password = newPassword;
      localStorage.setItem('horizonUsers', JSON.stringify(users));
      
      // Reset form and show confirmation
      passwordForm.reset();
      showToast("Password changed successfully!");
    });
  }
  
  // Load favorites in dashboard
  const dashboardFavorites = document.getElementById('dashboard-favorites');
  if (dashboardFavorites) {
    if (favorites.length === 0) {
      dashboardFavorites.innerHTML = '<p>You have not saved any favorite properties yet.</p>';
    } else {
      // This should be replaced with actual property data in your implementation
      const mockProperties = [
        { id: 1, title: "Modern Family House", location: "New York", price: 250000, image: "images/house1.jpg.png" },
        { id: 2, title: "Downtown Apartment", location: "San Francisco", price: 350000, image: "images/apartment1.jpg" }
      ];
      
      let favoritesHTML = '<div class="favorite-properties-list">';
      
      mockProperties.filter(prop => favorites.includes(prop.id)).forEach(prop => {
        favoritesHTML += `
          <div class="favorite-property-card">
            <i class="fas fa-times delete-item" data-id="${prop.id}"></i>
            <div style="height:150px; overflow:hidden; margin-bottom:10px; border-radius:5px;">
              <img src="${prop.image}" alt="${prop.title}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <h4>${prop.title}</h4>
            <p>${prop.location}</p>
            <p><strong>$${prop.price.toLocaleString()}</strong></p>
            <a href="#" class="view-property-btn" data-id="${prop.id}" style="background:#004466; color:white; padding:5px 10px; text-decoration:none; border-radius:5px; display:inline-block; margin-top:10px; font-size:0.9em;">View Details</a>
          </div>
        `;
      });
      
      favoritesHTML += '</div>';
      dashboardFavorites.innerHTML = favoritesHTML;
      
      // Add event listeners to favorite property delete buttons
      const deleteButtons = document.querySelectorAll('.delete-item');
      deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = Number(this.getAttribute('data-id'));
          const index = favorites.indexOf(id);
          if (index > -1) {
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            document.getElementById('favorites-count').textContent = favorites.length;
            document.getElementById('fav-count').textContent = favorites.length;
            showToast("Property removed from favorites");
            
            // Remove the card from the UI
            this.closest('.favorite-property-card').remove();
            
            // If no more favorites, show message
            if (favorites.length === 0) {
              dashboardFavorites.innerHTML = '<p>You have not saved any favorite properties yet.</p>';
            }
          }
        });
      });
    }
  }
  
  // Handle logout
  document.getElementById('logout-link').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    showToast("Successfully logged out");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });
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
