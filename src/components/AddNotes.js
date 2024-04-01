import React, { useContext, useState } from 'react'
import NotesContext from '../mynotes/NotesContext';
import { TextField, Button } from '@mui/material';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles'
import TopBody from './TopBody';

function AddNotes(props) {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const context = useContext(NotesContext);
    const { addNotes } = context;
    const [notes, setNotes] = useState({ title: "", description: "", file: "", notetype: "private", tag: "" })
    const addBtnHandle = () => {
        addNotes(notes.title, notes.description, notes.tag, notes.file, notes.notetype);
        props.showAlerts('Successful Added Notes', 'success', 'Success');
    }
    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
        console.log(notes.notetype)
        
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
                    <div className="tags">
                        <TextField
                            color="secondary" label="Tags(optional)" variant="outlined" name='tag' value={notes.tag} onChange={onChange} fullWidth />
                    </div>
                    <Button className='my-4'
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                    <div>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group-label"
                                name="notetype"
                                value={notes.notetype}
                                onChange={onChange}
                            >
                                <FormControlLabel value="private" control={<Radio />} label="Private" />
                                <FormControlLabel value="public" control={<Radio />} label="Public" />
                            </RadioGroup>
                        </FormControl>
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
