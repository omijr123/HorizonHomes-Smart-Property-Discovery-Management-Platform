document.addEventListener('DOMContentLoaded', function() {
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const finalNumber = parseInt(text.replace(/\D/g, '')); 
                    const suffix = text.replace(/[\d\+]/g, '');
                    const hasPlus = text.includes('+');
                    const hasPercent = text.includes('%');
                    let current = 0;
                    const increment = finalNumber / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= finalNumber) {
                            current = finalNumber;
                            clearInterval(timer);
                        }
                        let displayValue = Math.floor(current);
                        if (hasPlus) displayValue += '+';
                        if (hasPercent) displayValue += '%';
                        
                        target.textContent = displayValue;
                    }, 40);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    function initTeamInteractions() {
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach(member => {
            const memberInfo = member.querySelector('.member-info');
            const originalBio = member.querySelector('.member-bio').textContent;
            member.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const bio = this.querySelector('.member-bio');
                    const isExpanded = this.classList.contains('expanded');
                    if (isExpanded) {
                        bio.textContent = originalBio.substring(0, 80) + '...';
                        this.classList.remove('expanded');
                    } else {
                        bio.textContent = originalBio;
                        this.classList.add('expanded');
                    }
                }
            });
            if (window.innerWidth <= 768) {
                const bio = member.querySelector('.member-bio');
                if (bio.textContent.length > 80) {
                    bio.textContent = bio.textContent.substring(0, 80) + '...';
                }
            }
        });
    }
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.mvv-card, .team-member, .award-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
    function initAwardsEffects() {
        const awardItems = document.querySelectorAll('.award-item');
        awardItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.award-icon');
                icon.style.transform = 'rotate(10deg) scale(1.1)';
            });
            item.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.award-icon');
                icon.style.transform = 'rotate(0deg) scale(1)';
            });
        });
    }
    function initProgressiveImageLoading() {
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    img.onload = function() {
                        this.style.opacity = '1';
                    };
                    if (img.complete) {
                        img.style.opacity = '1';
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    function initStoryParallax() {
        const storyImage = document.querySelector('.story-image img');
        if (storyImage) {
            window.addEventListener('scroll', () => {
                const rect = storyImage.getBoundingClientRect();
                const speed = 0.5;
                
                if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                    const yPos = -(window.pageYOffset * speed);
                    storyImage.style.transform = `translateY(${yPos}px)`;
                }
            });
        }
    }
    function initContactReveal() {
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const buttons = entry.target.querySelectorAll('.btn');
                        buttons.forEach((btn, index) => {
                            setTimeout(() => {
                                btn.style.opacity = '1';
                                btn.style.transform = 'translateY(0)';
                            }, index * 200);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            const buttons = ctaSection.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.style.opacity = '0';
                btn.style.transform = 'translateY(20px)';
                btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            observer.observe(ctaSection);
        }
    }

    // Initialize all functions
    animateStats();
    initTeamInteractions();
    initScrollAnimations();
    initAwardsEffects();
    initProgressiveImageLoading();
    initStoryParallax();
    initContactReveal();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reinitialize team interactions for responsive behavior
            initTeamInteractions();
        }, 250);
    });
});
