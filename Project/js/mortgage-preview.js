

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const homePriceInput = document.getElementById('quick-home-price');
  const downPaymentInput = document.getElementById('quick-down-payment');
  const termSelect = document.getElementById('quick-term');
  const priceDisplay = document.getElementById('quick-price-display');
  const downDisplay = document.getElementById('quick-down-display');
  const monthlyPayment = document.getElementById('monthly-payment');

  // Format currency function
  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  // Calculate monthly payment
  function calculateMonthlyPayment() {
    const P = homePriceInput.value * (1 - (downPaymentInput.value / 100)); // Principal
    const r = 0.04 / 12; // Monthly interest rate (assuming 4%)
    const n = termSelect.value * 12; // Loan term in months
    
    // Monthly payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    const monthlyAmount = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    monthlyPayment.textContent = formatCurrency(monthlyAmount);
    
    // Add animation effect
    monthlyPayment.classList.add('payment-updated');
    setTimeout(() => {
      monthlyPayment.classList.remove('payment-updated');
    }, 500);
  }

  // Update displays
  function updateDisplays() {
    priceDisplay.textContent = formatCurrency(homePriceInput.value);
    downDisplay.textContent = `${downPaymentInput.value}%`;
    calculateMonthlyPayment();
  }

  // Event listeners
  homePriceInput.addEventListener('input', updateDisplays);
  downPaymentInput.addEventListener('input', updateDisplays);
  termSelect.addEventListener('change', updateDisplays);

  // Initialize calculation
  updateDisplays();

  // Add some visual effects to the slider
  function updateSliderBackground() {
    const percentHomePriceValue = ((homePriceInput.value - homePriceInput.min) / (homePriceInput.max - homePriceInput.min)) * 100;
    const percentDownPaymentValue = ((downPaymentInput.value - downPaymentInput.min) / (downPaymentInput.max - downPaymentInput.min)) * 100;
    
    homePriceInput.style.background = `linear-gradient(to right, #0077b6 ${percentHomePriceValue}%, #e0e0e0 ${percentHomePriceValue}%)`;
    downPaymentInput.style.background = `linear-gradient(to right, #0077b6 ${percentDownPaymentValue}%, #e0e0e0 ${percentDownPaymentValue}%)`;
  }

  homePriceInput.addEventListener('input', updateSliderBackground);
  downPaymentInput.addEventListener('input', updateSliderBackground);
  
  // Initial background update
  updateSliderBackground();
});

// Mortgage calculator functionality for the homepage preview

function formatCurrency(amount) {
  return '$' + amount.toLocaleString();
}

function calculateMortgage(principal, downPaymentPercent, termYears, interestRate = 0.045) {
  // Calculate loan amount
  const downPaymentAmount = (principal * downPaymentPercent) / 100;
  const loanAmount = principal - downPaymentAmount;
  
  // Convert annual interest rate to monthly & convert years to months
  const monthlyRate = interestRate / 12;
  const termMonths = termYears * 12;
  
  // Calculate monthly payment using mortgage formula
  const monthlyPayment = (loanAmount * monthlyRate) / 
                         (1 - Math.pow(1 + monthlyRate, -termMonths));
  
  return {
    monthlyPayment: monthlyPayment,
    totalPayment: monthlyPayment * termMonths,
    totalInterest: (monthlyPayment * termMonths) - loanAmount,
    principalAmount: principal,
    downPaymentAmount: downPaymentAmount,
    loanAmount: loanAmount
  };
}

document.addEventListener('DOMContentLoaded', function() {
  const homePriceSlider = document.getElementById('quick-home-price');
  const homePriceDisplay = document.getElementById('quick-price-display');
  const downPaymentSlider = document.getElementById('quick-down-payment');
  const downPaymentDisplay = document.getElementById('quick-down-display');
  const termSelect = document.getElementById('quick-term');
  const monthlyPaymentDisplay = document.getElementById('monthly-payment');
  
  // Skip if we're not on a page with the calculator
  if (!homePriceSlider || !downPaymentSlider || !monthlyPaymentDisplay) {
    return;
  }
  
  // Format number as currency
  function formatCurrency(number) {
    return '$' + number.toLocaleString();
  }
  
  // Calculate monthly mortgage payment
  function calculateMortgage(principal, downPaymentPercent, years, interestRate = 0.045) {
    // Calculate loan amount after down payment
    const downPayment = (principal * downPaymentPercent) / 100;
    const loanAmount = principal - downPayment;
    
    // Calculate monthly interest rate from annual rate
    const monthlyRate = interestRate / 12;
    
    // Calculate total number of payments
    const payments = years * 12;
    
    // Calculate monthly payment using mortgage formula
    const x = Math.pow(1 + monthlyRate, payments);
    const monthly = (loanAmount * x * monthlyRate) / (x - 1);
    
    return Math.round(monthly);
  }
  
  // Update calculator displays
  function updateCalculator() {
    const homePrice = parseInt(homePriceSlider.value);
    const downPaymentPercent = parseInt(downPaymentSlider.value);
    const term = parseInt(termSelect.value);
    
    homePriceDisplay.textContent = formatCurrency(homePrice);
    downPaymentDisplay.textContent = downPaymentPercent + '%';
    
    const monthlyPayment = calculateMortgage(homePrice, downPaymentPercent, term);
    monthlyPaymentDisplay.textContent = formatCurrency(monthlyPayment);
    
    // Add simple animation effect
    monthlyPaymentDisplay.classList.add('highlight');
    setTimeout(() => {
      monthlyPaymentDisplay.classList.remove('highlight');
    }, 300);
  }
  
  // Add event listeners to calculator inputs
  homePriceSlider.addEventListener('input', updateCalculator);
  downPaymentSlider.addEventListener('input', updateCalculator);
  termSelect.addEventListener('change', updateCalculator);
  
  // Initialize calculator
  updateCalculator();
});
