const express = require('express');

//import router
const router = express.Router();

//import notes file
const Notes = require('../schema/Notes');

//impost fetchdata file
const fetchallnotes = require('../middleware/fetchdata');
const upload = require('../middleware/multer');
/* const fs = require('fs');
const path = require('path') */

// import the express validator to enter the valid value by the user
const { body, validationResult } = require('express-validator');


//Router 1: Get all notes using: GET 'api/notes/getnates' login required
router.get('/getnotes', fetchallnotes, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.massage);
        return res.status(400).send("there are server error")
    }

})

//Router 2: Add notes notes using: POST 'api/notes/addnotes' login required
router.post('/addnotes', fetchallnotes, upload.single('file'), [
    body('title', 'Please provide a valid title (Your title should not be greater than 100 characters)').isLength({ max: 100 }),
    body('description', 'Please enter a Description').isLength({ max: 1000 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {

        const { title, description, tag } = req.body;
        const file = req.file.path
        const notes = new Notes({ title, description, tag, file, user: req.user.id });
        const saveNotes = await notes.save();
        res.json(saveNotes);
    } catch (error) {
        console.log(error.massage);
        return res.status(400).send("there are server error")
    }

})
//Route 3: Update notes using: PUT 'api/notes/updatenotes' login required
router.put('/updatenotes/:id', fetchallnotes, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNotes = {};
    if (title) { newNotes.title = title; };
    if (description) { newNotes.description = description; };
    if (tag) { newNotes.tag = tag; };

    let notes = await Notes.findById(req.params.id);
    if (!notes) {
        return res.status(404).send("NOT FOUND");
    }
    if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("NOT ALLOWED");
    }
    try {
        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        res.json(notes);
    } catch (error) {
        console.log(error.massage);
        return res.status(400).send("there are server error")
    }
})

//Route 4: Delete notes using: DELETE 'api/notes/deletenotes' login required
router.delete('/deletenotes/:id', fetchallnotes, async (req, res) => {

    let notes = await Notes.findById(req.params.id);
    if (!notes) {
        return res.status(404).send("NOT FOUND");
    }
    if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("NOT ALLOWED");
    }
    try {
        notes = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "success": "this notes hasbeen deleted", notes: notes });
        console.log(notes + "\nthis id:- " + req.params.id + " is deleted");
    } catch (error) {
        console.log(error.massage);
        return res.status(400).send("there are server error")
    }
})

module.exports = router;