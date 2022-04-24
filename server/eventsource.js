import express from 'express'
import cors from 'cors'
import events from 'events'

const app = express();
const emitter = new events.EventEmitter();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get('/connect', (request, response) => {
  response.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
  });
  emitter.on('newMessage', (message) => {
      response.write(`data: ${JSON.stringify(message)} \n\n`);
  })
})

app.post('/new-messages', ((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200)
}))

app.listen(PORT, () => console.log(`App is running on the PORT ${PORT}`));
