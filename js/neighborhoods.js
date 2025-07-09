// Neighborhoods Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Sample neighborhood data
    const neighborhoodsData = [
        {
            id: 1,
            name: "Beverly Hills",
            location: "Los Angeles, CA",
            safetyRating: "High",
            crimeRate: "Low",
            averagePrice: "$2.5M",
            walkScore: 89,
            transitScore: 67,
            bikeScore: 78,
            image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?w=400&h=250&fit=crop",
            amenities: ["Shopping", "Restaurants", "Parks", "Schools", "Medical"],
            demographics: {
                medianAge: 45,
                medianIncome: "$85,000",
                population: "34,000" 
            },
            transportation: {
                busLines: 5,
                trainStations: 2,
                highways: 3
            }
        },
        {
            id: 2,
            name: "Manhattan Beach",
            location: "Los Angeles, CA",
            safetyRating: "High",
            crimeRate: "Very Low",
            averagePrice: "$3.2M",
            walkScore: 78,
            transitScore: 45,
            bikeScore: 82,
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
            amenities: ["Beach", "Restaurants", "Shopping", "Golf", "Marina"],
            demographics: {
                medianAge: 42,
                medianIncome: "$120,000",
                population: "35,000"
            },
            transportation: {
                busLines: 3,
                trainStations: 1,
                highways: 2
            }
        },
        {
            id: 3,
            name: "Pasadena",
            location: "Los Angeles, CA",
            safetyRating: "Medium",
            crimeRate: "Medium",
            averagePrice: "$890K",
            walkScore: 68,
            transitScore: 72,
            bikeScore: 65,
            image: "https://images.unsplash.com/photo-1551845041-63e8e76836e4?w=400&h=250&fit=crop",
            amenities: ["Museums", "Shopping", "Parks", "Universities", "Arts"],
            demographics: {
                medianAge: 38,
                medianIncome: "$65,000",
                population: "142,000"
            },
            transportation: {
                busLines: 8,
                trainStations: 4,
                highways: 4
            }
        },
        {
            id: 4,
            name: "Santa Monica",
            location: "Los Angeles, CA",
            safetyRating: "Medium",
            crimeRate: "Medium",
            averagePrice: "$1.8M",
            walkScore: 92,
            transitScore: 68,
            bikeScore: 88,
            image: "https://images.unsplash.com/photo-1515090040467-c30e2e6fe26c?w=400&h=250&fit=crop",
            amenities: ["Beach", "Pier", "Shopping", "Restaurants", "Entertainment"],
            demographics: {
                medianAge: 40,
                medianIncome: "$75,000",
                population: "92,000"
            },
            transportation: {
                busLines: 12,
                trainStations: 3,
                highways: 2
            }
        },
        {
            id: 5,
            name: "West Hollywood",
            location: "Los Angeles, CA",
            safetyRating: "Medium",
            crimeRate: "Medium",
            averagePrice: "$1.2M",
            walkScore: 95,
            transitScore: 78,
            bikeScore: 75,
            image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=250&fit=crop",
            amenities: ["Nightlife", "Restaurants", "Shopping", "Arts", "LGBTQ+"],
            demographics: {
                medianAge: 35,
                medianIncome: "$58,000",
                population: "37,000"
            },
            transportation: {
                busLines: 15,
                trainStations: 2,
                highways: 3
            }
        },
        {
            id: 6,
            name: "Brentwood",
            location: "Los Angeles, CA",
            safetyRating: "High",
            crimeRate: "Low",
            averagePrice: "$2.8M",
            walkScore: 65,
            transitScore: 52,
            bikeScore: 68,
            image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop",
            amenities: ["Shopping", "Restaurants", "Parks", "Golf", "Private Schools"],
            demographics: {
                medianAge: 48,
                medianIncome: "$105,000",
                population: "32,000"
            },
            transportation: {
                busLines: 4,
                trainStations: 1,
                highways: 2
            }
        }
    ];

    let filteredNeighborhoods = [...neighborhoodsData];
    let currentView = 'grid';

    // Initialize page functionality
    initializeSearch();
    initializeFilters();
    initializeViewControls();
    displayNeighborhoods(filteredNeighborhoods);
    updateResultsCount();

    // Search functionality
    function initializeSearch() {
        const searchInput = document.getElementById('neighborhoodSearch');
        const locationSelect = document.getElementById('locationFilter');
        const priceRange = document.getElementById('priceRange');
        const searchBtn = document.querySelector('.search-btn');

        if (searchInput) {
            searchInput.addEventListener('input', debounce(performSearch, 300));
        }

        if (locationSelect) {
            locationSelect.addEventListener('change', performSearch);
        }

        if (priceRange) {
            priceRange.addEventListener('input', updatePriceDisplay);
            priceRange.addEventListener('change', performSearch);
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }
    }

    // Filter functionality
    function initializeFilters() {
        const filterToggles = document.querySelectorAll('.filter-toggle');
        const filterSections = document.querySelector('.filter-sections');
        const applyFiltersBtn = document.getElementById('applyFilters');
        const clearFiltersBtn = document.getElementById('clearFilters');

        filterToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const isActive = this.classList.contains('active');
                
                // Toggle active state
                filterToggles.forEach(t => t.classList.remove('active'));
                filterSections.classList.remove('active');
                
                if (!isActive) {
                    this.classList.add('active');
                    filterSections.classList.add('active');
                }
            });
        });

        // Initialize filter controls
        initializeSafetyFilters();
        initializeAmenityFilters();
        initializeDemographicFilters();
        initializeTransportationFilters();

        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', applyFilters);
        }

        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', clearAllFilters);
        }
    }

    function initializeSafetyFilters() {
        const safetyCheckboxes = document.querySelectorAll('input[name="safety"]');
        const crimeRateRange = document.getElementById('crimeRate');

        safetyCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });

        if (crimeRateRange) {
            crimeRateRange.addEventListener('change', applyFilters);
        }
    }

    function initializeAmenityFilters() {
        const amenityCheckboxes = document.querySelectorAll('input[name="amenities"]');
        amenityCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
    }

    function initializeDemographicFilters() {
        const ageRange = document.getElementById('medianAge');
        const incomeRange = document.getElementById('medianIncome');

        if (ageRange) {
            ageRange.addEventListener('input', updateAgeDisplay);
            ageRange.addEventListener('change', applyFilters);
        }

        if (incomeRange) {
            incomeRange.addEventListener('input', updateIncomeDisplay);
            incomeRange.addEventListener('change', applyFilters);
        }
    }

    function initializeTransportationFilters() {
        const walkScoreRange = document.getElementById('walkScore');
        const transitScoreRange = document.getElementById('transitScore');

        if (walkScoreRange) {
            walkScoreRange.addEventListener('input', updateWalkScoreDisplay);
            walkScoreRange.addEventListener('change', applyFilters);
        }

        if (transitScoreRange) {
            transitScoreRange.addEventListener('input', updateTransitScoreDisplay);
            transitScoreRange.addEventListener('change', applyFilters);
        }
    }

    // View controls
    function initializeViewControls() {
        const viewBtns = document.querySelectorAll('.view-btn');
        
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const view = this.dataset.view;
                switchView(view);
            });
        });
    }

    function switchView(view) {
        currentView = view;
        const viewBtns = document.querySelectorAll('.view-btn');
        const grid = document.querySelector('.neighborhoods-grid');

        viewBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        if (grid) {
            grid.className = `neighborhoods-${view}`;
        }

        displayNeighborhoods(filteredNeighborhoods);
    }

    // Search functions
    function performSearch() {
        const searchTerm = document.getElementById('neighborhoodSearch')?.value.toLowerCase() || '';
        const location = document.getElementById('locationFilter')?.value || '';
        const maxPrice = document.getElementById('priceRange')?.value || 5000000;

        filteredNeighborhoods = neighborhoodsData.filter(neighborhood => {
            const matchesSearch = neighborhood.name.toLowerCase().includes(searchTerm) ||
                                neighborhood.location.toLowerCase().includes(searchTerm);
            
            const matchesLocation = !location || neighborhood.location.includes(location);
            
            const price = parseFloat(neighborhood.averagePrice.replace(/[$MK,]/g, '')) * 
                         (neighborhood.averagePrice.includes('M') ? 1000000 : 1000);
            const matchesPrice = price <= maxPrice;

            return matchesSearch && matchesLocation && matchesPrice;
        });

        applyFilters();
    }

    function applyFilters() {
        let filtered = [...filteredNeighborhoods];

        // Apply safety filters
        const safetyFilters = Array.from(document.querySelectorAll('input[name="safety"]:checked'))
                                  .map(cb => cb.value);
        if (safetyFilters.length > 0) {
            filtered = filtered.filter(n => safetyFilters.includes(n.safetyRating));
        }

        // Apply amenity filters
        const amenityFilters = Array.from(document.querySelectorAll('input[name="amenities"]:checked'))
                                    .map(cb => cb.value);
        if (amenityFilters.length > 0) {
            filtered = filtered.filter(n => 
                amenityFilters.some(amenity => n.amenities.includes(amenity))
            );
        }

        // Apply score filters
        const minWalkScore = document.getElementById('walkScore')?.value || 0;
        const minTransitScore = document.getElementById('transitScore')?.value || 0;

        filtered = filtered.filter(n => 
            n.walkScore >= minWalkScore && n.transitScore >= minTransitScore
        );

        displayNeighborhoods(filtered);
        updateResultsCount(filtered.length);
    }

    function clearAllFilters() {
        // Reset ranges
        document.querySelectorAll('input[type="range"]').forEach(range => {
            range.value = range.min;
            const event = new Event('input');
            range.dispatchEvent(event);
        });

        // Reset search
        const searchInput = document.getElementById('neighborhoodSearch');
        if (searchInput) searchInput.value = '';

        const locationSelect = document.getElementById('locationFilter');
        if (locationSelect) locationSelect.value = '';

        // Reset filtered data
        filteredNeighborhoods = [...neighborhoodsData];
        displayNeighborhoods(filteredNeighborhoods);
        updateResultsCount();

        document.getElementById('crime-rate').value = 3;
        document.getElementById('school-rating').value = 8;
        document.getElementById('crime-value').textContent = '3/10';
        document.getElementById('school-value').textContent = '8/10';
        
        // Reset checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Reset select elements
        document.querySelectorAll('select').forEach(select => {
            select.selectedIndex = 0;
        });
        
        // Reset to original data
        renderNeighborhoods(neighborhoodsData);
        updateResultsCount(neighborhoodsData.length);
        
        showNotification('Filters reset successfully', 'info');
    }
    
    function updateMapLayer(layer) {
        const mapDisplay = document.querySelector('.interactive-map');
        const placeholder = mapDisplay.querySelector('.map-placeholder');
        
        // Update placeholder text based on layer
        const layerInfo = {
            safety: { icon: 'fa-shield-alt', title: 'Safety Layer Active', desc: 'Viewing crime rates and security coverage' },
            schools: { icon: 'fa-graduation-cap', title: 'Schools Layer Active', desc: 'Viewing school locations and ratings' },
            shopping: { icon: 'fa-shopping-cart', title: 'Shopping Layer Active', desc: 'Viewing shopping centers and retail locations' },
            transport: { icon: 'fa-bus', title: 'Transit Layer Active', desc: 'Viewing public transportation routes' }
        };
        
        const info = layerInfo[layer];
        placeholder.innerHTML = `
            <i class="fas ${info.icon}"></i>
            <h3>${info.title}</h3>
            <p>${info.desc}</p>
        `;
    }
    
    function initializeNeighborhoods() {
        // View toggle functionality
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                toggleButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const view = this.getAttribute('data-view');
                toggleView(view);
            });
        });
    }
    
    function toggleView(view) {
        const grid = document.getElementById('neighborhoods-grid');
        
        if (view === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }
    }
    
    function renderNeighborhoods(data) {
        const grid = document.getElementById('neighborhoods-grid');
        
        grid.innerHTML = data.map(neighborhood => `
            <div class="neighborhood-card" data-id="${neighborhood.id}">
                <div class="neighborhood-image">
                    <img src="${neighborhood.image}" alt="${neighborhood.name}" />
                    <div class="safety-badge ${neighborhood.safetyRating.toLowerCase().replace('+', '-plus')}">
                        <i class="fas fa-shield-alt"></i>
                        ${neighborhood.safetyRating}
                    </div>
                    <div class="neighborhood-overlay">
                        <button class="btn btn-primary view-details-btn" data-id="${neighborhood.id}">
                            <i class="fas fa-info-circle"></i> View Details
                        </button>
                    </div>
                </div>
                <div class="neighborhood-info">
                    <h3>${neighborhood.name}</h3>
                    <div class="neighborhood-meta">
                        <div class="meta-item">
                            <i class="fas fa-shield-alt"></i>
                            <span>Safety: ${neighborhood.safetyRating}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-graduation-cap"></i>
                            <span>Schools: ${neighborhood.schoolRating}/10</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-dollar-sign"></i>
                            <span>${neighborhood.priceRange}</span>
                        </div>
                    </div>
                    <div class="neighborhood-highlights">
                        ${neighborhood.highlights.map(highlight => 
                            `<span class="highlight-tag">${highlight}</span>`
                        ).join('')}
                    </div>
                    <p class="neighborhood-description">${neighborhood.overview}</p>
                    <div class="neighborhood-actions">
                        <button class="btn btn-outline view-details-btn" data-id="${neighborhood.id}">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-map-marked-alt"></i> View Map
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to view details buttons
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                showNeighborhoodDetails(id);
            });
        });
    }
    
    function initializeModal() {
        const modal = document.getElementById('neighborhood-modal');
        const closeBtn = document.getElementById('close-modal');
        
        closeBtn.addEventListener('click', closeModal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Tab functionality
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                switchTab(tabId);
                
                tabButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Modal action buttons
        document.getElementById('schedule-visit').addEventListener('click', function() {
            showNotification('Visit scheduling feature coming soon!', 'info');
        });
        
        document.getElementById('view-properties').addEventListener('click', function() {
            window.location.href = 'properties.html';
        });
    }
    
    function showNeighborhoodDetails(id) {
        const neighborhood = neighborhoodsData.find(n => n.id === id);
        if (!neighborhood) return;
        
        // Update modal title
        document.getElementById('modal-title').textContent = neighborhood.name;
        
        // Load overview tab
        loadOverviewTab(neighborhood);
        loadSafetyTab(neighborhood);
        loadAmenitiesTab(neighborhood);
        loadDemographicsTab(neighborhood);
        
        // Show modal
        document.getElementById('neighborhood-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function loadOverviewTab(neighborhood) {
        document.getElementById('overview-tab').innerHTML = `
            <div class="overview-content">
                <div class="overview-image">
                    <img src="${neighborhood.image}" alt="${neighborhood.name}" />
                </div>
                <div class="overview-details">
                    <h4>About ${neighborhood.name}</h4>
                    <p>${neighborhood.overview}</p>
                    
                    <div class="quick-stats">
                        <div class="stat-box">
                            <div class="stat-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div class="stat-info">
                                <h5>Safety Rating</h5>
                                <span class="stat-value">${neighborhood.safetyRating}</span>
                            </div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-icon">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div class="stat-info">
                                <h5>School Rating</h5>
                                <span class="stat-value">${neighborhood.schoolRating}/10</span>
                            </div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="stat-info">
                                <h5>Crime Rate</h5>
                                <span class="stat-value">${neighborhood.crimeRate}/10</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="highlights-section">
                        <h5>Key Highlights</h5>
                        <div class="highlights-grid">
                            ${neighborhood.highlights.map(highlight => 
                                `<div class="highlight-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${highlight}</span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function loadSafetyTab(neighborhood) {
        document.getElementById('safety-tab').innerHTML = `
            <div class="safety-content">
                <div class="safety-overview">
                    <div class="safety-score">
                        <div class="score-circle ${neighborhood.safetyRating.toLowerCase().replace('+', '-plus')}">
                            <span>${neighborhood.safetyRating}</span>
                        </div>
                        <h4>Overall Safety Rating</h4>
                    </div>
                </div>
                
                <div class="safety-metrics">
                    <div class="metric-card">
                        <div class="metric-header">
                            <i class="fas fa-chart-line"></i>
                            <h5>Crime Rate</h5>
                        </div>
                        <p>${neighborhood.safety.crimeRate}</p>
                        <div class="metric-bar">
                            <div class="metric-fill" style="width: ${100 - (neighborhood.crimeRate * 10)}%"></div>
                        </div>
                    </div>
                    
                    <div class="metric-card">
                        <div class="metric-header">
                            <i class="fas fa-clock"></i>
                            <h5>Police Response</h5>
                        </div>
                        <p>${neighborhood.safety.policeResponse}</p>
                    </div>
                    
                    <div class="metric-card">
                        <div class="metric-header">
                            <i class="fas fa-fire"></i>
                            <h5>Fire Safety</h5>
                        </div>
                        <p>${neighborhood.safety.fireSafety}</p>
                    </div>
                    
                    <div class="metric-card">
                        <div class="metric-header">
                            <i class="fas fa-eye"></i>
                            <h5>Neighborhood Watch</h5>
                        </div>
                        <p>${neighborhood.safety.neighborhoodWatch}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    function loadAmenitiesTab(neighborhood) {
        document.getElementById('amenities-tab').innerHTML = `
            <div class="amenities-content">
                <div class="amenity-section">
                    <div class="amenity-header">
                        <i class="fas fa-graduation-cap"></i>
                        <h5>Education</h5>
                    </div>
                    <p>${neighborhood.amenities.schools}</p>
                </div>
                
                <div class="amenity-section">
                    <div class="amenity-header">
                        <i class="fas fa-shopping-bag"></i>
                        <h5>Shopping</h5>
                    </div>
                    <p>${neighborhood.amenities.shopping}</p>
                </div>
                
                <div class="amenity-section">
                    <div class="amenity-header">
                        <i class="fas fa-hospital"></i>
                        <h5>Healthcare</h5>
                    </div>
                    <p>${neighborhood.amenities.healthcare}</p>
                </div>
                
                <div class="amenity-section">
                    <div class="amenity-header">
                        <i class="fas fa-tree"></i>
                        <h5>Recreation</h5>
                    </div>
                    <p>${neighborhood.amenities.recreation}</p>
                </div>
            </div>
        `;
    }
    
    function loadDemographicsTab(neighborhood) {
        document.getElementById('demographics-tab').innerHTML = `
            <div class="demographics-content">
                <div class="demo-grid">
                    <div class="demo-card">
                        <div class="demo-icon">
                            <i class="fas fa-birthday-cake"></i>
                        </div>
                        <h5>Median Age</h5>
                        <p>${neighborhood.demographics.medianAge}</p>
                    </div>
                    
                    <div class="demo-card">
                        <div class="demo-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <h5>Family Type</h5>
                        <p>${neighborhood.demographics.familyType}</p>
                    </div>
                    
                    <div class="demo-card">
                        <div class="demo-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <h5>Income Level</h5>
                        <p>${neighborhood.demographics.incomeLevel}</p>
                    </div>
                    
                    <div class="demo-card">
                        <div class="demo-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <h5>Education</h5>
                        <p>${neighborhood.demographics.education}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    function switchTab(tabId) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(tabId + '-tab').classList.add('active');
    }
    
    function closeModal() {
        document.getElementById('neighborhood-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function updateResultsCount(count) {
        document.getElementById('results-count').textContent = 
            `Showing ${count} neighborhoods matching your criteria`;
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
});

// Add notification styles to CSS
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
}

.notification.show {
    transform: translateX(0);
}

.notification-content {
    background: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 10px;
    border-left: 4px solid var(--primary-color);
}

.notification.success .notification-content {
    border-left-color: #28a745;
}

.notification.error .notification-content {
    border-left-color: #dc3545;
}

.notification button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-light);
    margin-left: auto;
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
