document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const priceSlider = document.getElementById('price-slider');
    const rangeBar = document.getElementById('range-bar');
    const handleMin = document.getElementById('handle-min');
    const handleMax = document.getElementById('handle-max');
    const inputMin = document.querySelector('.price-input[placeholder="Từ"]');
    const inputMax = document.querySelector('.price-input[placeholder="Đến"]');
    const applyBtn = document.querySelector('.apply-btn');
    
    // Price range configuration
    const minPrice = 0;
    const maxPrice = 100000000; // 100,000,000 VND
    
    // Set initial values
    let minValue = minPrice;
    let maxValue = maxPrice;
    
    // Format price as VND
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    // Convert price to position
    function priceToPosition(price) {
        return ((price - minPrice) / (maxPrice - minPrice)) * 100;
    }
    
    // Convert position to price
    function positionToPrice(position) {
        // Calculate raw price
        const rawPrice = ((position / 100) * (maxPrice - minPrice)) + minPrice;
        // Round to nearest 1,000,000 VND
        return Math.round(rawPrice / 1000000) * 1000000;
    }
    
    // Update slider visuals
    function updateSlider() {
        // Ensure minValue is always less than maxValue
        if (minValue > maxValue) {
            [minValue, maxValue] = [maxValue, minValue];
        }
        
        const minPos = priceToPosition(minValue);
        const maxPos = priceToPosition(maxValue);
        
        // Update handles position
        handleMin.style.left = minPos + '%';
        handleMax.style.left = maxPos + '%';
        
        // Ensure handles don't go outside the container
        if (minPos === 0) {
            handleMin.style.transform = 'translateX(0)';
        } else if (minPos === 100) {
            handleMin.style.transform = 'translateX(-16px)';
        } else {
            handleMin.style.transform = 'translateX(-8px)';
        }
        
        if (maxPos === 0) {
            handleMax.style.transform = 'translateX(0)';
        } else if (maxPos === 100) {
            handleMax.style.transform = 'translateX(-16px)';
        } else {
            handleMax.style.transform = 'translateX(-8px)';
        }
        
        // Update range bar
        rangeBar.style.left = minPos + '%';
        rangeBar.style.width = (maxPos - minPos) + '%';
        
        // Update input values
        inputMin.value = formatPrice(minValue);
        inputMax.value = formatPrice(maxValue);
    }
    
    // Handle drag functionality
    function initDrag() {
        let activeHandle = null;
        let startX, startLeft;
        
        // Mouse down event
        function handleStart(e, handle) {
            e.preventDefault();
            activeHandle = handle;
            startX = e.clientX || e.touches[0].clientX;
            startLeft = parseFloat(handle.style.left || 0);
            
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('mouseup', handleEnd);
            document.addEventListener('touchend', handleEnd);
        }
        
        // Mouse move event
        function handleMove(e) {
            if (!activeHandle) return;
            
            const clientX = e.clientX || e.touches[0].clientX;
            const deltaX = clientX - startX;
            const sliderWidth = priceSlider.offsetWidth;
            let newLeft = startLeft + (deltaX / sliderWidth) * 100;
            
            // Constraint movement within bounds (0-100%)
            newLeft = Math.max(0, Math.min(100, newLeft));
            
            // Calculate price based on position
            const newPrice = positionToPrice(newLeft);
            
            // Update active handle position
            activeHandle.style.left = newLeft + '%';
            
            // Swap handles if they cross each other
            if (activeHandle === handleMin && newLeft > parseFloat(handleMax.style.left || 100)) {
                // Min handle moved past max handle, swap their roles
                activeHandle = handleMax;
                minValue = maxValue;
                maxValue = newPrice;
                
                // Swap handle references
                const temp = handleMin;
                handleMin = handleMax;
                handleMax = temp;
            } else if (activeHandle === handleMax && newLeft < parseFloat(handleMin.style.left || 0)) {
                // Max handle moved past min handle, swap their roles
                activeHandle = handleMin;
                maxValue = minValue;
                minValue = newPrice;
                
                // Swap handle references
                const temp = handleMax;
                handleMax = handleMin;
                handleMin = temp;
            } else {
                // Normal movement (no swap)
                if (activeHandle === handleMin) {
                    minValue = newPrice;
                } else {
                    maxValue = newPrice;
                }
            }
            
            // Update slider visuals
            updateSlider();
        }
        
        // Mouse up event
        function handleEnd() {
            activeHandle = null;
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchend', handleEnd);
        }
        
        // Initialize event listeners for handles
        handleMin.addEventListener('mousedown', (e) => handleStart(e, handleMin));
        handleMin.addEventListener('touchstart', (e) => handleStart(e, handleMin));
        handleMax.addEventListener('mousedown', (e) => handleStart(e, handleMax));
        handleMax.addEventListener('touchstart', (e) => handleStart(e, handleMax));
    }
    
    // Input field change events
    inputMin.addEventListener('change', function() {
        const value = parseInt(this.value.replace(/\D/g, '')) || minPrice;
        // Round to nearest 1,000,000 and ensure it's less than maxValue
        const roundedValue = Math.round(value / 1000000) * 1000000;
        minValue = Math.max(minPrice, Math.min(maxValue - 1000000, roundedValue));
        updateSlider();
    });
    
    inputMax.addEventListener('change', function() {
        const value = parseInt(this.value.replace(/\D/g, '')) || maxPrice;
        // Round to nearest 1,000,000 and ensure it's greater than minValue
        const roundedValue = Math.round(value / 1000000) * 1000000;
        maxValue = Math.min(maxPrice, Math.max(minValue + 1000000, roundedValue));
        updateSlider();
    });
    
    // Apply button click event
    applyBtn.addEventListener('click', function() {
        // Here you can add the code to apply the filter
        console.log('Filter applied with range:', minValue, 'to', maxValue);
    });
    
    // Initialize slider
    initDrag();
    updateSlider();
});