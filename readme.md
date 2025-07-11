### 1 启动Redis服务
从 Redis for Windows
https://github.com/tporadowski/redis/releases

安装后启动redis-server.exe

### 2 验证
```bash
python manage.py shell
```
```bash
import channels.layers
channel_layer = channels.layers.get_channel_layer()
from asgiref.sync import async_to_sync
async_to_sync(channel_layer.send)('test_channel', {'type': 'hello'})
async_to_sync(channel_layer.receive)('test_channel')
```
期望输出：
```bash
{'type': 'hello'}
```

### 3 运行项目
```bash
python manage.py runserver
```
进入 http://127.0.0.1:8000/chat/
输入聊天室名称进入聊天

### 4. 运行测试
双页面进入
http://127.0.0.1:8000/chat/lobby/
发送消息可以看到两边都能收到消息
