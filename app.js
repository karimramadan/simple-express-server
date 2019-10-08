const express = require("express");
const cors = require("cors");
var fs = require('fs');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json()) 

// const db = "./data.json";
// const contacts = require(db);

// Endpoints
app.get('/contacts', function (req, res) {
    const db = `./data/${req.query.uid}.json`;
    const contacts = require(db);
    res.json(contacts)
    // console.log(req.query.uid);
})
// Signout
app.post('/sessionLogout', (req, res) => {
    res.clearCookie('session');
});
// Methods
app.post('/contacts', function (req, res) {
    const db = `./data/${req.query.uid}.json`;
    const contacts = require(db);
    let newContact = req.body;
    contacts.contacts.push( newContact );
    fs.writeFileSync(db, JSON.stringify(contacts, null, 2));
    res.json('Contact has been added successfully');
})
app.post('/:uid', function (req, res) {
    const userFile = `./data/${req.params.uid}.json`;
    const blueprint = '{"contacts": []}';
    const jsonObj = JSON.parse(blueprint);
    const jsonContent = JSON.stringify(jsonObj);
    fs.writeFile(userFile, jsonContent, 'utf8', (err) => {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log('New file created')
    })
    res.json('File has been created successfully');
})
app.put('/contacts', function (req, res) {
    const db = `./data/${req.query.uid}.json`;
    const contacts = require(db);
    let updatedContact = req.body;
    let foundIndex = contacts.contacts.findIndex(contact => contact.id == req.query.id);
    contacts.contacts[foundIndex] = updatedContact;
    fs.writeFileSync(db, JSON.stringify(contacts, null, 2));
    res.json('Contact has been updated successfully');
})
app.delete('/contacts', function (req, res) {
    const db = `./data/${req.query.uid}.json`;
    const contacts = require(db);
    let filteredContacts = contacts.contacts.filter((contact) => contact.id != req.query.id);
    contacts.contacts = filteredContacts;
    fs.writeFileSync(db, JSON.stringify(contacts, null, 2));
    res.json('Contact has been deleted successfully');
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})