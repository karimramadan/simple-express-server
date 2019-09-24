const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

const contacts = require('./data');

// Endpoints
app.get('/contacts', function (req, res) {
    res.json(contacts)
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})
