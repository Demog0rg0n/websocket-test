const { futimesSync } = require('fs');
const ws = require('ws');

const wss = new ws.Server(
  {
    port: 5001,
  },
  () => console.log('Server started on 5001'),
);

wss.on('connection', function connection(ws) {
  ws.on('message', (message) => {
    message = JSON.parse(message);
    console.log(message.event);
    switch (message.event) {
      case 'show':
        console.log(message.data);
        broadcastMessage(message);
        break;
      case 'connection':
        console.log(`Подключён игрок под номером ${message.data}`);
        break;
      case 'voting':
        console.log('Голос');
        broadcastMessage(message);
        break;
    }
  });
});

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
