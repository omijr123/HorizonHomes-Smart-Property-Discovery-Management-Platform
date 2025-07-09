
class AdvancedPropertyFilter {
  constructor(options = {}) {
    // Default configuration
    this.config = {
      propertiesArray: properties || [],
      renderFunction: renderProperties,
      filterContainer: document.getElementById('filters'),
      resultsContainer: document.getElementById('properties-list'),
      filtersConfig: options.filtersConfig || this.getDefaultFilters(),
      ...options
    };
    
    // Properties for filtering
    this.properties = this.config.propertiesArray;
    this.filteredProperties = [...this.properties];
    
    // Initialize
    this.init();
  }
  
  // Default filters configuration
  getDefaultFilters() {
    return [
      {
        id: 'price-range',
        type: 'range',
        label: 'Price Range',
        min: 0,
        max: 2000000,
        step: 10000,
        initialMin: 0,
        initialMax: 2000000,
        formatValue: value => `$${value.toLocaleString()}`
      },
      {
        id: 'bedrooms',
        type: 'checkbox',
        label: 'Bedrooms',
        options: [
          { value: 'any', label: 'Any' },
          { value: '1', label: '1+' },
          { value: '2', label: '2+' },
          { value: '3', label: '3+' },
          { value: '4', label: '4+' }
        ]
      },
      {
        id: 'property-type',
        type: 'select',
        label: 'Property Type',
        options: [
          { value: 'any', label: 'Any Type' },
          { value: 'house', label: 'House' },
          { value: 'apartment', label: 'Apartment' },
          { value: 'land', label: 'Land' }
        ]
      },
      {
        id: 'area-range',
        type: 'range',
        label: 'Area (sq ft)',
        min: 0,
        max: 10000,
        step: 100,
        initialMin: 0,
        initialMax: 10000,
        formatValue: value => `${value.toLocaleString()} sq ft`
      },
      {
        id: 'features',
        type: 'checkbox',
        label: 'Features',
        options: [
          { value: 'pool', label: 'Swimming Pool' },
          { value: 'garage', label: 'Garage' },
          { value: 'garden', label: 'Garden' },
          { value: 'balcony', label: 'Balcony' },
          { value: 'fireplace', label: 'Fireplace' }
        ]
      }
    ];
  }
  
  // Initialize the filter system
  init() {
    this.createFilterUI();
    this.setupEventListeners();
    
    // Check for URL parameters and apply filters if any
    this.applyURLFilters();
    
    // Initial render with possible URL filters applied
    this.applyFilters();
  }
  
  // Create filter UI elements based on config
  createFilterUI() {
    if (!this.config.filterContainer) return;
    
    // Create advanced filters UI
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'advanced-filters';
    
    this.config.filtersConfig.forEach(filter => {
      const filterGroup = document.createElement('div');
      filterGroup.className = 'filter-group';
      
      const label = document.createElement('label');
      label.textContent = filter.label;
      filterGroup.appendChild(label);
      
      let filterElement;
      
      switch (filter.type) {
        case 'range':
          filterElement = this.createRangeFilter(filter);
          break;
          
        case 'checkbox':
          filterElement = this.createCheckboxFilter(filter);
          break;
          
        case 'select':
          filterElement = this.createSelectFilter(filter);
          break;
          
        default:
          filterElement = document.createElement('div');
          filterElement.textContent = 'Unknown filter type';
      }
      
      filterGroup.appendChild(filterElement);
      filtersContainer.appendChild(filterGroup);
    });
    
    // Add search box
    const searchGroup = document.createElement('div');
    searchGroup.className = 'filter-group search-group';
    
    const searchLabel = document.createElement('label');
    searchLabel.textContent = 'Search Properties';
    searchGroup.appendChild(searchLabel);
    
    const searchBox = document.createElement('input');
    searchBox.type = 'search';
    searchBox.id = 'property-search';
    searchBox.placeholder = 'Search by location, title, or features...';
    searchGroup.appendChild(searchBox);
    
    filtersContainer.appendChild(searchGroup);
    
    // Add buttons
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'filter-actions';
    
    const applyBtn = document.createElement('button');
    applyBtn.id = 'apply-filters';
    applyBtn.innerHTML = '<i class="fas fa-search"></i> Apply Filters';
    buttonGroup.appendChild(applyBtn);
    
    const resetBtn = document.createElement('button');
    resetBtn.id = 'reset-filters';
    resetBtn.innerHTML = '<i class="fas fa-undo"></i> Reset Filters';
    buttonGroup.appendChild(resetBtn);
    
    filtersContainer.appendChild(buttonGroup);
    
    // Replace or append to filter container
    if (this.config.replaceFilterUI) {
      this.config.filterContainer.innerHTML = '';
    }
    this.config.filterContainer.appendChild(filtersContainer);
    
    // Store DOM references
    this.filterElements = {
      applyBtn,
      resetBtn,
      searchBox
    };
  }
  
  // Create a range slider filter
  createRangeFilter(filterConfig) {
    const container = document.createElement('div');
    container.className = 'range-filter';
    
    // Create double range slider
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'double-slider';
    
    const minInput = document.createElement('input');
    minInput.type = 'range';
    minInput.min = filterConfig.min;
    minInput.max = filterConfig.max;
    minInput.step = filterConfig.step;
    minInput.value = filterConfig.initialMin;
    minInput.dataset.filtertype = 'min';
    minInput.dataset.filterid = filterConfig.id;
    
    const maxInput = document.createElement('input');
    maxInput.type = 'range';
    maxInput.min = filterConfig.min;
    maxInput.max = filterConfig.max;
    maxInput.step = filterConfig.step;
    maxInput.value = filterConfig.initialMax;
    maxInput.dataset.filtertype = 'max';
    maxInput.dataset.filterid = filterConfig.id;
    
    sliderContainer.appendChild(minInput);
    sliderContainer.appendChild(maxInput);
    
    // Display values
    const valuesDisplay = document.createElement('div');
    valuesDisplay.className = 'range-values';
    
    const minValue = document.createElement('span');
    minValue.className = 'min-value';
    minValue.textContent = filterConfig.formatValue(filterConfig.initialMin);
    
    const maxValue = document.createElement('span');
    maxValue.className = 'max-value';
    maxValue.textContent = filterConfig.formatValue(filterConfig.initialMax);
    
    valuesDisplay.innerHTML = `<span class="min-value">${minValue.textContent}</span> - <span class="max-value">${maxValue.textContent}</span>`;
    
    // Update display on change
    [minInput, maxInput].forEach(input => {
      input.addEventListener('input', () => {
        const minVal = parseInt(minInput.value);
        const maxVal = parseInt(maxInput.value);
        
        // Ensure min <= max
        if (input.dataset.filtertype === 'min' && minVal > maxVal) {
          input.value = maxVal;
        } else if (input.dataset.filtertype === 'max' && maxVal < minVal) {
          input.value = minVal;
        }
        
        // Update display
        valuesDisplay.innerHTML = `
          <span class="min-value">${filterConfig.formatValue(parseInt(minInput.value))}</span> - 
          <span class="max-value">${filterConfig.formatValue(parseInt(maxInput.value))}</span>
        `;
        
        // Auto-apply filter if configured
        if (this.config.autoApplyFilters) {
          this.debounceApplyFilters();
        }
      });
    });
    
    container.appendChild(sliderContainer);
    container.appendChild(valuesDisplay);
    
    // Store reference to inputs
    this.filterElements = this.filterElements || {};
    this.filterElements[filterConfig.id] = {
      min: minInput,
      max: maxInput
    };
    
    return container;
  }
  
  // Create checkbox filter
  createCheckboxFilter(filterConfig) {
    const container = document.createElement('div');
    container.className = 'checkbox-filter';
    
    filterConfig.options.forEach(option => {
      const checkboxContainer = document.createElement('div');
      checkboxContainer.className = 'checkbox-option';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `${filterConfig.id}-${option.value}`;
      checkbox.value = option.value;
      checkbox.dataset.filterid = filterConfig.id;
      
      // Set default checked for "any"
      if (option.value === 'any') {
        checkbox.checked = true;
      }
      
      const checkboxLabel = document.createElement('label');
      checkboxLabel.htmlFor = checkbox.id;
      checkboxLabel.textContent = option.label;
      
      // Handle "Any" option
      if (option.value === 'any') {
        checkbox.addEventListener('change', () => {
          // When "Any" is checked, uncheck others
          if (checkbox.checked) {
            const otherCheckboxes = container.querySelectorAll(`input[type="checkbox"]:not(#${checkbox.id})`);
            otherCheckboxes.forEach(cb => {
              cb.checked = false;
            });
          }
        });
      } else {
        // When other options are checked, uncheck "Any"
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            const anyCheckbox = container.querySelector(`input[value="any"]`);
            if (anyCheckbox) {
              anyCheckbox.checked = false;
            }
          }
          
          // If no options selected, select "Any"
          const checkedOptions = container.querySelectorAll('input:checked');
          if (checkedOptions.length === 0) {
            const anyCheckbox = container.querySelector(`input[value="any"]`);
            if (anyCheckbox) {
              anyCheckbox.checked = true;
            }
          }
        });
      }
      
      // Auto-apply filter if configured
      checkbox.addEventListener('change', () => {
        if (this.config.autoApplyFilters) {
          this.debounceApplyFilters();
        }
      });
      
      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(checkboxLabel);
      container.appendChild(checkboxContainer);
    });
    
    // Store references
    this.filterElements = this.filterElements || {};
    this.filterElements[filterConfig.id] = container.querySelectorAll('input[type="checkbox"]');
    
    return container;
  }
  
  // Create select dropdown filter
  createSelectFilter(filterConfig) {
    const select = document.createElement('select');
    select.id = filterConfig.id;
    select.className = 'select-filter';
    
    filterConfig.options.forEach(option => {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;
      optionEl.textContent = option.label;
      select.appendChild(optionEl);
    });
    
    // Auto-apply filter if configured
    select.addEventListener('change', () => {
      if (this.config.autoApplyFilters) {
        this.debounceApplyFilters();
      }
    });
    
    // Store references
    this.filterElements = this.filterElements || {};
    this.filterElements[filterConfig.id] = select;
    
    return select;
  }
  
  // Setup event listeners for filter actions
  setupEventListeners() {
    // Apply filters button
    if (this.filterElements.applyBtn) {
      this.filterElements.applyBtn.addEventListener('click', () => {
        this.applyFilters();
      });
    }
    
    // Reset filters button
    if (this.filterElements.resetBtn) {
      this.filterElements.resetBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }
    
    // Search input
    if (this.filterElements.searchBox) {
      this.filterElements.searchBox.addEventListener('input', () => {
        if (this.config.autoApplyFilters) {
          this.debounceApplyFilters();
        }
      });
    }
  }
  
  // Debounce filter application
  debounceApplyFilters() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.applyFilters();
    }, 300);
  }
  
  // Apply all filters and render results
  applyFilters() {
    // Start with all properties
    this.filteredProperties = [...this.properties];
    
    // Apply search filter
    if (this.filterElements.searchBox) {
      const searchTerm = this.filterElements.searchBox.value.toLowerCase();
      if (searchTerm) {
        this.filteredProperties = this.filteredProperties.filter(property => 
          property.title.toLowerCase().includes(searchTerm) ||
          property.location.toLowerCase().includes(searchTerm) ||
          property.description.toLowerCase().includes(searchTerm) ||
          (property.features && property.features.some(feature => 
            feature.toLowerCase().includes(searchTerm)
          ))
        );
      }
    }
    
    // Apply range filters
    this.config.filtersConfig.forEach(filterConfig => {
      if (filterConfig.type === 'range') {
        const filterInputs = this.filterElements[filterConfig.id];
        if (filterInputs) {
          const minValue = parseInt(filterInputs.min.value);
          const maxValue = parseInt(filterInputs.max.value);
          
          switch (filterConfig.id) {
            case 'price-range':
              this.filteredProperties = this.filteredProperties.filter(property => 
                property.price >= minValue && property.price <= maxValue
              );
              break;
              
            case 'area-range':
              this.filteredProperties = this.filteredProperties.filter(property => 
                property.area >= minValue && property.area <= maxValue
              );
              break;
          }
        }
      }
    });
    
    // Apply select filters
    this.config.filtersConfig.forEach(filterConfig => {
      if (filterConfig.type === 'select') {
        const select = this.filterElements[filterConfig.id];
        if (select && select.value !== 'any') {
          switch (filterConfig.id) {
            case 'property-type':
              this.filteredProperties = this.filteredProperties.filter(property => 
                property.type === select.value
              );
              break;
          }
        }
      }
    });
    
    // Apply checkbox filters
    this.config.filtersConfig.forEach(filterConfig => {
      if (filterConfig.type === 'checkbox') {
        const checkboxes = this.filterElements[filterConfig.id];
        if (checkboxes) {
          // Convert to array for easier filtering
          const checkboxArray = Array.from(checkboxes);
          
          // Check if "Any" is selected
          const anySelected = checkboxArray.some(cb => 
            cb.value === 'any' && cb.checked
          );
          
          if (!anySelected) {
            // Get all checked values
            const checkedValues = checkboxArray
              .filter(cb => cb.checked)
              .map(cb => cb.value);
            
            if (checkedValues.length > 0) {
              switch (filterConfig.id) {
                case 'bedrooms':
                  this.filteredProperties = this.filteredProperties.filter(property => {
                    // If property has no bedrooms data, filter it out
                    if (property.bedrooms === null || property.bedrooms === undefined) {
                      return false;
                    }
                    
                    // Check if property meets any of the selected bedroom filters
                    return checkedValues.some(val => {
                      const minBedrooms = parseInt(val);
                      return property.bedrooms >= minBedrooms;
                    });
                  });
                  break;
                  
                case 'features':
                  this.filteredProperties = this.filteredProperties.filter(property => {
                    // If property has no features, filter it out
                    if (!property.features || property.features.length === 0) {
                      return false;
                    }
                    
                    // Check if property has any of the selected features
                    return checkedValues.some(feature => {
                      const normalizedFeature = feature.toLowerCase();
                      return property.features.some(propFeature => 
                        propFeature.toLowerCase().includes(normalizedFeature)
                      );
                    });
                  });
                  break;
              }
            }
          }
        }
      }
    });
    
    // Update URL with filter parameters
    this.updateURLWithFilters();
    
    // Display count
    const countDisplay = document.createElement('div');
    countDisplay.className = 'results-count';
    countDisplay.textContent = `${this.filteredProperties.length} properties found`;
    
    // Render the filtered properties
    this.config.renderFunction(this.filteredProperties);
    
    // Show count above results
    if (this.config.resultsContainer) {
      this.config.resultsContainer.parentElement.insertBefore(countDisplay, this.config.resultsContainer);
      
      // Remove previous count display if existing
      const existingCount = this.config.resultsContainer.previousElementSibling;
      if (existingCount && existingCount.className === 'results-count') {
        existingCount.remove();
      }
    }
  }
  
  // Reset all filters to default values
  resetFilters() {
    // Reset range sliders
    this.config.filtersConfig.forEach(filterConfig => {
      if (filterConfig.type === 'range') {
        const filterInputs = this.filterElements[filterConfig.id];
        if (filterInputs) {
          filterInputs.min.value = filterConfig.initialMin;
          filterInputs.max.value = filterConfig.initialMax;
        }
      }
    });
    
    // Reset select fields
    this.config.filtersConfig.forEach(filterConfig => {
      if (filterConfig.type === 'select') {
        const select = this.filterElements[filterConfig.id];
        if (select) {
          select.value = 'any';
        }
      }
    });
    
    // Reset checkboxes
    this.config.filtersConfig.forEach(filterConfig => {
      if (filterConfig.type === 'checkbox') {
        const checkboxes = this.filterElements[filterConfig.id];
        if (checkboxes) {
          checkboxes.forEach(checkbox => {
            checkbox.checked = checkbox.value === 'any';
          });
        }
      }
    });
    
    // Reset search box
    if (this.filterElements.searchBox) {
      this.filterElements.searchBox.value = '';
    }
    
    // Apply reset filters
    this.applyFilters();
  }
  
  // Update URL with current filter parameters for sharing/bookmarking
  updateURLWithFilters() {
    if (!window.history || !window.history.pushState) return;
    
    const url = new URL(window.location);
    url.searchParams.delete('filters');
    
    // Build filter state object
    const filterState = {};
    
    // Add range filters
    this.config.filtersConfig.forEach(filterConfig => {
      if (filterConfig.type === 'range') {
        const filterInputs = this.filterElements[filterConfig.id];
        if (filterInputs) {
          filterState[filterConfig.id] = {
            min: filterInputs.min.value,
            max: filterInputs.max.value
          };
        }
      }
    });
    
    // Add select filters
    this.config.filtersConfig.forEach(filterConfig => {
      if (filterConfig.type === 'select') {
        const select = this.filterElements[filterConfig.id];
        if (select && select.value !== 'any') {
          filterState[filterConfig.id] = select.value;
        }
      }
    });
    
    // Add checkbox filters
    this.config.filtersConfig.forEach(filterConfig => {
      if (filterConfig.type === 'checkbox') {
        const checkboxes = this.filterElements[filterConfig.id];
        if (checkboxes) {
          // Convert to array for easier filtering
          const checkboxArray = Array.from(checkboxes);
          const checkedValues = checkboxArray
            .filter(cb => cb.checked)
            .map(cb => cb.value);
            
          if (checkedValues.length > 0 && !(checkedValues.length === 1 && checkedValues[0] === 'any')) {
            filterState[filterConfig.id] = checkedValues;
          }
        }
      }
    });
    
    // Add search term
    if (this.filterElements.searchBox && this.filterElements.searchBox.value) {
      filterState.search = this.filterElements.searchBox.value;
    }
    
    // Add to URL if there are filters
    if (Object.keys(filterState).length > 0) {
      url.searchParams.set('filters', JSON.stringify(filterState));
      window.history.replaceState({}, '', url);
    } else {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }
  
  // Apply filters from URL parameters
  applyURLFilters() {
    const url = new URL(window.location);
    const filterParam = url.searchParams.get('filters');
    
    if (filterParam) {
      try {
        const filterState = JSON.parse(filterParam);
        
        // Apply range filters
        this.config.filtersConfig.forEach(filterConfig => {
          if (filterConfig.type === 'range' && filterState[filterConfig.id]) {
            const filterInputs = this.filterElements[filterConfig.id];
            const savedRange = filterState[filterConfig.id];
            
            if (filterInputs && savedRange) {
              if (savedRange.min) filterInputs.min.value = savedRange.min;
              if (savedRange.max) filterInputs.max.value = savedRange.max;
            }
          }
        });
        
        // Apply select filters
        this.config.filtersConfig.forEach(filterConfig => {
          if (filterConfig.type === 'select' && filterState[filterConfig.id]) {
            const select = this.filterElements[filterConfig.id];
            if (select) {
              select.value = filterState[filterConfig.id];
            }
          }
        });
        
        // Apply checkbox filters
        this.config.filtersConfig.forEach(filterConfig => {
          if (filterConfig.type === 'checkbox' && filterState[filterConfig.id]) {
            const checkboxes = this.filterElements[filterConfig.id];
            const savedValues = filterState[filterConfig.id];
            
            if (checkboxes && Array.isArray(savedValues)) {
              // First uncheck all
              checkboxes.forEach(checkbox => {
                checkbox.checked = false;
              });
              
              // Then check the saved ones
              checkboxes.forEach(checkbox => {
                if (savedValues.includes(checkbox.value)) {
                  checkbox.checked = true;
                }
              });
            }
          }
        });
        
        // Apply search term
        if (filterState.search && this.filterElements.searchBox) {
          this.filterElements.searchBox.value = filterState.search;
        }
        
      } catch (error) {
        console.error("Error parsing filter state from URL", error);
      }
    }
  }
}
