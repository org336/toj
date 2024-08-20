const WebSocket = require('ws');

// 连接到 WebSocket 服务器
const ws = new WebSocket('ws://localhost:3036/chatroom');

// 当连接打开时执行
ws.on('open', function (event) {
  console.log('成功连接到 WebSocket 服务器', event);

  // 发送 'send' 事件的消息
  const sendMessage = {
    event: 'send',
    data: {
      sender_uid: 'e3d52140-3221-11ef-be6f-499d86323266',
      receiver_uid: '65278040-2d17-11ef-bcf8-41298d1831e7',
      event: 'talk',
      type: 1,
      title: 'Hello',
      content: 'Hello, this is a private message',
    },
  };

  try {
    ws.send(JSON.stringify(sendMessage));
    console.log(
      'e3d52140-3221-11ef-be6f-499d86323266向65278040-2d17-11ef-bcf8-41298d1831e7发送了一条私人消息:',
      sendMessage.data.content,
    );
  } catch (error) {
    console.error('发送消息时出错:', error);
  }
});

// 当接收到消息时执行
ws.on('message', function incoming(data) {
  console.log('接收到消息:', data);
});

// 当连接关闭时执行
ws.on('close', function close(code, reason) {
  console.log('连接已关闭，代码:', code, '原因:', reason);
});

// 当发生错误时执行
ws.on('error', function error(err) {
  console.error('连接错误:', err);
});
