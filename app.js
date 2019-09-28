const express = require("express");
const cors = require("cors");
var fs = require('fs');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json()) 

const db = "./data.json";
const contacts = require(db);

// Endpoints
app.get('/contacts', function (req, res) {
    res.json(contacts)
})
// Methods
app.post('/contacts', function (req, res) {
    let newContact = req.body;
    contacts.contacts.push( newContact );
    fs.writeFileSync(db, JSON.stringify(contacts, null, 2));
    res.json('Contact has been added successfully');
})
app.put('/contacts/:id', function (req, res) {
    let updatedContact = req.body;
    let foundIndex = contacts.contacts.findIndex(contact => contact.id == req.params.id);
    contacts.contacts[foundIndex] = updatedContact;
    fs.writeFileSync(db, JSON.stringify(contacts, null, 2));
    res.json('Contact has been updated successfully');
})
app.delete('/contacts/:id', function (req, res) {
    let filteredContacts = contacts.contacts.filter((contact) => contact.id != req.params.id);
    contacts.contacts = filteredContacts;
    fs.writeFileSync(db, JSON.stringify(contacts, null, 2));
    res.json('Contact has been deleted successfully');
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})