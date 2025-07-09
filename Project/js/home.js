
document.addEventListener('DOMContentLoaded', function() {
  // Preloader functionality
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', function() {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  }

  // Smooth scroll for navigation links that point to sections on the same page
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      // Show success message
      if (typeof showToast === 'function') {
        showToast(`Thank you! ${email} has been subscribed to our newsletter.`);
      } else {
        alert(`Thank you! ${email} has been subscribed to our newsletter.`);
      }
      
      // Reset form
      emailInput.value = '';
    });
  }

  // Add animation class to elements as they scroll into view
  function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }

  // Add animation class to stats items, featured properties, etc.
  document.querySelectorAll('.stat-item, .property-card, .testimonial').forEach(element => {
    element.classList.add('animate-on-scroll');
  });

  // Listen for scroll to trigger animations
  window.addEventListener('scroll', animateOnScroll);
  
  // Run once on page load
  animateOnScroll();
});

// Create toast notification if not already defined
if (typeof showToast !== 'function') {
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
}
