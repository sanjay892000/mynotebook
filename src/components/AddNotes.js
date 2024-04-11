import React, { useContext, useState } from 'react'
import NotesContext from '../mynotes/NotesContext';
import { TextField, Button } from '@mui/material';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TopBody from './TopBody';
require('../styles/addnotes.css')
/* import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles' */

function AddNotes(props) {
    /*  const VisuallyHiddenInput = styled('input')({
         clip: 'rect(0 0 0 0)',
         clipPath: 'inset(50%)',
         height: 1,
         overflow: 'hidden',
         position: 'absolute',
         bottom: 0,
         left: 0,
         whiteSpace: 'nowrap',
         width: 1,
     }); */
    const context = useContext(NotesContext);
    const { addNotes } = context;
    /*  const file = useRef(null) */
    const [notes, setNotes] = useState({ title: "", description: "", tag: "", type: "" });
    const [image, setImage] = useState(null)
    const addBtnHandle = () => {
        addNotes(notes.title, notes.description, notes.tag, notes.type, image)
        setNotes({ title: '', description: '', tag: '', type: '' });
        setImage(null);
    }
    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }


    return (

        <>
            <div className='container'>
                <Button variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Home</Button>
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
                            color="secondary" label="Description" variant="outlined" name='description' value={notes.description} onChange={onChange} multiline
                            rows={4} fullWidth/>
                    </div>
                    <div className="tags">
                        <TextField
                            color="secondary" label="Tags(optional)" variant="outlined" name='tag' value={notes.tag} onChange={onChange} fullWidth />
                    </div>
                    <input className='my-4' type="file" name='image' accept='"image/*"' onChange={(e) => setImage(e.target.files[0])} >
                    </input>
                    <div>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group-label"
                                name="type"
                                value={notes.type}
                                onChange={onChange}
                            >
                                <FormControlLabel value="false" control={<Radio />} label="Private" />
                                <FormControlLabel value="true" control={<Radio />} label="Public" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='notes-button mt-4'>
                        {(notes.title && notes.description) ? <Button component={Link} to="/addnotes" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }} onClick={addBtnHandle}>Add Note</Button> : <Button component={Link} to="/AddNotes" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }} disabled>Add Note</Button>}

                        <Button component={Link} to="/notes" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}>Your Notes</Button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default AddNotes
