import React, { useContext } from 'react'
import NotesContext from '../mynotes/NotesContext';
import image from '../images/about.jpg'


function NotesItem(props) {
    const { note, updateNotes } = props;
    const context = useContext(NotesContext);
    const { deleteNotes } = context;
    console.log(note.file)

    return (
        <>
            <div className="col-lg-4 rounded-3 mt-3">
            <div className='d-flex flex-column justify-content-center rounded-3 bg-primary-subtle px-3' >
                <div className='d-flex justify-content-end'>{/*  <div className='mt-2 fs-8'>{note.notetype}</div>  */}<div><i className="fa-solid fa-pen-to-square mx-3 mt-3 fs-5 text-primary" onClick={() => { updateNotes(note) }}></i><i className="fa-solid fa-trash-can mt-3 fs-5 text-danger" onClick={() => { deleteNotes(note._id) }}></i></div> </div>
                <div className="card my-3 bg-info-subtle">
                    <div className="card-body ">
                        <div className="d-flex align-items-center justify-content-center">
                            <h6 className="card-title">{note.title}</h6>
                        </div>
                        <hr />
                        <div className='notescomponent'>
                            <p className="card-text"><i className="fa-solid fa-circle fa-2xs"></i> {note.description}</p>
                            {(note.tag) ? <p className="card-text"><i className="fa-solid fa-circle fa-2xs"></i> {note.tag}</p> : ''}
                            <p className="card-text mt-3"><i className="fa-solid fa-circle fa-2xs"></i> {note.date}</p>
                            <img src={image} alt="Loading..." style={{width:'290px', height:"150px" , objectFit:'cover'}} />
                        </div>

                    </div>
                </div>
                </div>
            </div >
        </>
    )
}

export default NotesItem
