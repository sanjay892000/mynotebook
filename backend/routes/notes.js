const express = require('express');
const router = express.Router();
const NotesSchema = require('../schema/Notes');
const fetchallnotes = require('../middleware/fetchdata');

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
        return res.status(400).json({
            success: false,
            message: errors.array()
        })
    }
    try {

        const image = req.file ? req.file.filename : null;
        const { title, description, tag, type } = req.body;
        const parsedType = type ? JSON.parse(type) : false;
        const saveNotes = await NotesSchema.create({
            title,
            description,
            tag,
            image,
            type: parsedType,
            user: req.user.id
        });
        res.status(200).json({
            success: true,
            message: "Notes added successfully",
            notes: saveNotes
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
})

//Router 2: Get all notes using: GET 'api/notes/getnates' login required
router.get('/getnotes', fetchallnotes, async (req, res) => {
    try {
        const notes = await NotesSchema.find({ user: req.user.id });
        res.status(200).json({
            success: true,
            message: "all notes fetched successfully",
            notes: notes
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        })
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

    if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("NOT ALLOWED");
    }
    try {
        notes = await NotesSchema.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        res.status(200).json({
            success: true,
            message: "Notes updated successfully",
            notes: notes
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "there are server error"
        })
    }
})

//Route 4: Delete notes using: DELETE 'api/notes/deletenotes' login required
router.delete('/deletenotes/:id', fetchallnotes, async (req, res) => {

    let notes = await NotesSchema.findById(req.params.id);

    if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("NOT ALLOWED");
    }
    try {
        notes = await NotesSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Notes deleted successfully",
            notes: notes
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "there are server error"
        })
    }
})

module.exports = router;