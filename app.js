const express = require("express");
const cors = require("cors");
const app = express();

app.set("port", (process.env.port || 3000))

app.use(cors());

const contacts = require('./data');

// Endpoints
app.get('/contacts', function (req, res) {
    res.json(contacts)
})

app.listen(app.get("port"), () => {
    console.log("The server is running")
})
