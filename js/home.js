// Home page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Search form functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(searchForm);
            const searchParams = {};
            
            // Get form values
            const inputs = searchForm.querySelectorAll('.search-input');
            inputs.forEach(input => {
                if (input.value) {
                    searchParams[input.name || input.placeholder] = input.value;
                }
            });
            
            // Simulate search (in real app, this would redirect to properties page with filters)
            showMessage('Searching for properties...', 'success');
            
            setTimeout(() => {
                window.location.href = 'properties.html';
            }, 1500);
        });
    }

    // Stats counter animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = parseInt(target.textContent.replace(/\D/g, ''));
                    const suffix = target.textContent.replace(/\d/g, '');
                    
                    let current = 0;
                    const increment = finalNumber / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= finalNumber) {
                            current = finalNumber;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(current) + suffix;
                    }, 40);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Property card interactions
    function initPropertyCards() {
        const propertyCards = document.querySelectorAll('.property-card');
        
        propertyCards.forEach(card => {
            // Add favorite functionality
            const heartIcon = document.createElement('div');
            heartIcon.className = 'favorite-icon';
            heartIcon.innerHTML = '<i class="far fa-heart"></i>';
            heartIcon.style.cssText = `
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(255, 255, 255, 0.9);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                opacity: 0;
                transform: scale(0.8);
            `;
            
            const propertyImage = card.querySelector('.property-image');
            if (propertyImage) {
                propertyImage.appendChild(heartIcon);
                
                // Show/hide favorite icon on hover
                card.addEventListener('mouseenter', () => {
                    heartIcon.style.opacity = '1';
                    heartIcon.style.transform = 'scale(1)';
                });
                
                card.addEventListener('mouseleave', () => {
                    if (!heartIcon.classList.contains('favorited')) {
                        heartIcon.style.opacity = '0';
                        heartIcon.style.transform = 'scale(0.8)';
                    }
                });
                
                // Toggle favorite
                heartIcon.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const icon = heartIcon.querySelector('i');
                    if (heartIcon.classList.contains('favorited')) {
                        icon.className = 'far fa-heart';
                        heartIcon.classList.remove('favorited');
                        heartIcon.style.background = 'rgba(255, 255, 255, 0.9)';
                        showMessage('Removed from favorites', 'success');
                    } else {
                        icon.className = 'fas fa-heart';
                        heartIcon.classList.add('favorited');
                        heartIcon.style.background = '#ff4757';
                        heartIcon.style.color = 'white';
                        heartIcon.style.opacity = '1';
                        heartIcon.style.transform = 'scale(1)';
                        showMessage('Added to favorites', 'success');
                    }
                });
            }
        });
    }

    // Testimonials slider (simple auto-rotation)
    function initTestimonialSlider() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        if (testimonialCards.length > 3) {
            let currentIndex = 0;
            
            // Hide all cards except first 3
            testimonialCards.forEach((card, index) => {
                if (index >= 3) {
                    card.style.display = 'none';
                }
            });
            
            setInterval(() => {
                // Hide current cards
                for (let i = currentIndex; i < currentIndex + 3; i++) {
                    if (testimonialCards[i]) {
                        testimonialCards[i].style.display = 'none';
                    }
                }
                
                // Show next set
                currentIndex = (currentIndex + 3) % testimonialCards.length;
                for (let i = currentIndex; i < currentIndex + 3; i++) {
                    const index = i % testimonialCards.length;
                    if (testimonialCards[index]) {
                        testimonialCards[index].style.display = 'block';
                    }
                }
            }, 5000);
        }
    }

    // Hero parallax effect
    function initParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    // Initialize all home page features
    animateStats();
    initPropertyCards();
    initTestimonialSlider();
    initParallax();

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #f8f9fa, #e9ecef)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
    });
});
