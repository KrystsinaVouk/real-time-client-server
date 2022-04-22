const express = require('express');
const cors = require('cors');
const events = require('events');

const app = express();
const emitter = new events.EventEmitter();
const PORT = 5000;

app.use(cors);

app.get(`get-messages`, (request, response,) => {
    emitter.once(`newMessage`, (message => {
        response.json(message);
    }))

})
app.post(`new-messages`, (request, response) => {
    const message = request.body;
    emitter.emit(`newMessage`, message);

    response.status(200);
})

app.listen(PORT, `localhost`, () => console.log(`App is running on the PORT ${PORT}`));
