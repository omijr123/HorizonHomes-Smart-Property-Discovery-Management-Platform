

class ThemeToggle {
  constructor(options = {}) {
    this.config = {
      toggleSelector: options.toggleSelector || '#theme-toggle',
      darkModeClass: options.darkModeClass || 'dark-mode',
      storageKey: options.storageKey || 'horizon-theme',
      darkIcon: options.darkIcon || '<i class="fas fa-moon"></i>',
      lightIcon: options.lightIcon || '<i class="fas fa-sun"></i>',
      darkLabel: options.darkLabel || 'Dark Mode',
      lightLabel: options.lightLabel || 'Light Mode',
      autoApply: options.autoApply !== undefined ? options.autoApply : true,
      ...options
    };
    
    // Create toggle button if it doesn't exist
    this.createToggle();
    
    // Initialize
    this.init();
  }
  
  init() {
    // Get saved theme
    this.currentTheme = localStorage.getItem(this.config.storageKey) || 'light';
    
    // Apply saved theme
    if (this.config.autoApply) {
      this.applyTheme(this.currentTheme);
    }
    
    // Update toggle state
    this.updateToggleState();
    
    // Add event listeners
    this.addEventListeners();
    
    // Add theme transition style
    this.addTransitionStyles();
  }
  
  createToggle() {
    // Check if toggle already exists
    this.toggleButton = document.querySelector(this.config.toggleSelector);
    
    if (!this.toggleButton) {
      // Create and append the toggle button
      this.toggleButton = document.createElement('button');
      this.toggleButton.id = 'theme-toggle';
      this.toggleButton.className = 'theme-toggle-btn';
      this.toggleButton.setAttribute('aria-label', 'Toggle theme');
      this.toggleButton.setAttribute('title', 'Toggle between dark and light mode');
      
      // Style the button
      Object.assign(this.toggleButton.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '999',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: '#004466',
        color: 'white',
        border: 'none',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.3s ease'
      });
      
      // Append to body
      document.body.appendChild(this.toggleButton);
      
      // Add hover effect
      this.toggleButton.addEventListener('mouseover', () => {
        this.toggleButton.style.transform = 'translateY(-3px)';
        this.toggleButton.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
      });
      
      this.toggleButton.addEventListener('mouseout', () => {
        this.toggleButton.style.transform = 'translateY(0)';
        this.toggleButton.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
      });
    }
    
    // Set initial icon
    this.updateToggleState();
  }
  
  addEventListeners() {
    // Toggle theme on button click
    this.toggleButton.addEventListener('click', () => {
      this.toggleTheme();
    });
    
    // Listen for system theme changes if browser supports it
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
        if (this.config.followSystemTheme) {
          this.applyTheme(e.matches ? 'dark' : 'light');
          this.updateToggleState();
        }
      });
    }
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.currentTheme = newTheme;
    this.updateToggleState();
    
    // Save preference
    localStorage.setItem(this.config.storageKey, this.currentTheme);
    
    // Animate button
    this.toggleButton.classList.add('theme-toggle-active');
    setTimeout(() => {
      this.toggleButton.classList.remove('theme-toggle-active');
    }, 500);
    
    // Dispatch event for other components to react
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: this.currentTheme } 
    }));
  }
  
  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add(this.config.darkModeClass);
    } else {
      document.documentElement.classList.remove(this.config.darkModeClass);
    }
    
    // Add meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
  }
  
  updateToggleState() {
    if (!this.toggleButton) return;
    
    if (this.currentTheme === 'dark') {
      this.toggleButton.innerHTML = this.config.lightIcon;
      this.toggleButton.setAttribute('aria-label', this.config.lightLabel);
      this.toggleButton.setAttribute('title', this.config.lightLabel);
    } else {
      this.toggleButton.innerHTML = this.config.darkIcon;
      this.toggleButton.setAttribute('aria-label', this.config.darkLabel);
      this.toggleButton.setAttribute('title', this.config.darkLabel);
    }
  }
  
  updateMetaThemeColor(theme) {
    // Update meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    
    metaThemeColor.content = theme === 'dark' ? '#1a1a1a' : '#ffffff';
  }
  
  addTransitionStyles() {
    // Add smooth transition when changing themes
    const style = document.createElement('style');
    style.textContent = `
      body, body * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      }
      
      .theme-toggle-active {
        animation: spin 0.5s ease-in-out;
      }
      
      @keyframes spin {
        0% { transform: rotate(0); }
        100% { transform: rotate(360deg); }
      }
      
      /* Dark mode styles */
      .dark-mode {
        --bg-color: #121212;
        --text-color: #f0f0f0;
        --card-bg: #1e1e1e;
        --border-color: #333;
        --header-bg: #1a1a1a;
        --footer-bg: #1a1a1a;
        --shadow-color: rgba(0, 0, 0, 0.4);
      }
      
      .dark-mode body {
        background-color: var(--bg-color);
        color: var(--text-color);
      }
      
      .dark-mode header,
      .dark-mode footer {
        background: var(--header-bg);
      }
      
      .dark-mode .property-card,
      .dark-mode .agent-card,
      .dark-mode .filter-container,
      .dark-mode .modal-content {
        background-color: var(--card-bg);
        border-color: var(--border-color);
      }
      
      .dark-mode .property-details h3,
      .dark-mode .agent-info h3 {
        color: var(--text-color);
      }
      
      .dark-mode input,
      .dark-mode select,
      .dark-mode textarea {
        background-color: #2a2a2a;
        border-color: #444;
        color: var(--text-color);
      }
      
      .dark-mode input::placeholder {
        color: #999;
      }
      
      /* Add more dark mode styles as needed */
    `;
    
    document.head.appendChild(style);
  }
}

// Initialize theme toggle after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggle({
    followSystemTheme: true
  });
});
