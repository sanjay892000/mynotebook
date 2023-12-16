import React, { useContext } from 'react'
import NotesContext from '../mynotes/NotesContext';

function NotesItem(props) {
    const { note ,updateNotes} = props;
    const context = useContext(NotesContext);
    const { deleteNotes  } = context;
    
    return (
        <>
            <div className="col-lg-3">
                <div className="card my-3">
                    <div className="card-body">
                       <div className="d-flex align-items-center">
                       <h6 className="card-title">{note.title}
                            <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNotes(note)}}></i>
                            <i className="fa-solid fa-trash-can" onClick={()=>{deleteNotes(note._id)}}></i>
                        </h6>
                       </div>
                        <hr/>
                        <p className="card-text"><i className="fa-solid fa-circle fa-2xs"></i> {note.description}</p>
                        {(note.tag)?<p className="card-text"><i className="fa-solid fa-circle fa-2xs"></i> {note.tag}</p>:''}
                        <p className="card-text"><i className="fa-solid fa-circle fa-2xs"></i> {note.date}</p>
                        {/* <button className='btn btn-primary' type='button'></button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesItem
