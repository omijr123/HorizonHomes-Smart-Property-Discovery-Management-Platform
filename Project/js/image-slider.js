

class ImageSlider {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) return;
    
    // Default options
    this.options = {
      autoplay: options.autoplay || false,
      interval: options.interval || 3000,
      navigation: options.navigation !== undefined ? options.navigation : true,
      pagination: options.pagination !== undefined ? options.pagination : true,
      effect: options.effect || 'slide', // slide, fade
      loop: options.loop !== undefined ? options.loop : true,
      ...options
    };
    
    // Slider elements
    this.slides = this.container.querySelectorAll('.slide');
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    this.isAnimating = false;
    this.autoplayInterval = null;
    
    // Early return if no slides
    if (this.totalSlides === 0) return;
    
    // Initialize slider
    this.init();
  }
  
  init() {
    // Create slider structure
    this.container.classList.add('image-slider-container');
    
    // Create wrapper for slides
    this.sliderTrack = document.createElement('div');
    this.sliderTrack.classList.add('slider-track');
    
    // Wrap slides in track
    Array.from(this.slides).forEach(slide => {
      slide.classList.add('slider-slide');
      this.sliderTrack.appendChild(slide);
    });
    
    // Clear container and add track
    this.container.innerHTML = '';
    this.container.appendChild(this.sliderTrack);
    
    // Add navigation if enabled
    if (this.options.navigation) {
      this.addNavigation();
    }
    
    // Add pagination if enabled
    if (this.options.pagination) {
      this.addPagination();
    }
    
    // Set initial slide
    this.goToSlide(0);
    
    // Start autoplay if enabled
    if (this.options.autoplay) {
      this.startAutoplay();
    }
    
    // Add swipe events for mobile
    this.addSwipeSupport();
  }
  
  addNavigation() {
    // Create prev/next buttons
    this.prevBtn = document.createElement('button');
    this.nextBtn = document.createElement('button');
    
    this.prevBtn.classList.add('slider-nav', 'slider-prev');
    this.nextBtn.classList.add('slider-nav', 'slider-next');
    
    this.prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    this.nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    // Add event listeners
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Add to container
    this.container.appendChild(this.prevBtn);
    this.container.appendChild(this.nextBtn);
  }
  
  addPagination() {
    this.pagination = document.createElement('div');
    this.pagination.classList.add('slider-pagination');
    
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('slider-dot');
      dot.addEventListener('click', () => this.goToSlide(i));
      this.pagination.appendChild(dot);
    }
    
    this.container.appendChild(this.pagination);
  }
  
  updatePagination() {
    if (!this.options.pagination) return;
    
    const dots = this.pagination.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }
  
  goToSlide(index) {
    if (this.isAnimating) return;
    
    // Handle loop option
    if (index < 0) {
      index = this.options.loop ? this.totalSlides - 1 : 0;
    } else if (index >= this.totalSlides) {
      index = this.options.loop ? 0 : this.totalSlides - 1;
    }
    
    // Set current slide
    const previousIndex = this.currentIndex;
    this.currentIndex = index;
    
    // Update slide positions based on effect
    if (this.options.effect === 'fade') {
      this.slides.forEach((slide, i) => {
        slide.style.opacity = i === this.currentIndex ? '1' : '0';
        slide.style.zIndex = i === this.currentIndex ? '1' : '0';
      });
    } else {
      // Default slide effect
      this.sliderTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
    
    // Update pagination
    this.updatePagination();
  }
  
  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }
  
  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }
  
  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.options.interval);
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  addSwipeSupport() {
    let startX;
    let endX;
    const minSwipeDistance = 50;
    
    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      this.stopAutoplay();
    });
    
    this.container.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    });
    
    this.container.addEventListener('touchend', (e) => {
      const swipeDistance = endX - startX;
      
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          this.prevSlide();
        } else {
          this.nextSlide();
        }
      }
      
      if (this.options.autoplay) {
        this.startAutoplay();
      }
    });
  }
  
  // Cleanup method
  destroy() {
    this.stopAutoplay();
    this.container.innerHTML = '';
    // Restore original content if needed
  }
}
