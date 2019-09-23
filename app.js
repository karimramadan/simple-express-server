const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000

app.use(cors());

const contacts = require('./data');

// Endpoints
app.get('/contacts', function (req, res) {
    res.json(contacts)
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})
