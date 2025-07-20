// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const roomInput = document.querySelector('#room-name-input');
    const roomButton = document.querySelector('#room-name-submit');
    const roomIcon = document.querySelector('#room-input-icon');
    const roomForm = document.querySelector('#room-form');

    // 页面加载时聚焦输入框
    roomInput.focus();

    // 实时验证房间名称
    roomInput.addEventListener('input', function() {
        const value = this.value.trim();
        // 允许字母、数字和下划线
        const isValid = /^[a-zA-Z0-9_]+$/.test(value);

        if (value.length > 0) {
            if (isValid) {
                this.classList.remove('border-red-300');
                this.classList.add('border-green-300');
                roomIcon.classList.remove('fa-circle-o', 'fa-times-circle', 'text-gray-300', 'text-red-400');
                roomIcon.classList.add('fa-check-circle', 'text-green-400');
                roomButton.disabled = false;
            } else {
                this.classList.remove('border-green-300');
                this.classList.add('border-red-300');
                roomIcon.classList.remove('fa-circle-o', 'fa-check-circle', 'text-gray-300', 'text-green-400');
                roomIcon.classList.add('fa-times-circle', 'text-red-400');
                roomButton.disabled = true;
            }
        } else {
            this.classList.remove('border-green-300', 'border-red-300');
            roomIcon.classList.remove('fa-check-circle', 'fa-times-circle', 'text-green-400', 'text-red-400');
            roomIcon.classList.add('fa-circle-o', 'text-gray-300');
            roomButton.disabled = true;
        }
    });

    // 提交表单处理
    roomForm.addEventListener('submit', function(e) {
        e.preventDefault(); // 阻止表单默认提交行为
        const roomName = roomInput.value.trim();
        if (roomName) {
            // 跳转到房间页面（根据路由配置调整路径）
            window.location.pathname = '' + encodeURIComponent(roomName) + '/';
        }
    });

    // 按钮悬停动画效果
    roomButton.addEventListener('mouseenter', function() {
        this.classList.add('animate-pulse');
    });

    roomButton.addEventListener('mouseleave', function() {
        this.classList.remove('animate-pulse');
    });
});