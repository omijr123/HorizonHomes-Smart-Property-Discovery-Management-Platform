
document.addEventListener('DOMContentLoaded', function() {
  // Agent card hover effects
  const agentCards = document.querySelectorAll('.agent-card');
  
  agentCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // View listings button click handler
  const viewListingsButtons = document.querySelectorAll('.agent-button');
  
  viewListingsButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const agentName = this.closest('.agent-card').querySelector('h3').textContent;
      alert(`Viewing listings for ${agentName} - Feature coming soon!`);
    });
  });
  
  // Add animation for stats on scroll
  function animateStatsOnScroll() {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
      const position = stat.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if(position < screenPosition) {
        if(!stat.classList.contains('animated')) {
          stat.classList.add('animated');
          
          const targetValue = parseInt(stat.textContent);
          let currentValue = 0;
          const duration = 2000; // 2 seconds
          const increment = targetValue / (duration / 16); // 60fps approx
          
          const counter = setInterval(() => {
            currentValue += increment;
            if(currentValue >= targetValue) {
              clearInterval(counter);
              currentValue = targetValue;
            }
            stat.textContent = Math.floor(currentValue);
          }, 16);
        }
      }
    });
  }
  
  // Trigger animation on scroll
  window.addEventListener('scroll', animateStatsOnScroll);
  // Trigger once on load
  animateStatsOnScroll();

  // Agent Application Modal
  const showApplicationFormBtn = document.getElementById('show-application-form');
  const applicationModal = document.getElementById('agent-application-modal');
  const applicationClose = document.querySelector('.application-close');
  const agentApplicationForm = document.getElementById('agent-application-form');

  // Open application form modal
  if (showApplicationFormBtn) {
    showApplicationFormBtn.addEventListener('click', function() {
      applicationModal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  }

  // Close application form modal
  if (applicationClose) {
    applicationClose.addEventListener('click', function() {
      applicationModal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === applicationModal) {
      applicationModal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
  });

  // Handle application form submission
  if (agentApplicationForm) {
    agentApplicationForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic form validation
      const requiredFields = agentApplicationForm.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('invalid');
        } else {
          field.classList.remove('invalid');
        }
      });

      if (!isValid) {
        showToast('Please fill in all required fields marked with *');
        return;
      }

      // In a real application, you would send this data to a server
      const formData = new FormData(agentApplicationForm);
      const applicantName = formData.get('agent-name');
      
      // For demo purposes, just show a success message
      applicationModal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
      showToast(`Thank you, ${applicantName}! Your application has been submitted.`);
      
      // Reset the form for next use
      agentApplicationForm.reset();
    });
  }

  // Toast notification function
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
});

// Add CSS for the agent application form
const style = document.createElement('style');
style.textContent = `
  /* Agent application form styles */
  .application-form-modal {
    max-width: 700px;
    padding: 30px;
  }

  .application-form-modal h2 {
    color: #004466;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  #agent-application-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .form-row {
    display: flex;
    gap: 15px;
  }

  .form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: inherit;
    font-size: 1rem;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #0077b6;
    box-shadow: 0 0 0 2px rgba(0, 119, 182, 0.2);
  }

  .form-group.form-checkbox {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .form-group.form-checkbox input {
    width: auto;
  }

  .form-buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .submit-btn, .reset-btn {
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s;
  }

  .submit-btn {
    background: #004466;
    color: white;
    flex: 2;
  }

  .reset-btn {
    background: #f0f0f0;
    color: #333;
    flex: 1;
  }

  .submit-btn:hover {
    background: #006699;
    transform: translateY(-2px);
  }

  .reset-btn:hover {
    background: #e0e0e0;
  }

  .terms-link {
    color: #0077b6;
    text-decoration: underline;
  }

  .invalid {
    border-color: #dc3545 !important;
    background-color: rgba(220, 53, 69, 0.05);
  }

  @media (max-width: 600px) {
    .form-row {
      flex-direction: column;
    }
  }

  /* Existing agent card styles */
  .agents-hero {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../images/agents-bg.jpg') center/cover;
    color: white;
    text-align: center;
    padding: 4rem 2rem;
  }
  
  .agents-hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .agents-hero p {
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.1rem;
  }
  
  .agents-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
  }
  
  #agents-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .agent-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .agent-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  .agent-image {
    position: relative;
    height: 300px;
    overflow: hidden;
  }
  
  .agent-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .agent-card:hover .agent-image img {
    transform: scale(1.05);
  }
  
  .agent-info {
    padding: 1.5rem;
    text-align: center;
  }
  
  .agent-info h3 {
    color: #004466;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
  }
  
  .agent-title {
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    font-weight: 500;
  }
  
  .agent-contact {
    margin-top: 1.5rem;
  }
  
  .agent-contact p {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .agent-contact i {
    margin-right: 8px;
    color: #004466;
  }
  
  .agent-social {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 1.5rem;
  }
  
  .agent-social a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #f5f7fa;
    color: #004466;
    transition: all 0.3s;
  }
  
  .agent-social a:hover {
    background: #004466;
    color: white;
    transform: translateY(-3px);
  }
  
  .agent-rating {
    color: #ffcc00;
    margin-bottom: 1rem;
  }
  
  .agent-stats {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #eee;
    padding-top: 1rem;
    margin-top: 1rem;
  }
  
  .stat {
    text-align: center;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #004466;
  }
  
  .stat-label {
    font-size: 0.8rem;
    color: #666;
  }
  
  .agent-button {
    display: block;
    background: #004466;
    color: white;
    text-align: center;
    padding: 12px;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 1.5rem;
    font-weight: 500;
    transition: all 0.3s;
  }
  
  .agent-button:hover {
    background: #00598a;
  }
  
  .join-team {
    text-align: center;
    background: #f5f7fa;
    padding: 4rem 2rem;
    margin-top: 3rem;
  }
  
  .join-team h2 {
    color: #004466;
    margin-bottom: 1.5rem;
  }
  
  .join-team p {
    max-width: 800px;
    margin: 0 auto 2rem;
  }
`;
document.head.appendChild(style);
