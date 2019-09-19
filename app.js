import contacts from "./data"

const express = require("express");
const app = express();
const port = 3000

// Endpoints
app.get('/contacts', function (req, res) {
    res.json(contacts)
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})
