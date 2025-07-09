// Properties Page Functionality

// Comprehensive property data
const propertiesData = [
    {
        id: 1,
        title: "Modern Villa",
        type: "villa",
        location: "beverly-hills",
        locationName: "Beverly Hills, CA",
        price: 850000,
        bedrooms: 4,
        bathrooms: 3,
        size: 2500,
        yearBuilt: 2020,
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop"
        ],
        badge: "featured",
        amenities: ["pool", "garage", "garden", "security"],
        description: "Stunning modern villa with panoramic city views, featuring contemporary architecture and luxury finishes throughout.",
        features: {
            parking: "3-car garage",
            heating: "Central air conditioning", 
            flooring: "Hardwood and marble",
            kitchen: "Gourmet kitchen with island",
            outdoor: "Pool and landscaped garden"
        },
        agent: {
            name: "Sarah Johnson",
            phone: "(555) 123-4567",
            email: "sarah@horizonhomes.com",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 2,
        title: "Luxury Apartment",
        type: "apartment",
        location: "manhattan",
        locationName: "Manhattan, NY",
        price: 1200000,
        bedrooms: 3,
        bathrooms: 2,
        size: 1800,
        yearBuilt: 2021,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop"
        ],
        badge: "new",
        amenities: ["gym", "security", "elevator"],
        description: "Luxurious Manhattan apartment with floor-to-ceiling windows and breathtaking city skyline views.",
        features: {
            parking: "Assigned parking space",
            heating: "Central heating and cooling",
            flooring: "Premium hardwood",
            kitchen: "Modern kitchen with stainless steel appliances",
            outdoor: "Private balcony"
        },
        agent: {
            name: "Michael Chen",
            phone: "(555) 234-5678",
            email: "michael@horizonhomes.com",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 3,
        title: "Family Home",
        type: "house",
        location: "austin",
        locationName: "Austin, TX",
        price: 650000,
        bedrooms: 5,
        bathrooms: 4,
        size: 3200,
        yearBuilt: 2018,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
        ],
        badge: null,
        amenities: ["garage", "garden", "pool"],
        description: "Spacious family home in a quiet neighborhood, perfect for growing families with excellent schools nearby.",
        features: {
            parking: "2-car garage + driveway",
            heating: "Central air and heat",
            flooring: "Tile and carpet",
            kitchen: "Updated kitchen with breakfast nook",
            outdoor: "Large backyard with deck"
        },
        agent: {
            name: "Emily Rodriguez",
            phone: "(555) 345-6789",
            email: "emily@horizonhomes.com",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 4,
        title: "Beachfront Condo",
        type: "condo",
        location: "miami",
        locationName: "Miami, FL",
        price: 420000,
        bedrooms: 2,
        bathrooms: 2,
        size: 1200,
        yearBuilt: 2019,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
        ],
        badge: null,
        amenities: ["pool", "gym", "security"],
        description: "Beautiful beachfront condo with direct ocean access and resort-style amenities.",
        features: {
            parking: "Covered parking",
            heating: "Central AC",
            flooring: "Tile throughout",
            kitchen: "Open concept kitchen",
            outdoor: "Ocean-view balcony"
        },
        agent: {
            name: "David Martinez",
            phone: "(555) 456-7890",
            email: "david@horizonhomes.com",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 5,
        title: "Modern Townhouse",
        type: "townhouse",
        location: "seattle",
        locationName: "Seattle, WA",
        price: 580000,
        bedrooms: 3,
        bathrooms: 2.5,
        size: 1600,
        yearBuilt: 2020,
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop"
        ],
        badge: null,
        amenities: ["garage", "garden"],
        description: "Contemporary townhouse in a vibrant neighborhood with excellent public transportation access.",
        features: {
            parking: "Attached garage",
            heating: "Radiant floor heating",
            flooring: "Hardwood and tile",
            kitchen: "Modern kitchen with quartz counters",
            outdoor: "Private patio"
        },
        agent: {
            name: "Lisa Thompson",
            phone: "(555) 567-8901",
            email: "lisa@horizonhomes.com",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 6,
        title: "Luxury Villa",
        type: "villa",
        location: "beverly-hills",
        locationName: "Beverly Hills, CA",
        price: 2300000,
        bedrooms: 6,
        bathrooms: 5,
        size: 4500,
        yearBuilt: 2021,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop"
        ],
        badge: "luxury",
        amenities: ["pool", "garage", "garden", "gym", "security"],
        description: "Exceptional luxury villa with world-class amenities and unparalleled attention to detail.",
        features: {
            parking: "4-car garage",
            heating: "Smart climate control",
            flooring: "Italian marble and oak",
            kitchen: "Chef's kitchen with butler's pantry",
            outdoor: "Infinity pool and spa"
        },
        agent: {
            name: "Robert Kim",
            phone: "(555) 678-9012",
            email: "robert@horizonhomes.com",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 7,
        title: "Downtown Penthouse",
        type: "penthouse",
        location: "chicago",
        locationName: "Chicago, IL",
        price: 1800000,
        bedrooms: 4,
        bathrooms: 3,
        size: 2800,
        yearBuilt: 2019,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
        ],
        badge: "featured",
        amenities: ["elevator", "gym", "security"],
        description: "Stunning penthouse with panoramic city views and luxury finishes in the heart of downtown.",
        features: {
            parking: "Private parking",
            heating: "Central air and heat",
            flooring: "Premium hardwood",
            kitchen: "Gourmet kitchen with wine cellar",
            outdoor: "Private rooftop terrace"
        },
        agent: {
            name: "Amanda Wilson",
            phone: "(555) 789-0123",
            email: "amanda@horizonhomes.com",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 8,
        title: "Suburban House",
        type: "house",
        location: "austin",
        locationName: "Austin, TX",
        price: 485000,
        bedrooms: 4,
        bathrooms: 3,
        size: 2200,
        yearBuilt: 2017,
        image: "https://media.istockphoto.com/id/2155337506/photo/suburban-gardens.webp?a=1&b=1&s=612x612&w=0&k=20&c=c5JOh1_2ZW9dWY-7BFGbh8gf5jgOB5zgV0q_4YZ73eY=",
        images: [
            "https://media.istockphoto.com/id/1567429058/photo/landscaping-on-middleclass-homes-aerial-neighborhood-fresh-cut-lawns.webp?a=1&b=1&s=612x612&w=0&k=20&c=sZH-cvcPHFxo2PIuGwA3ury33Ao7t5xqKfyY0POQrjo=",
            "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
        ],
        badge: null,
        amenities: ["garage", "garden"],
        description: "Charming suburban home with modern updates and a beautiful backyard perfect for entertaining.",
        features: {
            parking: "2-car garage",
            heating: "Central HVAC",
            flooring: "Laminate and tile",
            kitchen: "Updated kitchen with island",
            outdoor: "Deck and landscaping"
        },
        agent: {
            name: "James Brown",
            phone: "(555) 890-1234",
            email: "james@horizonhomes.com",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 9,
        title: "City Loft",
        type: "apartment",
        location: "san-francisco",
        locationName: "San Francisco, CA",
        price: 920000,
        bedrooms: 2,
        bathrooms: 2,
        size: 1400,
        yearBuilt: 2020,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop"
        ],
        badge: "new",
        amenities: ["elevator", "gym"],
        description: "Industrial-style loft in a converted warehouse with exposed brick and high ceilings.",
        features: {
            parking: "Street parking",
            heating: "Exposed ductwork HVAC",
            flooring: "Polished concrete",
            kitchen: "Industrial kitchen design",
            outdoor: "Shared rooftop garden"
        },
        agent: {
            name: "Kevin Lee",
            phone: "(555) 901-2345",
            email: "kevin@horizonhomes.com",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 10,
        title: "Waterfront Condo",
        type: "condo",
        location: "boston",
        locationName: "Boston, MA",
        price: 750000,
        bedrooms: 3,
        bathrooms: 2,
        size: 1900,
        yearBuilt: 2018,
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=250&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"
        ],
        badge: null,
        amenities: ["security", "elevator"],
        description: "Elegant waterfront condo with harbor views and premium finishes throughout.",
        features: {
            parking: "Garage parking included",
            heating: "Gas heat and central air",
            flooring: "Hardwood and ceramic",
            kitchen: "European-style kitchen",
            outdoor: "Waterfront balcony"
        },
        agent: {
            name: "Rachel Green",
            phone: "(555) 012-3456",
            email: "rachel@horizonhomes.com",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        }
    }
];

// Global variables
let filteredProperties = [...propertiesData];
let currentPage = 1;
const propertiesPerPage = 6;

document.addEventListener('DOMContentLoaded', function() {
    initializeProperties();
    initializeFilters();
    initializeModal();
    initializePagination();
    
    // Load initial properties
    renderProperties();
    updateResultsCount();
});

function initializeProperties() {
    // View toggle functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            toggleView(view);
        });
    });
    
    // Sort functionality
    document.getElementById('sortBy').addEventListener('change', function() {
        sortProperties(this.value);
        renderProperties();
    });
}

function initializeFilters() {
    // Search button
    document.getElementById('searchBtn').addEventListener('click', applyFilters);
    
    // Clear filters button
    document.getElementById('clearBtn').addEventListener('click', clearAllFilters);
    
    // Advanced filters toggle
    document.getElementById('advancedToggle').addEventListener('click', function() {
        const panel = document.getElementById('advancedFilters');
        const icon = this.querySelector('.fa-chevron-down');
        
        panel.classList.toggle('active');
        icon.style.transform = panel.classList.contains('active') ? 'rotate(180deg)' : '';
    });
    
    // Filter inputs change events
    const filterInputs = document.querySelectorAll('.filter-input, input[type="checkbox"]');
    filterInputs.forEach(input => {
        input.addEventListener('change', debounce(applyFilters, 500));
    });
}

function applyFilters() {
    const filters = {
        type: document.getElementById('propertyType').value,
        location: document.getElementById('location').value,
        priceRange: document.getElementById('priceRange').value,
        bedrooms: document.getElementById('bedrooms').value,
        bathrooms: document.getElementById('bathrooms')?.value,
        propertyAge: document.getElementById('propertyAge')?.value,
        minSize: document.getElementById('minSize')?.value,
        maxSize: document.getElementById('maxSize')?.value,
        amenities: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value)
    };
    
    filteredProperties = propertiesData.filter(property => {
        // Type filter
        if (filters.type && property.type !== filters.type) return false;
        
        // Location filter
        if (filters.location && property.location !== filters.location) return false;
        
        // Price range filter
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            if (property.price < min || (max !== 99999999 && property.price > max)) return false;
        }
        
        // Bedrooms filter
        if (filters.bedrooms) {
            if (filters.bedrooms.includes('+')) {
                const minBeds = parseInt(filters.bedrooms);
                if (property.bedrooms < minBeds) return false;
            } else {
                if (property.bedrooms !== parseInt(filters.bedrooms)) return false;
            }
        }
        
        // Bathrooms filter
        if (filters.bathrooms) {
            const minBaths = parseInt(filters.bathrooms);
            if (property.bathrooms < minBaths) return false;
        }
        
        // Size filters
        if (filters.minSize && property.size < parseInt(filters.minSize)) return false;
        if (filters.maxSize && property.size > parseInt(filters.maxSize)) return false;
        
        // Property age filter
        if (filters.propertyAge) {
            const currentYear = new Date().getFullYear();
            const age = currentYear - property.yearBuilt;
            
            switch(filters.propertyAge) {
                case 'new':
                    if (age > 0) return false;
                    break;
                case '0-5':
                    if (age > 5) return false;
                    break;
                case '5-10':
                    if (age <= 5 || age > 10) return false;
                    break;
                case '10-20':
                    if (age <= 10 || age > 20) return false;
                    break;
                case '20+':
                    if (age <= 20) return false;
                    break;
            }
        }
        
        // Amenities filter
        if (filters.amenities.length > 0) {
            if (!filters.amenities.every(amenity => property.amenities.includes(amenity))) return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    renderProperties();
    updateResultsCount();
    updateActiveFilters(filters);
    updatePagination();
}

function clearAllFilters() {
    // Reset all form inputs
    document.querySelectorAll('.filter-input').forEach(input => {
        input.value = '';
    });
    
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    // Reset filtered properties
    filteredProperties = [...propertiesData];
    currentPage = 1;
    
    renderProperties();
    updateResultsCount();
    document.getElementById('activeFilters').innerHTML = '';
    updatePagination();
}

function renderProperties() {
    const grid = document.getElementById('propertiesGrid');
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const currentProperties = filteredProperties.slice(startIndex, endIndex);
    
    if (currentProperties.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-home"></i>
                <h3>No properties found</h3>
                <p>Try adjusting your search criteria</p>
                <button class="btn btn-primary" onclick="clearAllFilters()">Clear Filters</button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = currentProperties.map(property => `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" />
                ${property.badge ? `<div class="property-badge ${property.badge}">${property.badge}</div>` : ''}
                <div class="property-price">$${property.price.toLocaleString()}</div>
                <div class="favorite-icon" onclick="toggleFavorite(${property.id})">
                    <i class="far fa-heart"></i>
                </div>
                <div class="property-overlay">
                    <button class="btn btn-primary view-details-btn" onclick="showPropertyDetails(${property.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
            <div class="property-info">
                <h3>${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i> ${property.locationName}
                </p>
                <div class="property-features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>
                    <span><i class="fas fa-expand-arrows-alt"></i> ${property.size.toLocaleString()} sq ft</span>
                </div>
                <div class="property-amenities">
                    ${property.amenities.slice(0, 3).map(amenity => 
                        `<span class="amenity-tag">${amenity}</span>`
                    ).join('')}
                    ${property.amenities.length > 3 ? `<span class="amenity-more">+${property.amenities.length - 3}</span>` : ''}
                </div>
                <div class="property-actions">
                    <button class="btn btn-outline" onclick="showPropertyDetails(${property.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="btn btn-secondary" onclick="startVirtualTour(${property.id})">
                        <i class="fas fa-vr-cardboard"></i> Tour
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function showPropertyDetails(propertyId) {
    const property = propertiesData.find(p => p.id === propertyId);
    if (!property) return;
    
    // Update modal title
    document.getElementById('modalTitle').textContent = property.title;
    
    // Load overview tab
    loadOverviewTab(property);
    loadFeaturesTab(property);
    loadLocationTab(property);
    loadMortgageTab(property);
    
    // Show modal
    document.getElementById('propertyModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function loadOverviewTab(property) {
    document.getElementById('overview-tab').innerHTML = `
        <div class="overview-content">
            <div class="property-gallery">
                <div class="main-image">
                    <img src="${property.images[0]}" alt="${property.title}" id="mainImage" />
                </div>
                <div class="thumbnail-gallery">
                    ${property.images.map((img, index) => 
                        `<img src="${img}" alt="Property image ${index + 1}" onclick="changeMainImage('${img}')" />`
                    ).join('')}
                </div>
            </div>
            <div class="property-overview">
                <div class="price-section">
                    <h3>$${property.price.toLocaleString()}</h3>
                    <p class="price-per-sqft">$${Math.round(property.price / property.size)}/sq ft</p>
                </div>
                <div class="property-stats">
                    <div class="stat">
                        <i class="fas fa-bed"></i>
                        <span>${property.bedrooms} Bedrooms</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-bath"></i>
                        <span>${property.bathrooms} Bathrooms</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-expand-arrows-alt"></i>
                        <span>${property.size.toLocaleString()} sq ft</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-calendar"></i>
                        <span>Built in ${property.yearBuilt}</span>
                    </div>
                </div>
                <div class="description">
                    <h4>Description</h4>
                    <p>${property.description}</p>
                </div>
                <div class="agent-info">
                    <h4>Contact Agent</h4>
                    <div class="agent-card">
                        <img src="${property.agent.image}" alt="${property.agent.name}" />
                        <div class="agent-details">
                            <h5>${property.agent.name}</h5>
                            <p><i class="fas fa-phone"></i> ${property.agent.phone}</p>
                            <p><i class="fas fa-envelope"></i> ${property.agent.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadFeaturesTab(property) {
    document.getElementById('features-tab').innerHTML = `
        <div class="features-content">
            <div class="features-grid">
                <div class="feature-section">
                    <h4><i class="fas fa-car"></i> Parking</h4>
                    <p>${property.features.parking}</p>
                </div>
                <div class="feature-section">
                    <h4><i class="fas fa-thermometer-half"></i> Climate</h4>
                    <p>${property.features.heating}</p>
                </div>
                <div class="feature-section">
                    <h4><i class="fas fa-layer-group"></i> Flooring</h4>
                    <p>${property.features.flooring}</p>
                </div>
                <div class="feature-section">
                    <h4><i class="fas fa-utensils"></i> Kitchen</h4>
                    <p>${property.features.kitchen}</p>
                </div>
                <div class="feature-section">
                    <h4><i class="fas fa-tree"></i> Outdoor</h4>
                    <p>${property.features.outdoor}</p>
                </div>
            </div>
            <div class="amenities-section">
                <h4>Amenities</h4>
                <div class="amenities-list">
                    ${property.amenities.map(amenity => 
                        `<div class="amenity-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
                        </div>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}

function loadLocationTab(property) {
    document.getElementById('location-tab').innerHTML = `
        <div class="location-content">
            <div class="location-info">
                <h4><i class="fas fa-map-marker-alt"></i> ${property.locationName}</h4>
                <div class="location-map">
                    <div class="map-placeholder">
                        <i class="fas fa-map"></i>
                        <p>Interactive map would be displayed here</p>
                    </div>
                </div>
            </div>
            <div class="nearby-amenities">
                <h4>Nearby Amenities</h4>
                <div class="amenity-list">
                    <div class="nearby-item">
                        <i class="fas fa-graduation-cap"></i>
                        <span>Schools within 2 miles</span>
                    </div>
                    <div class="nearby-item">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Shopping centers nearby</span>
                    </div>
                    <div class="nearby-item">
                        <i class="fas fa-hospital"></i>
                        <span>Medical facilities</span>
                    </div>
                    <div class="nearby-item">
                        <i class="fas fa-bus"></i>
                        <span>Public transportation</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadMortgageTab(property) {
    document.getElementById('mortgage-tab').innerHTML = `
        <div class="mortgage-content">
            <div class="mortgage-calculator">
                <h4>Mortgage Calculator</h4>
                <div class="calculator-form">
                    <div class="form-group">
                        <label>Home Price</label>
                        <input type="number" id="homePrice" value="${property.price}" readonly />
                    </div>
                    <div class="form-group">
                        <label>Down Payment</label>
                        <input type="number" id="downPayment" value="${Math.round(property.price * 0.2)}" />
                    </div>
                    <div class="form-group">
                        <label>Interest Rate (%)</label>
                        <input type="number" id="interestRate" value="6.5" step="0.1" />
                    </div>
                    <div class="form-group">
                        <label>Loan Term (years)</label>
                        <select id="loanTerm">
                            <option value="15">15 years</option>
                            <option value="30" selected>30 years</option>
                        </select>
                    </div>
                    <button class="btn btn-primary" onclick="calculateMortgage()">Calculate</button>
                </div>
                <div class="mortgage-results" id="mortgageResults">
                    <!-- Results will be shown here -->
                </div>
            </div>
        </div>
    `;
}

function calculateMortgage() {
    const homePrice = parseFloat(document.getElementById('homePrice').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanTerm = parseInt(document.getElementById('loanTerm').value) * 12;
    
    const loanAmount = homePrice - downPayment;
    const monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / 
                          (Math.pow(1 + interestRate, loanTerm) - 1);
    
    const totalPaid = monthlyPayment * loanTerm;
    const totalInterest = totalPaid - loanAmount;
    
    document.getElementById('mortgageResults').innerHTML = `
        <div class="results-grid">
            <div class="result-item">
                <h5>Monthly Payment</h5>
                <p class="result-value">$${monthlyPayment.toFixed(2)}</p>
            </div>
            <div class="result-item">
                <h5>Total Interest</h5>
                <p class="result-value">$${totalInterest.toFixed(2)}</p>
            </div>
            <div class="result-item">
                <h5>Total Paid</h5>
                <p class="result-value">$${totalPaid.toFixed(2)}</p>
            </div>
        </div>
    `;
}

// ... Additional functions for modal, pagination, sorting, etc.

function initializeModal() {
    const modal = document.getElementById('propertyModal');
    const closeBtn = document.getElementById('closeModal');
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
            
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId + '-tab').classList.add('active');
}

function closeModal() {
    document.getElementById('propertyModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeMainImage(src) {
    document.getElementById('mainImage').src = src;
}

function toggleFavorite(propertyId) {
    // Toggle favorite functionality
    console.log('Toggle favorite for property:', propertyId);
}

function startVirtualTour(propertyId) {
    window.location.href = 'virtual-tours.html?property=' + propertyId;
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function updateResultsCount() {
    document.getElementById('resultsCount').textContent = filteredProperties.length;
}

function updateActiveFilters(filters) {
    const activeFiltersDiv = document.getElementById('activeFilters');
    const activeFilters = [];
    
    Object.entries(filters).forEach(([key, value]) => {
        if (value && value.length > 0) {
            if (Array.isArray(value)) {
                value.forEach(v => activeFilters.push(v));
            } else {
                activeFilters.push(value);
            }
        }
    });
    
    activeFiltersDiv.innerHTML = activeFilters.map(filter => 
        `<span class="filter-tag">${filter} <i class="fas fa-times" onclick="removeFilter('${filter}')"></i></span>`
    ).join('');
}

function toggleView(view) {
    const grid = document.getElementById('propertiesGrid');
    
    grid.className = 'properties-grid';
    if (view === 'list') {
        grid.classList.add('list-view');
    } else if (view === 'map') {
        grid.classList.add('map-view');
    }
}

function sortProperties(sortBy) {
    switch(sortBy) {
        case 'price-low':
            filteredProperties.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProperties.sort((a, b) => b.price - a.price);
            break;
        case 'size-large':
            filteredProperties.sort((a, b) => b.size - a.size);
            break;
        case 'size-small':
            filteredProperties.sort((a, b) => a.size - b.size);
            break;
        case 'bedrooms':
            filteredProperties.sort((a, b) => b.bedrooms - a.bedrooms);
            break;
        case 'newest':
        default:
            filteredProperties.sort((a, b) => b.yearBuilt - a.yearBuilt);
            break;
    }
}

function initializePagination() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProperties();
            updatePagination();
        }
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProperties();
            updatePagination();
        }
    });
}

function updatePagination() {
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    const numbersDiv = document.getElementById('paginationNumbers');
    
    let paginationHTML = '';
    
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
        paginationHTML += `
            <button class="pagination-number ${i === currentPage ? 'active' : ''}" 
                    onclick="goToPage(${i})">${i}</button>
        `;
    }
    
    if (totalPages > 5) {
        paginationHTML += `<span class="pagination-dots">...</span>`;
        paginationHTML += `
            <button class="pagination-number" onclick="goToPage(${totalPages})">${totalPages}</button>
        `;
    }
    
    numbersDiv.innerHTML = paginationHTML;
    
    // Update prev/next buttons
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages || totalPages === 0;
}

function goToPage(page) {
    currentPage = page;
    renderProperties();
    updatePagination();
}
