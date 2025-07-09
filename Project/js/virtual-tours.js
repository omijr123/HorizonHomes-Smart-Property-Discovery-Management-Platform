

document.addEventListener('DOMContentLoaded', function() {
  // Virtual Tour Modal Functionality
  const tourModal = document.getElementById('tour-modal');
  const tourIframe = document.getElementById('tour-iframe');
  const closeTour = document.querySelector('.close-tour');
  const startTourBtns = document.querySelectorAll('.start-tour');
  
  // Virtual Tour URLs (in a real application, these would come from a database)
  const tourURLs = {
    '1': 'https://my.matterport.com/show/?m=RpP9d8NQC7G',
    '2': 'https://my.matterport.com/show/?m=ZRvQRAgGgCV',
    '3': 'https://my.matterport.com/show/?m=CoPaqg84uQv',
    '4': 'https://my.matterport.com/show/?m=Zh14WDX1t6y',
    '5': 'https://my.matterport.com/show/?m=SxQL3iGyoDo',
    '6': 'https://my.matterport.com/show/?m=QNbdEy9pMEd'
  };
  
  // Track analytics for virtual tour views
  function trackTourView(tourId, propertyName) {
    // In a real application, this would send analytics data to a server
    console.log(`Virtual tour viewed: ${propertyName} (ID: ${tourId})`);
    
    // You could use actual analytics here
    if (typeof gtag !== 'undefined') {
      gtag('event', 'view_virtual_tour', {
        'tour_id': tourId,
        'property_name': propertyName
      });
    }
  }
  
  // Open tour modal when clicking "Start Tour"
  if (startTourBtns) {
    startTourBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const tourId = this.getAttribute('data-tour-id');
        const propertyName = this.closest('.tour-card').querySelector('h3').textContent;
        const tourURL = tourURLs[tourId] || 'https://my.matterport.com/show/?m=RpP9d8NQC7G';
        
        // Load the tour iframe
        tourIframe.src = tourURL;
        
        // Show the modal
        tourModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Track this view
        trackTourView(tourId, propertyName);
      });
    });
  }
  
  // Close tour modal
  if (closeTour) {
    closeTour.addEventListener('click', function() {
      closeTourModal();
    });
  }
  
  // Close modal on outside click
  if (tourModal) {
    window.addEventListener('click', function(e) {
      if (e.target === tourModal) {
        closeTourModal();
      }
    });
  }
  
  // Close modal function
  function closeTourModal() {
    tourModal.style.display = 'none';
    tourIframe.src = ''; // Stop the tour to save resources
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }
  
  // Ensure modal is closed with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && tourModal.style.display === 'block') {
      closeTourModal();
    }
  });
  
  // Testimonial Slider Functionality
  const testimonialCards = document.querySelector('.testimonial-cards');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  
  if (testimonialCards && prevBtn && nextBtn) {
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial-card').length;
    
    // Set up the slider
    function updateSlider() {
      if (!testimonialCards) return;
      
      // Use responsive approach based on current card width
      const card = document.querySelector('.testimonial-card');
      if (!card) return;
      
      const cardWidth = card.offsetWidth + parseInt(window.getComputedStyle(card).marginRight);
      testimonialCards.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
      
      // Show/hide navigation buttons based on position
      if (prevBtn) prevBtn.style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
      if (nextBtn) nextBtn.style.visibility = currentSlide >= totalSlides - 1 ? 'hidden' : 'visible';
    }
    
    // Navigate to next slide
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        if (currentSlide < totalSlides - 1) {
          currentSlide++;
          updateSlider();
        }
      });
    }
    
    // Navigate to previous slide
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        if (currentSlide > 0) {
          currentSlide--;
          updateSlider();
        }
      });
    }
    
    // Update slider on window resize
    window.addEventListener('resize', updateSlider);
    
    // Initialize slider
    updateSlider();
    
    // Auto-advance slider every 5 seconds
    let autoSlideInterval = setInterval(function() {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updateSlider();
    }, 5000);
    
    // Stop auto-advance on user interaction
    [prevBtn, nextBtn].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', function() {
          clearInterval(autoSlideInterval);
        });
      }
    });
    
    // Touch support for testimonial slider
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (testimonialCards) {
      testimonialCards.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      testimonialCards.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
      
      function handleSwipe() {
        // Left swipe
        if (touchEndX < touchStartX - 50) {
          if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
          }
        }
        // Right swipe
        if (touchEndX > touchStartX + 50) {
          if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
          }
        }
        // Cancel auto-advance on swipe
        clearInterval(autoSlideInterval);
      }
    }
  }
});
