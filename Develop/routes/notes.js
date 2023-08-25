const notes = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');



notes.get('/', (req, res) =>{
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});



notes.post('/', (req, res) => {
    const newNote = req.body;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading notes data.' });
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error writing notes data.' });
            }
            res.json(newNote);
        });
    });
    const { title, text } = req.body;

    if (req.body) {
      const newNote = {
        title,
        text
      };
  
      readAndAppend(newNote, './db/db.json');

      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
});

module.exports = notes;
