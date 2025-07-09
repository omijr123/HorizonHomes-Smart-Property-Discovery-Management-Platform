import React, { useState } from 'react';
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default
  
  const faqData = [
    {
      category: "Getting Started", 
      questions: [
        {
          question: "How do I start my home buying journey with Horizon Homes?",
          answer: "Getting started is easy! First, browse our property listings to get an idea of what's available in your price range. Then, get pre-approved for a mortgage using our calculator tool. Our experienced agents will help guide you through every step of the process, from finding the perfect home to closing the deal."
        },
        {
          question: "What documents do I need to buy a home?",
          answer: "You'll typically need: proof of income (pay stubs, tax returns), bank statements, credit report, employment verification, debt statements, and a valid ID. For pre-approval, we can start with basic information and gather additional documents as needed."
        },
        {
          question: "How much should I save for a down payment?",
          answer: "While 20% is traditional, many loan programs allow for lower down payments. FHA loans require as little as 3.5%, and some conventional loans allow 3% down. Veterans may qualify for VA loans with 0% down. Our mortgage calculator can help you explore different scenarios."
        }
      ]
    },
    {
      category: "Buying Process",
      questions: [
        {
          question: "How long does it take to buy a home?",
          answer: "The typical home buying process takes 30-45 days from accepted offer to closing. However, this can vary based on financing, inspections, appraisals, and negotiations. Pre-approval can help speed up the process significantly."
        },
        {
          question: "What's the difference between pre-qualification and pre-approval?",
          answer: "Pre-qualification is an estimate based on self-reported financial information. Pre-approval involves verification of your finances and credit, resulting in a conditional commitment for a specific loan amount. Pre-approval carries much more weight with sellers."
        },
        {
          question: "Should I get a home inspection?",
          answer: "Absolutely! A professional home inspection can identify potential issues that could cost thousands later. Most purchase contracts include an inspection contingency period, allowing you to negotiate repairs or withdraw your offer if major issues are found."
        },
        {
          question: "What are closing costs and how much should I expect to pay?",
          answer: "Closing costs typically range from 2-5% of the purchase price and include loan origination fees, appraisal fees, title insurance, attorney fees, and prepaid items like taxes and insurance. We'll provide a detailed breakdown during the mortgage process."
        }
      ]
    },
    {
      category: "Financing",
      questions: [
        {
          question: "What credit score do I need to buy a home?",
          answer: "Credit score requirements vary by loan type. FHA loans may accept scores as low as 580 with 3.5% down, or 500 with 10% down. Conventional loans typically require 620+, while VA loans are more flexible. Higher scores generally mean better interest rates."
        },
        {
          question: "What's the difference between fixed and adjustable rate mortgages?",
          answer: "Fixed-rate mortgages have the same interest rate for the entire loan term, providing predictable payments. Adjustable-rate mortgages (ARMs) start with a lower rate that adjusts periodically based on market conditions. ARMs can be beneficial if you plan to sell or refinance within a few years."
        },
        {
          question: "Should I pay points to lower my interest rate?",
          answer: "Points (prepaid interest) can lower your rate, but consider how long you'll stay in the home. Generally, if you'll be there long enough to recoup the upfront cost through lower payments, points can save money. Our loan officers can help calculate the break-even point."
        },
        {
          question: "What is PMI and when can I remove it?",
          answer: "Private Mortgage Insurance (PMI) is required on conventional loans with less than 20% down. It protects the lender if you default. You can typically remove PMI when you reach 20% equity through payments or appreciation, or refinance when you have sufficient equity."
        }
      ]
    },
    {
      category: "Selling",
      questions: [
        {
          question: "How do I determine my home's value?",
          answer: "We provide free Comparative Market Analysis (CMA) that looks at recent sales of similar homes in your area. Factors include location, size, condition, age, and recent improvements. Market conditions also play a significant role in determining value."
        },
        {
          question: "What should I do to prepare my home for sale?",
          answer: "Start with decluttering and deep cleaning. Consider fresh paint in neutral colors, minor repairs, and enhancing curb appeal. Professional staging can help buyers visualize themselves in the space. We'll provide a detailed preparation checklist tailored to your property."
        },
        {
          question: "How long will it take to sell my home?",
          answer: "Average time varies by market conditions, price, and location. In balanced markets, homes typically sell within 30-60 days. Proper pricing, preparation, and marketing are key to a quick sale. We'll develop a customized marketing strategy for your property."
        },
        {
          question: "What are the costs associated with selling a home?",
          answer: "Typical selling costs include real estate commissions (usually 5-6%), title insurance, attorney fees, transfer taxes, and any agreed-upon repairs. Plan for 6-10% of the sale price in total costs. We'll provide a detailed net proceeds estimate."
        }
      ]
    },
    {
      category: "Market & Investment",
      questions: [
        {
          question: "Is now a good time to buy or sell?",
          answer: "Market timing depends on your personal situation and local conditions. Our market reports provide current trends, but the best time is usually when it aligns with your life goals and financial readiness. We can help analyze your specific situation."
        },
        {
          question: "What makes a property a good investment?",
          answer: "Look for properties in growing areas with good schools, employment opportunities, and infrastructure development. Consider rental potential, appreciation history, and cash flow if buying as an investment. Location remains the most important factor for long-term value."
        },
        {
          question: "How do I invest in real estate with limited funds?",
          answer: "Consider options like house hacking (living in part of a multi-unit property), partnering with other investors, or exploring low down payment programs. Real Estate Investment Trusts (REITs) offer exposure to real estate markets with minimal capital requirements."
        }
      ]
    },
    {
      category: "Legal & Administrative",
      questions: [
        {
          question: "Do I need a real estate attorney?",
          answer: "Requirements vary by state. Some states require attorney involvement in closings, while others allow title companies to handle the process. Even where not required, an attorney can provide valuable protection for complex transactions or when issues arise."
        },
        {
          question: "What is title insurance and do I need it?",
          answer: "Title insurance protects against defects in property ownership history that could affect your ownership rights. Lenders require lender's title insurance, and we strongly recommend owner's title insurance to protect your investment. It's a one-time cost paid at closing."
        },
        {
          question: "What happens if there are issues found during the home inspection?",
          answer: "You typically have several options: negotiate for seller to make repairs, ask for a credit at closing, renegotiate the purchase price, or withdraw your offer if issues are significant. Your agent will help negotiate the best outcome based on the findings."
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, questionIndex) => {
    const itemKey = `${categoryIndex}-${questionIndex}`;
    const newOpenItems = new Set(openItems);
    
    if (newOpenItems.has(itemKey)) {
      newOpenItems.delete(itemKey);
    } else {
      newOpenItems.add(itemKey);
    }
    
    setOpenItems(newOpenItems);
  };

  const isOpen = (categoryIndex, questionIndex) => {
    return openItems.has(`${categoryIndex}-${questionIndex}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <QuestionMarkCircleIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about buying, selling, and financing your home with Horizon Homes
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                  {category.category}
                </h2>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-200">
                {category.questions.map((faq, questionIndex) => (
                  <div key={questionIndex} className="p-6">
                    <button
                      onClick={() => toggleItem(categoryIndex, questionIndex)}
                      className="w-full text-left flex items-center justify-between focus:outline-none group"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors pr-4">
                        {faq.question}
                      </h3>
                      {isOpen(categoryIndex, questionIndex) ? (
                        <ChevronUpIcon className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                      ) : (
                        <ChevronDownIcon className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                      )}
                    </button>
                    
                    {isOpen(categoryIndex, questionIndex) && (
                      <div className="mt-4 pr-8">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white">
          <div className="text-center mb-8">
            <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our experienced team is here to help. Reach out to us and we'll get you the answers you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Phone */}
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-blue-100 mb-3">Monday - Friday, 8AM - 8PM</p>
              <a 
                href="tel:+1-555-HORIZON" 
                className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                (555) HORIZON
              </a>
            </div>

            {/* Email */}
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <EnvelopeIcon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-blue-100 mb-3">We'll respond within 24 hours</p>
              <a 
                href="mailto:info@horizonhomes.com" 
                className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                info@horizonhomes.com
              </a>
            </div>

            {/* Chat */}
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ChatBubbleLeftRightIcon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-blue-100 mb-3">Available 9AM - 6PM EST</p>
              <button className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Start Chat
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Tips for Home Buyers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Get Pre-Approved First</h3>
                  <p className="text-gray-600 text-sm">Know your budget and show sellers you're serious.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Research Neighborhoods</h3>
                  <p className="text-gray-600 text-sm">Consider schools, commute times, and future development.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Budget for All Costs</h3>
                  <p className="text-gray-600 text-sm">Include closing costs, moving expenses, and immediate repairs.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Don't Skip the Inspection</h3>
                  <p className="text-gray-600 text-sm">Professional inspections can save thousands in future repairs.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Think Long-Term</h3>
                  <p className="text-gray-600 text-sm">Consider your future needs, not just current wants.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Work with Professionals</h3>
                  <p className="text-gray-600 text-sm">Experienced agents, lenders, and inspectors are invaluable.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
