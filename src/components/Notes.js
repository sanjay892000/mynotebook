import React, { useContext, useEffect, useState, useRef } from 'react'
import NotesContext from '../mynotes/NotesContext';
import NotesItem from './NotesItem';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';



function Notes(props) {
    const {showAlerts}=props;
    const context = useContext(NotesContext);
    const { Notes, getNotes, editNotes } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/LogIn");
        }
        // eslint-disable-next-line
    })
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNotes] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNotes = (currentNote) => {
        ref.current.click();
        setNotes({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const handleClick = () => {
        editNotes(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        showAlerts('Your note has been updated', 'success', 'Success');
    }

    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-start m-5">
        <Button component={Link} to="/AddNotes" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}>Create New Note</Button>
      </div>
            <div className='row'>
                    <h3>Your Notes</h3>
                <div className="container my-3">
                    {Notes.length === 0 && 'No notes to display'}
                </div>
                {Notes.map((note) => {
                    return <>
                        <NotesItem key={note.id} note={note} updateNotes={updateNotes} showAlerts={showAlerts}/>
                    </>
                })}
            </div>
        </>
    )
}

export default Notes
