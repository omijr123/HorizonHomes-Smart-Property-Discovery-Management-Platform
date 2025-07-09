
const isLoggedIn = () => {
  return localStorage.getItem("userLoggedIn") === "true";
};

// Check if admin is logged in
const isAdminLoggedIn = () => {
  return localStorage.getItem("adminLoggedIn") === "true";
};

// Update UI based on login status
document.addEventListener('DOMContentLoaded', function() {
  const loginLink = document.querySelector('a[href="login.html"]');
  const registerLink = document.querySelector('a[href="register.html"]');
  
  if (isLoggedIn() && loginLink) {
    // Replace login with logout
    loginLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
    loginLink.href = "#";
    loginLink.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("username");
      window.location.reload();
    });
    
    // Hide register link
    if (registerLink) {
      registerLink.style.display = 'none';
    }
  }
  
  // Add user greeting if logged in
  const username = localStorage.getItem("username");
  if (username && loginLink) {
    const nav = document.querySelector('nav');
    if (nav) {
      const greeting = document.createElement('span');
      greeting.className = 'user-greeting';
      greeting.innerHTML = `<i class="fas fa-user-circle"></i> Hi, ${username}`;
      greeting.style.color = 'white';
      greeting.style.padding = '8px 15px';
      nav.insertBefore(greeting, loginLink);
    }
  }
  
  // Protect admin page access
  if (window.location.pathname.includes('admin.html') && !isAdminLoggedIn()) {
    window.location.href = 'admin-login.html';
  }
});

// Function to handle login form
function handleLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation - in a real app this would check against a database
    if (username && password) {
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("username", username);
      window.location.href = 'index.html';
    } else {
      alert('Please enter valid credentials.');
    }
  });
}

// Initialize login handler
handleLoginForm();

// Function to handle favorites
function initFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favCount = document.getElementById('fav-count');
  
  if (favCount) {
    favCount.textContent = favorites.length;
  }
}

// Initialize favorites on page load
initFavorites();
