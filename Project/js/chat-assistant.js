document.addEventListener('DOMContentLoaded', function() {
  const chatWidget = document.getElementById('chat-widget');
  const chatButton = document.getElementById('open-chat');
  const closeChat = document.getElementById('close-chat');
  const chatMessages = document.getElementById('chat-messages');
  const userMessage = document.getElementById('user-message');
  const sendMessage = document.getElementById('send-message');
  
  // Open chat when chat button is clicked
  if (chatButton) {
    chatButton.addEventListener('click', function() {
      chatWidget.style.display = 'flex';
      chatButton.style.display = 'none';
    });
  }
  
  // Close chat
  if (closeChat) {
    closeChat.addEventListener('click', function() {
      chatWidget.style.display = 'none';
      chatButton.style.display = 'block';
    });
  }
  
  // Send message function
  function sendUserMessage() {
    const message = userMessage.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input field
    userMessage.value = '';
    
    // Simulate thinking time
    setTimeout(() => {
      // Get bot response
      const response = getBotResponse(message);
      addMessage(response, 'bot');
    }, 500);
  }
  
  // Send message when send button is clicked
  if (sendMessage) {
    sendMessage.addEventListener('click', sendUserMessage);
  }
  
  // Send message when Enter key is pressed
  if (userMessage) {
    userMessage.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendUserMessage();
      }
    });
  }
  
  // Add message to chat
  function addMessage(message, sender) {
    if (!chatMessages) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Bot response logic - simple keyword matching
  function getBotResponse(message) {
    message = message.toLowerCase();
    
    // Check for mortgage related questions
    if (message.includes('mortgage') || 
        message.includes('loan') || 
        message.includes('finance') || 
        message.includes('payment')) {
      return "I can help with mortgage questions! Our mortgage calculator can give you estimates based on your budget. Would you like to try our mortgage calculator?";
    }
    
    // Check for property search
    else if (message.includes('property') || 
             message.includes('house') || 
             message.includes('apartment') || 
             message.includes('home') ||
             message.includes('buy')) {
      return "We have a wide range of properties available. You can use our filter tool to find properties that match your criteria. Would you like me to help you with a specific type of property?";
    }
    
    // Check for location
    else if (message.includes('location') || 
             message.includes('area') ||
             message.includes('neighborhood') ||
             message.includes('city')) {
      return "Location is key in real estate! We have properties in many great neighborhoods. Our 'Safe Neighborhoods' tool can help you find areas with good schools and low crime rates.";
    }
    
    // Check for agent inquiries
    else if (message.includes('agent') || 
             message.includes('contact') || 
             message.includes('expert') ||
             message.includes('help')) {
      return "Our experienced agents are ready to assist you! You can view our agents in the Agents page and contact them directly. Would you like me to navigate you to our Agents page?";
    }
    
    // Check for greeting
    else if (message.includes('hello') || 
             message.includes('hi') || 
             message.includes('hey')) {
      return "Hi there! How can I help you with your property search today?";
    }
    
    // Check for thanks
    else if (message.includes('thank') || 
             message.includes('thanks')) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    // Default response
    else {
      return "I'm here to help with your real estate needs! You can ask me about properties, mortgages, locations, or connecting with our agents.";
    }
  }
});
