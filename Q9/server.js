const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const filePath = path.join(__dirname, 'demo.txt');
const renamedPath = path.join(__dirname, 'renamed_demo.txt');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Write a file
app.get('/write', (req, res) => {
    fs.writeFile(filePath, 'This is a demo file.\n', (err) => {
        if (err) return res.status(500).send('Error writing file');
        res.send(' File written successfully');
    });
});

// Append to file
app.get('/append', (req, res) => {
    fs.appendFile(filePath, 'Appending new line...\n', (err) => {
        if (err) return res.status(500).send('Error appending file');
        res.send(' Text appended');
    });
});

// Read file
app.get('/read', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file');
        res.send(`<pre>${data}</pre>`);
    });
});

// Rename file
app.get('/rename', (req, res) => {
    fs.rename(filePath, renamedPath, (err) => {
        if (err) return res.status(500).send('Error renaming file');
        res.send(' File renamed to renamed_demo.txt');
    });
});

// Check if file exists
app.get('/exists', (req, res) => {
    const exists = fs.existsSync(filePath) || fs.existsSync(renamedPath);
    res.send(` File exists: ${exists}`);
});

// Delete file
app.get('/delete', (req, res) => {
    const target = fs.existsSync(filePath) ? filePath : renamedPath;
    fs.unlink(target, (err) => {
        if (err) return res.status(500).send('Error deleting file');
        res.send(' File deleted');
    });
});

app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
