const fs = require('fs');
const path = require('path');
const express = require('express');
const { response } = require('express');
const { json } = require('express/lib/response');

const PORT = process.env.PORT || 3001;
const app = express();


const rawData = fs.readFileSync('./db/db.json');
const noteDb = JSON.parse(rawData);

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


function writeNotes(input,res){
   // const noteInput=input;
    let tempNote;
    tempNote.id=Date.now();

    tempNote.title=input.title; 
    tempNote.text=input.text;
   

    let attempArray=noteDb;
    attempArray.push(tempNote);
    attempArray=JSON.stringify(attempArray);


    res.json(fs.writeFile(
        './db/db.json', attempArray, err => console.log(err)
    ));



}
app.post('/notes',(req,res) =>{
    const noteInput =writeNotes(req.body,res);
   

});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
