const fs = require('fs');
const path = require('path');
const express = require('express');
const { json } = require('express/lib/response');


const PORT = process.env.PORT || 3001;
const app = express();


const rawData = fs.readFileSync('./db/db.json');
const noteDb = JSON.parse(rawData);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
//routes 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//api routes
app.get('/api/notes',(req,res)=>{
    res.json (noteDb);
}
)
app.post('/api/notes',(req,res)=>{
    let tempArray = noteDb;
    let newNote = {};
    newNote.id=Date.now();
    newNote.title=req.body.title;
    newNote.text=req.body.text;
    tempArray.push(newNote); 
    tempArray=JSON.stringify(tempArray);
    res.json(fs.writeFile(
        "./db/db.json", tempArray,err=>console.log(err)
    ))
})







app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
