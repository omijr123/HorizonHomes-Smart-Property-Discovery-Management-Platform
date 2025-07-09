document.addEventListener('DOMContentLoaded', function() {
  // Lazy load images
  const lazyImages = document.querySelectorAll('.property-image-container img');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }
          
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      // Store original src in data-src attribute
      const src = img.src;
      img.setAttribute('data-src', src);
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23f8f8f8"/%3E%3C/svg%3E';
      
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
      img.classList.add('loaded');
    });
  }
  
  // Image error handling
  document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
      if (!this.src.includes('placeholder-property.jpg')) {
        this.src = 'images/placeholder-property.jpg';
        this.alt = 'Image not available';
      }
    };
  });
  
  // Add smooth reveal animation for property cards
  const revealCards = () => {
    const cards = document.querySelectorAll('.property-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 * index);
    });
  };
  
  // Initialize property card animations
  setTimeout(revealCards, 300);
});
