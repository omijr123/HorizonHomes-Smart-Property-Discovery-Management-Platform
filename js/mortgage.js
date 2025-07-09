document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMortgageCalculator();
    initPreApprovalForm();
    initFAQ();
    initCurrentRates();
    initScrollAnimations();
});
function initMortgageCalculator() {
    const calculatorInputs = document.querySelectorAll('#loan-amount, #down-payment, #interest-rate, #loan-term, #property-tax, #home-insurance, #pmi');
    const calculateBtn = document.getElementById('calculate-btn');
    calculatorInputs.forEach(input => {
        input.addEventListener('input', updateCalculations);
    });
    calculateBtn.addEventListener('click', updateCalculations); 
    updateCalculations();
    function updateDownPaymentPercentage() {
        const loanAmount = parseFloat(document.getElementById('loan-amount').value) || 0;
        const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
        const percentage = loanAmount > 0 ? ((downPayment / loanAmount) * 100).toFixed(1) : 0;
        document.getElementById('down-payment-percentage').textContent = percentage + '%';
    }
    function updateCalculations() {
        updateDownPaymentPercentage();
        const loanAmount = parseFloat(document.getElementById('loan-amount').value) || 0;
        const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
        const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
        const loanTerm = parseInt(document.getElementById('loan-term').value) || 30;
        const propertyTax = parseFloat(document.getElementById('property-tax').value) || 0;
        const homeInsurance = parseFloat(document.getElementById('home-insurance').value) || 0;
        const pmi = parseFloat(document.getElementById('pmi').value) || 0;
        const totalLoanAmount = loanAmount - downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;
        let monthlyPI = 0;
        if (monthlyRate > 0 && numberOfPayments > 0) {
            monthlyPI = totalLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                       (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }
        const monthlyTax = propertyTax / 12;
        const monthlyInsurance = homeInsurance / 12;
        const monthlyPMI = pmi;
        const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;
        const totalInterest = (monthlyPI * numberOfPayments) - totalLoanAmount;
        const totalCost = totalLoanAmount + totalInterest;
        document.getElementById('total-payment').textContent = formatCurrency(totalMonthly);
        document.getElementById('principal-interest').textContent = formatCurrency(monthlyPI);
        document.getElementById('monthly-tax').textContent = formatCurrency(monthlyTax);
        document.getElementById('monthly-insurance').textContent = formatCurrency(monthlyInsurance);
        document.getElementById('monthly-pmi').textContent = formatCurrency(monthlyPMI);
        document.getElementById('total-loan').textContent = formatCurrency(totalLoanAmount);
        document.getElementById('total-interest').textContent = formatCurrency(totalInterest);
        document.getElementById('total-cost').textContent = formatCurrency(totalCost);
        animateResults();
    }
    function animateResults() {
        const resultElements = document.querySelectorAll('.amount, .value');
        resultElements.forEach(element => {
            element.style.transform = 'scale(1.05)';
            element.style.transition = 'transform 0.2s ease';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        });
    }
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}
function initPreApprovalForm() {
    const form = document.getElementById('pre-approval-form');
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitPreApprovalForm();
        }
    });
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        clearFieldError(field);
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        if (field.type === 'number' && value) {
            const numValue = parseFloat(value);
            if (isNaN(numValue) || numValue < 0) {
                isValid = false;
                errorMessage = 'Please enter a valid positive number';
            }
        }
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        return isValid;
    }
    function showFieldError(field, message) {
        field.classList.add('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    // Clear field error
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Validate entire form
    function validateForm() {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Submit pre-approval form
    function submitPreApprovalForm() {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Application Submitted Successfully!</h3>
                <p>Thank you for your pre-approval application. Our loan officers will review your information and contact you within 24 hours.</p>
                <button onclick="this.parentNode.parentNode.remove()" class="btn btn-primary">Close</button>
            </div>
        `;
        
        document.body.appendChild(successDiv);

        // Auto remove after 10 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 10000);
    }
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
}

// Current Rates Functionality
function initCurrentRates() {
    // Update the rate date
    const rateDateElement = document.getElementById('rate-date');
    if (rateDateElement) {
        const today = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        rateDateElement.textContent = today.toLocaleDateString('en-US', options);
    }

    // Simulate rate updates (in real app, this would fetch from API)
    setTimeout(() => {
        updateRates();
    }, 3000);
}

// Update rates with animation
function updateRates() {
    const rateElements = document.querySelectorAll('.rate');
    
    rateElements.forEach(element => {
        // Add update animation
        element.style.background = '#fffbf0';
        element.style.transition = 'background 0.5s ease';
        
        setTimeout(() => {
            element.style.background = 'transparent';
        }, 1000);
    });

    // Show rate update notification
    showRateUpdateNotification();
}

// Show rate update notification
function showRateUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'rate-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-sync-alt"></i>
            <span>Rates updated</span>
        </div>
    `;
    
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animation for loan cards
                if (entry.target.classList.contains('loan-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = delay + 'ms';
                }
                
                // Special animation for rate table rows
                if (entry.target.classList.contains('table-row')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 50;
                    entry.target.style.animationDelay = delay + 'ms';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .calculator-container > *,
        .loan-card,
        .pre-approval-content > *,
        .table-row,
        .faq-item
    `);

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click handlers for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('a[href^="#"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

// CSS for animations and notifications
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }

    .error-message {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .error-message::before {
        content: '⚠';
        font-size: 0.9rem;
    }

    .success-message {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    }

    .success-content {
        background: white;
        padding: 3rem 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 500px;
        margin: 2rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .success-content i {
        font-size: 4rem;
        color: #27ae60;
        margin-bottom: 1rem;
    }

    .success-content h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #2c3e50;
    }

    .success-content p {
        color: #666;
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .rate-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: #3498db;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-content i {
        animation: spin 1s linear;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);
