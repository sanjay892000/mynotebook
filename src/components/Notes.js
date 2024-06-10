import React, { useContext, useEffect, useState, useRef } from 'react'
import NotesContext from '../mynotes/NotesContext';
import NotesItem from './NotesItem';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { toast } from 'react-toastify';



function Notes(props) {
    const context = useContext(NotesContext);
    const { Notes, getNotes, editNotes } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        // eslint-disable-next-line
    })
    const ref = useRef(null)
    const refClose = useRef(null)
    const [updatenote, setupdateNotes] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNotes = (currentNote) => {
        ref.current.click();
        setupdateNotes({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const handleClick = () => {
        editNotes(updatenote.id, updatenote.etitle, updatenote.edescription, updatenote.etag)
        refClose.current.click();
        toast.success('Your note has been updated');
    }

    const onChange = (e) => {
        setupdateNotes({ ...updatenote, [e.target.name]: e.target.value })
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
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={updatenote.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={updatenote.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={updatenote.etag} onChange={onChange} />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input type="file" className="form-control" id="eimage" name="eimage"/>
                                </div> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={updatenote.etitle.length < 5 || updatenote.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-start m-5">
                {localStorage.getItem('token') ? <Button component={Link} to="/AddNotes" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}>Create Note</Button> : <Button component={Link} to="/login" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}>Create Note</Button>}
            </div>
            <div className='row'>
                <div className="filternotes d-flex justify-content-between align-items-center">
                    <h3>Your Notes</h3>
                </div>
                <div className="container my-3">
                    {Notes.length === 0 && 'No notes to display'}
                </div>
                {Notes.map((note, id) => {
                    return <div key={id}>
                        <NotesItem note={note} updateNotes={updateNotes} />
                    </div>
                })}
            </div>
        </>
    )
}

export default Notes
