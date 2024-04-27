const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define paths to HTML files
const publicPath = path.join(__dirname, 'public');
const notesPath = path.join(publicPath, 'notes.html');
const indexPath = path.join(publicPath, 'index.html');

// Define API endpoint to read notes from db.json
app.get('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// Define API endpoint to save a new note to db.json
app.post('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = generateUniqueId(); // Assuming you have a function to generate unique IDs
        notes.push(newNote);
        fs.writeFile('db.json', JSON.stringify(notes), err => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json(newNote);
        });
    });
});

// Define HTML route to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(notesPath);
});

// Define HTML route to index.html
app.get('*', (req, res) => {
    res.sendFile(indexPath);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
