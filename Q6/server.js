const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/delete', (req, res) => {
    fs.unlink('newfile.txt', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('File deleted');
        res.send('File newfile.txt deleted');
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});