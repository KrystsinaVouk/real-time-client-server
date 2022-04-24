import {WebSocketServer} from 'ws';

const wss = new WebSocketServer({port: 8080},);

wss.on(`connection`, function connection(ws) {
    ws.id = Date.now(); //private rooms
    ws.on(`message`, function (message) {
        message = JSON.parse(message);
        switch (message.event) {
            case `message`:
                broadcastMessage(message)
                break;
            case `connection`:
                broadcastMessage(message)
                break;
        }
    })
})

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    })
}
