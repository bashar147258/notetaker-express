const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid =  require('uuid');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
    readFromFile('../db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        }
        else {
            res.json(JSON.parse(data))
        }
    })
})

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if  (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
     readAndAppend(newNote, './db/db.json')
     res.json("Note added")
    } else {
        res.err("Error! Note has not been added")
    }   
});

notes.delete('/:noteId', (req, res)=>{
    const noteId=req.params.noteId;
    readFromFile('../db/db.json', 'utf-8')
    .then((data) => (JSON.parse(data))
    .then((json) => {
        const target = json.filter((targetNote) => targetNote.id !== noteId)
        writeToFile("../db/db.json", target)
    })
    )
});


module.exports = notes;
 

