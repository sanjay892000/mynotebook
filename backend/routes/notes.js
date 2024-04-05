const express = require('express');
const router = express.Router();
const NotesSchema = require('../schema/Notes');
const fetchallnotes = require('../middleware/fetchdata');
const cors = require('cors');

const app = express();

app.use(cors());

// import the express validator to enter the valid value by the user
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/multer');

//Router 1: Add notes notes using: POST 'api/notes/addnotes' login required
router.post('/addnotes', fetchallnotes, upload.single("image"), [
    body('title', 'Please provide a valid title (Your title should not be greater than 100 characters)').isLength({ max: 100 }),
    body('description', 'Please enter a Description').isLength({ max: 1000 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    console.log(req.body,"backend")
    try {
       
        const image = req.file ? req.file.filename : null;
        const { title, description, tag, type } = req.body;
        const parsedType = type ? JSON.parse(type) : false;
        const notes = new NotesSchema({
            title,
            description,
            tag,
            image,
            type:parsedType,
            user: req.user.id
        });
        const saveNotes = await notes.save();
        res.json(saveNotes);
        res.status(200).json({ msg: "New note added", success: true });
    } catch (error) {
        res.status(500).json({ msg: "Unabe to add note", success: false, error: error.message });
    }
})

//Router 2: Get all notes using: GET 'api/notes/getnates' login required
router.get('/getnotes', fetchallnotes, async (req, res) => {
    try {
        const notes = await NotesSchema.find({ user: req.user.id });
        res.json(notes);
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

    let notes = await NotesSchema.findById(req.params.id);
    if (!notes) {
        return res.status(404).send("NOT FOUND");
    }
    if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("NOT ALLOWED");
    }
    try {
        notes = await NotesSchema.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        res.json(notes);
    } catch (error) {
        console.log(error.massage);
        return res.status(400).send("there are server error")
    }
})

//Route 4: Delete notes using: DELETE 'api/notes/deletenotes' login required
router.delete('/deletenotes/:id', fetchallnotes, async (req, res) => {

    let notes = await NotesSchema.findById(req.params.id);
    if (!notes) {
        return res.status(404).send("NOT FOUND");
    }
    if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("NOT ALLOWED");
    }
    try {
        notes = await NotesSchema.findByIdAndDelete(req.params.id);
        res.json({ "success": "this notes hasbeen deleted", notes: notes });
        console.log(notes + "\nthis id:- " + req.params.id + " is deleted");
    } catch (error) {
        console.log(error.massage);
        return res.status(400).send("there are server error")
    }
})

module.exports = router;