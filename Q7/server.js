const express = require('express');
const fetch = require('node-fetch'); // works with v2

const app = express();
const PORT = 3000;

app.get('/google', async (req, res) => {
    try {
        const response = await fetch('https://www.google.com');
        const html = await response.text();
        res.send(html);
    } catch (error) {
        console.error('Error fetching Google:', error.message);
        res.status(500).send('Failed to fetch Google homepage');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
