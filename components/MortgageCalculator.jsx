import React, { useState, useEffect } from 'react';
import { 
  CalculatorIcon, 
  HomeIcon, 
  CurrencyDollarIcon,
  ChartPieIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const MortgageCalculator = () => {
  const [loanData, setLoanData] = useState({
    homePrice: '',
    downPayment: '',
    downPaymentPercent: '20',
    loanTerm: '30',
    interestRate: '6.5',
    propertyTax: '',
    homeInsurance: '',
    pmi: '',
    hoaFees: ''
  });

  const [results, setResults] = useState(null);
  const [showPreApproval, setShowPreApproval] = useState(false);
  const [preApprovalData, setPreApprovalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    income: '',
    employmentStatus: '',
    creditScore: '',
    debts: '',
    assets: '',
    desiredLoanAmount: '',
    propertyType: '',
    occupancy: ''
  });
  const [preApprovalSubmitted, setPreApprovalSubmitted] = useState(false);

  // Current market rates (would typically come from an API)
  const currentRates = {
    '30-year-fixed': 6.75,
    '15-year-fixed': 6.25,
    '5-1-arm': 5.95,
    'fha': 6.50,
    'va': 6.25,
    'jumbo': 7.00
  };

  useEffect(() => {
    calculateMortgage();
  }, [loanData]);

  const calculateMortgage = () => {
    const {
      homePrice,
      downPayment,
      loanTerm,
      interestRate,
      propertyTax,
      homeInsurance,
      pmi,
      hoaFees
    } = loanData;

    if (!homePrice || !downPayment || !interestRate) {
      setResults(null);
      return;
    }

    const principal = parseFloat(homePrice) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numPayments = parseInt(loanTerm) * 12;

    // Calculate monthly payment (principal and interest)
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Additional monthly costs
    const monthlyPropertyTax = parseFloat(propertyTax || 0) / 12;
    const monthlyInsurance = parseFloat(homeInsurance || 0) / 12;
    const monthlyPMI = parseFloat(pmi || 0);
    const monthlyHOA = parseFloat(hoaFees || 0);

    const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + 
      monthlyInsurance + monthlyPMI + monthlyHOA;

    // Calculate total interest paid
    const totalInterest = (monthlyPayment * numPayments) - principal;

    setResults({
      monthlyPayment: monthlyPayment,
      principalAndInterest: monthlyPayment,
      propertyTax: monthlyPropertyTax,
      insurance: monthlyInsurance,
      pmi: monthlyPMI,
      hoa: monthlyHOA,
      totalMonthlyPayment: totalMonthlyPayment,
      totalInterest: totalInterest,
      totalCost: totalInterest + principal + parseFloat(downPayment),
      loanAmount: principal,
      downPaymentAmount: parseFloat(downPayment)
    });
  };

  const handleInputChange = (field, value) => {
    setLoanData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-calculate down payment percentage
    if (field === 'homePrice' || field === 'downPayment') {
      const price = field === 'homePrice' ? parseFloat(value) : parseFloat(loanData.homePrice);
      const down = field === 'downPayment' ? parseFloat(value) : parseFloat(loanData.downPayment);
      
      if (price && down) {
        const percentage = ((down / price) * 100).toFixed(1);
        setLoanData(prev => ({
          ...prev,
          [field]: value,
          downPaymentPercent: percentage
        }));
      }
    }

    // Auto-calculate down payment amount from percentage
    if (field === 'downPaymentPercent' && loanData.homePrice) {
      const amount = (parseFloat(loanData.homePrice) * parseFloat(value) / 100).toFixed(0);
      setLoanData(prev => ({
        ...prev,
        [field]: value,
        downPayment: amount
      }));
    }
  };

  const handlePreApprovalSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    setPreApprovalSubmitted(true);
    setTimeout(() => {
      setShowPreApproval(false);
      setPreApprovalSubmitted(false);
    }, 3000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatCurrencyDetailed = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <CalculatorIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Mortgage Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate your monthly mortgage payments and explore financing options for your dream home
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HomeIcon className="h-6 w-6 mr-2 text-blue-600" />
              Loan Details
            </h2>

            <div className="space-y-6">
              {/* Home Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Price
                </label>
                <div className="relative">
                  <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={loanData.homePrice}
                    onChange={(e) => handleInputChange('homePrice', e.target.value)}
                    placeholder="500,000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment ($)
                  </label>
                  <div className="relative">
                    <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={loanData.downPayment}
                      onChange={(e) => handleInputChange('downPayment', e.target.value)}
                      placeholder="100,000"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment (%)
                  </label>
                  <input
                    type="number"
                    value={loanData.downPaymentPercent}
                    onChange={(e) => handleInputChange('downPaymentPercent', e.target.value)}
                    placeholder="20"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Loan Term and Interest Rate */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Term (Years)
                  </label>
                  <select
                    value={loanData.loanTerm}
                    onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="25">25 years</option>
                    <option value="30">30 years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    value={loanData.interestRate}
                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                    placeholder="6.5"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Additional Costs */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Additional Monthly Costs (Optional)
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Tax (Annual)
                    </label>
                    <div className="relative">
                      <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        value={loanData.propertyTax}
                        onChange={(e) => handleInputChange('propertyTax', e.target.value)}
                        placeholder="12,000"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Home Insurance (Annual)
                    </label>
                    <div className="relative">
                      <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        value={loanData.homeInsurance}
                        onChange={(e) => handleInputChange('homeInsurance', e.target.value)}
                        placeholder="2,400"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PMI (Monthly)
                    </label>
                    <div className="relative">
                      <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        value={loanData.pmi}
                        onChange={(e) => handleInputChange('pmi', e.target.value)}
                        placeholder="200"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HOA Fees (Monthly)
                    </label>
                    <div className="relative">
                      <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        value={loanData.hoaFees}
                        onChange={(e) => handleInputChange('hoaFees', e.target.value)}
                        placeholder="150"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Monthly Payment Results */}
            {results && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ChartPieIcon className="h-6 w-6 mr-2 text-green-600" />
                  Monthly Payment Breakdown
                </h2>

                {/* Total Monthly Payment */}
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-blue-600 mb-2">Total Monthly Payment</p>
                    <p className="text-4xl font-bold text-blue-900">
                      {formatCurrency(results.totalMonthlyPayment)}
                    </p>
                  </div>
                </div>

                {/* Payment Breakdown */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Principal & Interest</span>
                    <span className="font-semibold">{formatCurrencyDetailed(results.principalAndInterest)}</span>
                  </div>
                  {results.propertyTax > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Property Tax</span>
                      <span className="font-semibold">{formatCurrencyDetailed(results.propertyTax)}</span>
                    </div>
                  )}
                  {results.insurance > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Home Insurance</span>
                      <span className="font-semibold">{formatCurrencyDetailed(results.insurance)}</span>
                    </div>
                  )}
                  {results.pmi > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">PMI</span>
                      <span className="font-semibold">{formatCurrencyDetailed(results.pmi)}</span>
                    </div>
                  )}
                  {results.hoa > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">HOA Fees</span>
                      <span className="font-semibold">{formatCurrencyDetailed(results.hoa)}</span>
                    </div>
                  )}
                </div>

                {/* Loan Summary */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Loan Amount</p>
                      <p className="font-semibold">{formatCurrency(results.loanAmount)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Down Payment</p>
                      <p className="font-semibold">{formatCurrency(results.downPaymentAmount)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Interest</p>
                      <p className="font-semibold">{formatCurrency(results.totalInterest)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Cost</p>
                      <p className="font-semibold">{formatCurrency(results.totalCost)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Current Rates */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Current Interest Rates
              </h2>
              <div className="space-y-3">
                {Object.entries(currentRates).map(([type, rate]) => (
                  <div key={type} className="flex justify-between items-center py-2">
                    <span className="text-gray-600 capitalize">
                      {type.replace('-', ' ').replace('arm', 'ARM').toUpperCase()}
                    </span>
                    <span className="font-semibold text-blue-600">{rate}%</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                *Rates are updated daily and may vary based on credit score and other factors.
              </p>
            </div>

            {/* Pre-Approval CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Get Pre-Approved Today
              </h2>
              <p className="mb-6 opacity-90">
                Get a head start on your home buying journey with a mortgage pre-approval letter.
              </p>
              <button
                onClick={() => setShowPreApproval(true)}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center"
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Start Pre-Approval
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Approval Modal */}
      {showPreApproval && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {preApprovalSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for your pre-approval application. We'll review your information and contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Mortgage Pre-Approval Application
                    </h3>
                    <button
                      onClick={() => setShowPreApproval(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <span className="sr-only">Close</span>
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handlePreApprovalSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={preApprovalData.firstName}
                            onChange={(e) => setPreApprovalData({...preApprovalData, firstName: e.target.value})}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={preApprovalData.lastName}
                            onChange={(e) => setPreApprovalData({...preApprovalData, lastName: e.target.value})}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={preApprovalData.email}
                            onChange={(e) => setPreApprovalData({...preApprovalData, email: e.target.value})}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={preApprovalData.phone}
                            onChange={(e) => setPreApprovalData({...preApprovalData, phone: e.target.value})}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Financial Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Financial Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Annual Income
                          </label>
                          <input
                            type="number"
                            value={preApprovalData.income}
                            onChange={(e) => setPreApprovalData({...preApprovalData, income: e.target.value})}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Employment Status
                          </label>
                          <select
                            value={preApprovalData.employmentStatus}
                            onChange={(e) => setPreApprovalData({...preApprovalData, employmentStatus: e.target.value})}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Status</option>
                            <option value="employed">Employed</option>
                            <option value="self-employed">Self-Employed</option>
                            <option value="retired">Retired</option>
                            <option value="unemployed">Unemployed</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Credit Score Range
                          </label>
                          <select
                            value={preApprovalData.creditScore}
                            onChange={(e) => setPreApprovalData({...preApprovalData, creditScore: e.target.value})}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Range</option>
                            <option value="750+">750+</option>
                            <option value="700-749">700-749</option>
                            <option value="650-699">650-699</option>
                            <option value="600-649">600-649</option>
                            <option value="below-600">Below 600</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Monthly Debts
                          </label>
                          <input
                            type="number"
                            value={preApprovalData.debts}
                            onChange={(e) => setPreApprovalData({...preApprovalData, debts: e.target.value})}
                            placeholder="Car payments, credit cards, etc."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Liquid Assets
                          </label>
                          <input
                            type="number"
                            value={preApprovalData.assets}
                            onChange={(e) => setPreApprovalData({...preApprovalData, assets: e.target.value})}
                            placeholder="Savings, checking, investments"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Desired Loan Amount
                          </label>
                          <input
                            type="number"
                            value={preApprovalData.desiredLoanAmount}
                            onChange={(e) => setPreApprovalData({...preApprovalData, desiredLoanAmount: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Property Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Property Type
                          </label>
                          <select
                            value={preApprovalData.propertyType}
                            onChange={(e) => setPreApprovalData({...preApprovalData, propertyType: e.target.value})}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Type</option>
                            <option value="single-family">Single Family Home</option>
                            <option value="condo">Condominium</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="multi-family">Multi-Family</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Occupancy
                          </label>
                          <select
                            value={preApprovalData.occupancy}
                            onChange={(e) => setPreApprovalData({...preApprovalData, occupancy: e.target.value})}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Occupancy</option>
                            <option value="primary">Primary Residence</option>
                            <option value="secondary">Secondary/Vacation Home</option>
                            <option value="investment">Investment Property</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex space-x-4 pt-6">
                      <button
                        type="button"
                        onClick={() => setShowPreApproval(false)}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
