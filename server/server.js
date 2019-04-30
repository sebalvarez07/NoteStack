// For Heroku purposes
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

// if PORT variable exists means we are in Heroku || use port 3000 for local prod testing
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// Always give the index.html file no matter what is requested
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => console.log('Server is up!'));