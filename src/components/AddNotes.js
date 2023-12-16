import React, { useContext, useState } from 'react'
import NotesContext from '../mynotes/NotesContext';

function AddNotes(props) {
    const context = useContext(NotesContext);
    const { addNotes } = context;
    const [notes, setNotes] = useState({ title: "", description: "", tag: "" })
    const addBtnHandle = () => {
        addNotes(notes.title,notes.description,notes.tag);
        props.showAlerts('Successful Added Notes','success','Success');
    }
    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }
    return (

        <>
            <div className='container'>
                <h2>Add a Notes</h2>
                <hr />
                <form action="">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Note's Title Name</label>
                        <input type="text" className="form-control" id="title" name='title' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag Name</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>
                    <button className='btn btn-primary' type='button' onClick={addBtnHandle}>Add Note</button>
                </form>
                <hr />
            </div>

        </>
    )
}

export default AddNotes
