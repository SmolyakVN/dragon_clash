const express = require('express');
const cors = require('cors');
const events = require('events');

const emitter = new events.EventEmitter()

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/get-test', (req, res) => {
    emitter.once('newMessage', () => {
        res.json({'message': 'тест', 'id': new Date()});
    })
});

app.get('/get-messages', (req, res) => {
    emitter.once('newMessage', (message) => {
        res.json(message);
    })
});

app.post('/new-message', (req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message);
    res.status(200);
});

app.get('/get-openedcards', (req, res) => {
    emitter.once('updateOpenedCards', (data) => {
        res.json(data);
    })
});

app.post('/update-openedcards', (req, res) => {
    const data = req.body;
    emitter.emit('updateOpenedCards', data);
    res.status(200);
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));