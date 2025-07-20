document.addEventListener('DOMContentLoaded', function() {
    // 获取房间名称
    const roomName = JSON.parse(document.getElementById('room-name').textContent);

    // 建立WebSocket连接
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const chatSocket = new WebSocket(
        `${protocol}//${window.location.host}/ws/chat/${roomName}/`
    );

    // DOM元素
    const chatLog = document.querySelector('#chat-log');
    const messageInput = document.querySelector('#chat-message-input');
    const sendButton = document.querySelector('#chat-message-submit');
    const clearButton = document.querySelector('#clear-log');

    // 聚焦输入框
    messageInput.focus();

    // 接收消息处理
    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        // 添加消息并滚动到底部
        chatLog.value += `${data.message}\n`;
        chatLog.scrollTop = chatLog.scrollHeight;

        // 临时添加动画类（通过样式模拟）
        chatLog.classList.add('new-message');
        setTimeout(() => chatLog.classList.remove('new-message'), 300);
    };

    // 连接关闭处理
    chatSocket.onclose = function(e) {
        console.error('聊天连接意外关闭');
        chatLog.value += '⚠️ 连接已断开，请刷新页面重试\n';
        messageInput.disabled = true;
        sendButton.disabled = true;
        sendButton.classList.add('opacity-50', 'cursor-not-allowed');
    };

    // 发送消息处理
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            chatSocket.send(JSON.stringify({
                'message': message
            }));
            messageInput.value = ''; // 清空输入框
        }
        messageInput.focus();
    }

    // 按钮发送
    sendButton.addEventListener('click', sendMessage);

    // 回车发送
    messageInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 清空聊天记录
    clearButton.addEventListener('click', function() {
        if (confirm('确定要清空聊天记录吗？')) {
            chatLog.value = '';
        }
    });

    // 窗口关闭时断开连接
    window.addEventListener('beforeunload', function() {
        chatSocket.close();
    });
});