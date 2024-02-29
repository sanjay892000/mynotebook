import React, { useContext, useState } from 'react'
import NotesContext from '../mynotes/NotesContext';
import { TextField, Button } from '@mui/material';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TopBody from './TopBody';

function AddNotes(props) {
    const context = useContext(NotesContext);
    const { addNotes } = context;
    const [notes, setNotes] = useState({ title: "", description: "", tag: "" })
    const addBtnHandle = () => {
        addNotes(notes.title, notes.description, notes.tag);
        props.showAlerts('Successful Added Notes', 'success', 'Success');
    }
    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }
    return (

        <>
            <div className='container'>
                <Button className="mb-4" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Home</Button>
                <TopBody />
                <h2 style={{ fontWeight: "Bold" }}>Create new Note</h2>
                <p className="mb-4">Add  a new note with your info / notes</p>
                <form autoComplete="off" noValidate>
                    <div className="title mb-4">
                        <TextField
                            color="secondary"
                            label="Title" variant="outlined" name='title' value={notes.title} onChange={onChange} fullWidth />
                    </div>
                    <div className="description mb-4">
                        <TextField
                            color="secondary" label="Description" variant="outlined" name='description' value={notes.description} onChange={onChange} fullWidth />
                    </div>
                    <div className="tags mb-4">
                        <TextField
                            color="secondary" label="Tags(optional)" variant="outlined" name='tag' value={notes.tag} onChange={onChange} fullWidth />
                    </div>
                    <div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="private" checked/>
                            <label class="form-check-label" for="inlineRadio2">Private</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="public"/>
                            <label class="form-check-label" for="inlineRadio1" >Public</label>
                    </div>
                    </div>
                    <br />
                    {(notes.title && notes.description) ? <Button component={Link} to="/addnotes" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }} onClick={addBtnHandle}>Add Note</Button> : <Button component={Link} to="/AddNotes" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }} disabled>Add Note</Button>}

                    <Button component={Link} to="/notes" className='mx-5' variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}>Your Notes</Button>
                </form>
            </div>

        </>
    )
}

export default AddNotes
