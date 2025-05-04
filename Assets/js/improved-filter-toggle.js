document.addEventListener('DOMContentLoaded', function() {
    // Tìm tất cả các tiêu đề bộ lọc có mũi tên
    const filterTitles = document.querySelectorAll('.filter-title.d-flex.justify-content-between');
    
    // Thêm sự kiện click cho mỗi tiêu đề
    filterTitles.forEach(function(title) {
        // Kiểm tra nếu tiêu đề có icon mũi tên
        const icon = title.querySelector('i.fas');
        if (icon) {
            // Thêm cursor pointer để hiển thị rõ là có thể click
            title.style.cursor = 'pointer';
            
            title.addEventListener('click', function() {
                // Tìm phần nội dung ngay sau tiêu đề này
                const content = this.nextElementSibling;
                
                // Chỉ thực hiện toggle nếu nội dung được tìm thấy và là phần filter-content
                if (content && (content.classList.contains('filter-content') || 
                               content.classList.contains('checkbox-item') ||
                               content.querySelectorAll('.checkbox-item').length > 0)) {
                    
                    // Toggle class để theo dõi trạng thái
                    this.classList.toggle('collapsed');
                    
                    // Animation cho hiệu ứng thu gọn
                    if (content.style.maxHeight) {
                        // Đang mở, cần thu gọn
                        content.style.maxHeight = null;
                        content.style.opacity = '0';
                        content.style.marginTop = '0';
                        
                        // Sau khi animation kết thúc, ẩn hoàn toàn
                        setTimeout(() => {
                            content.style.display = 'none';
                        }, 1);
                        
                        // Đổi icon thành mũi tên xuống
                        if (icon) {
                            icon.classList.remove('fa-chevron-up');
                            icon.classList.add('fa-chevron-down');
                        }
                    } else {
                        // Đang đóng, cần mở ra
                        content.style.display = 'block';
                        
                        // Cho phép browser tính toán chiều cao thực tế
                        const height = content.scrollHeight;
                        content.style.maxHeight = height + 'px';
                        content.style.opacity = '1';
                        content.style.marginTop = '8px';
                        
                        // Đổi icon thành mũi tên lên
                        if (icon) {
                            icon.classList.remove('fa-chevron-down');
                            icon.classList.add('fa-chevron-up');
                        }
                    }
                }
            });
        }
    });
    
    // Thiết lập trạng thái mặc định mở
    filterTitles.forEach(function(title) {
        const content = title.nextElementSibling;
        if (content && (content.classList.contains('filter-content') || 
                       content.classList.contains('checkbox-item') ||
                       content.querySelectorAll('.checkbox-item').length > 0)) {
            // Mặc định hiển thị nội dung
            content.style.display = 'block';
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
            
            // Đảm bảo icon là mũi tên lên
            const icon = title.querySelector('i.fas');
            if (icon) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        }
    });
});