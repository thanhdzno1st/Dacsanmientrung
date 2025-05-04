document.addEventListener('DOMContentLoaded', function() {
    // Tìm nút "Xóa tất cả"
    const clearAllButton = document.querySelector('.clear-all');
    
    if (clearAllButton) {
        clearAllButton.addEventListener('click', function() {
            // 1. Reset tất cả các checkbox về trạng thái chưa chọn
            const checkboxes = document.querySelectorAll('.filter-content .checkbox-item input[type="checkbox"]');
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = false;
            });
            
            // 2. Reset price-range-slider (nếu có)
            resetPriceRangeSlider();
            
            // 3. Reset các switch toggle về trạng thái mặc định
            resetSwitchToggles();
            
            // 4. Hiển thị thông báo nhanh cho người dùng
            showResetNotification();
        });
    }
    
    // Hàm reset thanh trượt giá về giá trị mặc định
    function resetPriceRangeSlider() {
        // Tìm các thành phần của price range slider
        const priceSlider = document.getElementById('price-slider');
        
        if (priceSlider) {
            const handleMin = document.getElementById('handle-min');
            const handleMax = document.getElementById('handle-max');
            const rangeBar = document.getElementById('range-bar');
            const inputMin = document.querySelector('.price-input[placeholder="Từ"]');
            const inputMax = document.querySelector('.price-input[placeholder="Đến"]');
            
            // Các giá trị mặc định
            const minPrice = 0;
            const maxPrice = 100000000; // 100,000,000 VNĐ
            
            // Định dạng giá trị mặc định
            function formatPrice(price) {
                return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
            
            // Cập nhật các thành phần UI
            if (handleMin && handleMax && rangeBar) {
                // Đặt vị trí của các handle
                handleMin.style.left = '0%';
                handleMax.style.left = '100%';
                
                // Xử lý vị trí transform cho các handle ở vị trí đầu/cuối
                handleMin.style.transform = 'translateX(0)';
                handleMax.style.transform = 'translateX(-16px)';
                
                // Cập nhật thanh range
                rangeBar.style.left = '0%';
                rangeBar.style.width = '100%';
            }
            
            // Cập nhật giá trị input
            if (inputMin) inputMin.value = formatPrice(minPrice);
            if (inputMax) inputMax.value = formatPrice(maxPrice);
            
            // Nếu chúng ta có một biến toàn cục cho giá trị min/max, cập nhật chúng
            if (typeof minValue !== 'undefined') minValue = minPrice;
            if (typeof maxValue !== 'undefined') maxValue = maxPrice;
        }
    }
    
    // Hàm reset các switch toggle về trạng thái mặc định
    function resetSwitchToggles() {
        // Ở đây chúng ta có thể đặt các toggle về trạng thái mặc định
        // Ví dụ: toggle "Giảm giá" mặc định là OFF
        const discountToggle = document.querySelector('.discount .switch input[type="checkbox"]');
        if (discountToggle) {
            discountToggle.checked = false;
        }
        
        // Thêm các toggle khác nếu cần
    }
    
    // Hiển thị thông báo nhanh khi reset thành công
    function showResetNotification() {
        // Tạo phần tử thông báo
        const notification = document.createElement('div');
        notification.className = 'reset-notification';
        notification.textContent = 'Đã xóa tất cả bộ lọc';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        notification.style.zIndex = '9999';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        // Thêm vào body
        document.body.appendChild(notification);
        
        // Hiển thị thông báo với animation
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Tự động ẩn thông báo sau 2 giây
        setTimeout(() => {
            notification.style.opacity = '0';
            
            // Xóa phần tử sau khi animation hoàn tất
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }
});