const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const noteDb = require('./db/db.json');
const { json } = require('body-parser');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    res.json(noteDb.slice(1))
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


function writeNotes(input,id){
    const noteInput=input;
    if(!Array.isArray(id))
    id.push(0);

    input.id=id[0];
    id[0]++;

    id.push(noteInput);
    fs.writeFileSync(
        path.join(__dirname,'./db/db.json'),
        JSON.stringify(id,null,2)
    );
    return input;

}
app.post('/api/notes',(req,res) =>{
    const noteInput =writeNotes(req.input,noteDb);
    res.json(noteInput);

})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
