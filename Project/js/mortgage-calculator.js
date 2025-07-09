document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const homePriceInput = document.getElementById('home-price');
  const homePriceSlider = document.getElementById('home-price-slider');
  const downPaymentInput = document.getElementById('down-payment');
  const downPaymentSlider = document.getElementById('down-payment-slider');
  const loanTermInput = document.getElementById('loan-term');
  const loanTermSlider = document.getElementById('loan-term-slider');
  const interestRateInput = document.getElementById('interest-rate');
  const interestRateSlider = document.getElementById('interest-rate-slider');
  const propertyTaxInput = document.getElementById('property-tax');
  const homeInsuranceInput = document.getElementById('home-insurance');
  const calculateButton = document.getElementById('calculate-mortgage');
  const maxDownPaymentLabel = document.getElementById('max-down-payment');
  
  // Result elements
  const monthlyPaymentElement = document.querySelector('.monthly-payment');
  const loanAmountElement = document.getElementById('loan-amount');
  const principalInterestElement = document.getElementById('principal-interest');
  const taxAmountElement = document.getElementById('tax-amount');
  const insuranceAmountElement = document.getElementById('insurance-amount');
  const downPaymentValueElement = document.getElementById('down-payment-value');
  const totalInterestElement = document.getElementById('total-interest');
  const totalCostElement = document.getElementById('total-cost');
  const amortizationTableBody = document.getElementById('amortization-table-body');
  
  // Get favorites from localStorage for the header count
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  updateFavCount();
  
  // Sync sliders with input fields
  homePriceInput.addEventListener('input', function() {
    homePriceSlider.value = this.value;
    updateMaxDownPayment();
  });
  
  homePriceSlider.addEventListener('input', function() {
    homePriceInput.value = this.value;
    updateMaxDownPayment();
  });
  
  downPaymentInput.addEventListener('input', function() {
    downPaymentSlider.value = this.value;
  });
  
  downPaymentSlider.addEventListener('input', function() {
    downPaymentInput.value = this.value;
  });
  
  loanTermInput.addEventListener('input', function() {
    loanTermSlider.value = this.value;
  });
  
  loanTermSlider.addEventListener('input', function() {
    loanTermInput.value = this.value;
  });
  
  interestRateInput.addEventListener('input', function() {
    interestRateSlider.value = this.value;
  });
  
  interestRateSlider.addEventListener('input', function() {
    interestRateInput.value = this.value;
  });
  
  // Update max down payment based on home price
  function updateMaxDownPayment() {
    const homePrice = parseFloat(homePriceInput.value);
    downPaymentSlider.max = homePrice;
    maxDownPaymentLabel.textContent = `$${homePrice.toLocaleString()}`;
    
    // Ensure down payment doesn't exceed home price
    if (parseFloat(downPaymentInput.value) > homePrice) {
      downPaymentInput.value = homePrice;
      downPaymentSlider.value = homePrice;
    }
  }
  
  // Calculate mortgage when button is clicked
  calculateButton.addEventListener('click', calculateMortgage);
  
  function calculateMortgage() {
    // Get values from inputs
    const homePrice = parseFloat(homePriceInput.value);
    const downPayment = parseFloat(downPaymentInput.value);
    const loanTerm = parseFloat(loanTermInput.value);
    const interestRate = parseFloat(interestRateInput.value) / 100; // Convert to decimal
    const propertyTax = parseFloat(propertyTaxInput.value);
    const homeInsurance = parseFloat(homeInsuranceInput.value);
    
    // Validate inputs
    if (isNaN(homePrice) || isNaN(downPayment) || isNaN(loanTerm) || 
        isNaN(interestRate) || isNaN(propertyTax) || isNaN(homeInsurance)) {
      showToast("Please enter valid numbers for all fields", "error");
      return;
    }
    
    // Calculate loan amount
    const loanAmount = homePrice - downPayment;
    
    if (loanAmount <= 0) {
      showToast("Loan amount must be positive", "error");
      return;
    }
    
    // Calculate monthly interest rate
    const monthlyInterestRate = interestRate / 12;
    
    // Calculate number of payments
    const numberOfPayments = loanTerm * 12;
    
    // Calculate monthly payment (principal + interest)
    let monthlyPrincipalInterest;
    if (interestRate === 0) {
      monthlyPrincipalInterest = loanAmount / numberOfPayments;
    } else {
      monthlyPrincipalInterest = loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }
    
    // Calculate monthly tax and insurance
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    
    // Calculate total monthly payment
    const totalMonthlyPayment = monthlyPrincipalInterest + monthlyTax + monthlyInsurance;
    
    // Calculate total interest over the life of the loan
    const totalInterest = (monthlyPrincipalInterest * numberOfPayments) - loanAmount;
    
    // Calculate total cost (loan amount + total interest + total tax + total insurance)
    const totalCost = loanAmount + totalInterest + (propertyTax * loanTerm) + (homeInsurance * loanTerm);
    
    // Update the results in the UI
    updateResults(loanAmount, monthlyPrincipalInterest, monthlyTax, monthlyInsurance,
                totalMonthlyPayment, downPayment, totalInterest, totalCost, loanTerm,
                monthlyInterestRate);
    
    // Save calculation to history if user is logged in
    saveCalculationToHistory(homePrice, downPayment, loanTerm, interestRate, totalMonthlyPayment);
    
    showToast("Mortgage calculation complete!", "success");
  }
  
  function updateResults(loanAmount, monthlyPrincipalInterest, monthlyTax, monthlyInsurance,
                        totalMonthlyPayment, downPayment, totalInterest, totalCost, 
                        loanTerm, monthlyInterestRate) {
    // Format currency
    const formatCurrency = num => {
      return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    };
    
    // Update the UI elements
    monthlyPaymentElement.innerHTML = `
      ${formatCurrency(totalMonthlyPayment)} <span style="font-size: 1rem; font-weight: normal; color: #666;">/month</span>
    `;
    
    loanAmountElement.textContent = formatCurrency(loanAmount);
    principalInterestElement.textContent = formatCurrency(monthlyPrincipalInterest);
    taxAmountElement.textContent = formatCurrency(monthlyTax);
    insuranceAmountElement.textContent = formatCurrency(monthlyInsurance);
    downPaymentValueElement.textContent = formatCurrency(downPayment);
    totalInterestElement.textContent = formatCurrency(totalInterest);
    totalCostElement.textContent = formatCurrency(totalCost);
    
    // Generate and update amortization schedule
    generateAmortizationSchedule(loanAmount, monthlyPrincipalInterest, loanTerm, monthlyInterestRate);
  }
  
  function generateAmortizationSchedule(loanAmount, monthlyPayment, loanTerm, monthlyInterestRate) {
    if (!amortizationTableBody) return;
    
    // Clear existing rows
    amortizationTableBody.innerHTML = '';
    
    let remainingBalance = loanAmount;
    
    // For simplicity, we'll show yearly data rather than monthly
    for (let year = 1; year <= loanTerm; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      // Calculate monthly payments for a year
      for (let month = 1; month <= 12; month++) {
        const interest = remainingBalance * monthlyInterestRate;
        const principal = monthlyPayment - interest;
        
        yearlyPrincipal += principal;
        yearlyInterest += interest;
        
        remainingBalance -= principal;
        if (remainingBalance < 0) remainingBalance = 0;
      }
      
      // Create row for the year
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${year}</td>
        <td>$${yearlyPrincipal.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td>$${yearlyInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td>$${remainingBalance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
      `;
      
      amortizationTableBody.appendChild(row);
    }
  }
  
  function saveCalculationToHistory(homePrice, downPayment, loanTerm, interestRate, monthlyPayment) {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return; // Only save for logged-in users
    
    const calculationHistory = JSON.parse(localStorage.getItem('mortgageCalculations')) || [];
    
    calculationHistory.unshift({
      date: new Date().toISOString(),
      homePrice,
      downPayment,
      loanTerm,
      interestRate,
      monthlyPayment
    });
    
    // Keep only the last 10 calculations
    const trimmedHistory = calculationHistory.slice(0, 10);
    localStorage.setItem('mortgageCalculations', JSON.stringify(trimmedHistory));
  }
  
  // Action buttons functionality
  const printBtn = document.querySelector('.print-btn');
  const saveBtn = document.querySelector('.save-btn');
  const shareBtn = document.querySelector('.share-btn');
  
  if (printBtn) {
    printBtn.addEventListener('click', function() {
      window.print();
    });
  }
  
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      // Check if user is logged in
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        showToast("Please login to save calculations", "warning");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
        return;
      }
      
      showToast("Mortgage calculation saved to your account", "success");
    });
  }
  
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      const homePrice = homePriceInput.value;
      const downPayment = downPaymentInput.value;
      const loanTerm = loanTermInput.value;
      const interestRate = interestRateInput.value;
      const propertyTax = propertyTaxInput.value;
      const homeInsurance = homeInsuranceInput.value;
      
      // Create share link with query parameters
      const shareUrl = `${window.location.origin}/mortgage-calculator.html?hp=${homePrice}&dp=${downPayment}&lt=${loanTerm}&ir=${interestRate}&pt=${propertyTax}&hi=${homeInsurance}`;
      
      // Copy to clipboard
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          showToast("Share link copied to clipboard!", "success");
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
          showToast("Failed to copy link", "error");
        });
    });
  }
  
  // Check for URL parameters to pre-populate calculator
  function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('hp')) {
      homePriceInput.value = urlParams.get('hp');
      homePriceSlider.value = urlParams.get('hp');
    }
    
    if (urlParams.has('dp')) {
      downPaymentInput.value = urlParams.get('dp');
      downPaymentSlider.value = urlParams.get('dp');
    }
    
    if (urlParams.has('lt')) {
      loanTermInput.value = urlParams.get('lt');
      loanTermSlider.value = urlParams.get('lt');
    }
    
    if (urlParams.has('ir')) {
      interestRateInput.value = urlParams.get('ir');
      interestRateSlider.value = urlParams.get('ir');
    }
    
    if (urlParams.has('pt')) {
      propertyTaxInput.value = urlParams.get('pt');
    }
    
    if (urlParams.has('hi')) {
      homeInsuranceInput.value = urlParams.get('hi');
    }
    
    // Update max down payment
    updateMaxDownPayment();
    
    // If parameters were provided, auto-calculate
    if (urlParams.has('hp') || urlParams.has('dp') || urlParams.has('lt') || urlParams.has('ir')) {
      calculateMortgage();
    }
  }
  
  // Update favorites count in header
  function updateFavCount() {
    const favCount = document.getElementById("fav-count");
    if (favCount) {
      favCount.textContent = favorites.length;
    }
  }
  
  // Toast notification function
  function showToast(message, type = "success") {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Set background color based on message type
    let backgroundColor = '#004466'; // Default color
    if (type === 'error') {
      backgroundColor = '#dc3545';
    } else if (type === 'warning') {
      backgroundColor = '#ffc107';
      toast.style.color = '#333';
    }
    
    // Add styling to the toast
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: backgroundColor,
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: '2000',
      opacity: '0',
      transition: 'opacity 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => { toast.style.opacity = '1'; }, 10);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  // Initialize
  updateMaxDownPayment();
  checkUrlParameters();
});
