const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const noteDb = require('./db/db.json');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(noteDb.slice(1))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/assets/index.html'));
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
