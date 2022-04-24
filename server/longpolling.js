import express from 'express';
import cors from 'cors';
import events from  'events';

const PORT = 5000;

const app = express()
const emitter = new events.EventEmitter();

app.use(cors())
app.use(express.json())

app.get('/get-messages', (req, res)=> {
    emitter.once('newMessage', (message) => {
        res.json(message)
    })
    res.status(200);
})

app.post('/new-messages', ((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200);
}))

async function startApp() {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()
