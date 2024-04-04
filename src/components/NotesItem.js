import React, { useContext } from 'react'
import NotesContext from '../mynotes/NotesContext';
import image from '../images/about.jpg'
require('../styles/noteitems.css')


function NotesItem(props) {
    const { note, updateNotes } = props;
    const context = useContext(NotesContext);
    const { deleteNotes } = context;
    const tagtext = note.tag
    const tagname = tagtext.toLowerCase();
    const title = note.title
    const ftitle = title.charAt(0);
    const uptitle = ftitle.toUpperCase();
    const remtitle = title.slice(1)
    const titlename = uptitle + remtitle;
    /* const rtag = tagtext.slice(1);
    const tagname = uper + rtag; */



    return (
        <>
            <div className="col-lg-4 rounded-3 mt-3">
                <div className='d-flex flex-column justify-content-center rounded-3 bg-primary-subtle px-3' >
                    <div className='d-flex justify-content-end'>
                        <div>
                            <i className="fa-solid fa-pen-to-square mx-3 mt-3 fs-5 text-primary" onClick={() => { updateNotes(note) }}></i><i className="fa-solid fa-trash-can mt-3 fs-5 text-danger" onClick={() => { deleteNotes(note._id) }}></i></div> </div>
                    <div className="card my-3 bg-info-subtle">
                        <div className="card-body ">
                            <div className="d-flex align-items-center justify-content-center">
                                <h6 className="card-title">{titlename}</h6>
                            </div>
                            <hr />
                            <div className='notescomponent'>
                                <p className="card-text">{note.description}</p>
                                {(tagname) ? <p><spam className="card-text notetag">#{tagname}</spam></p> : ''}
                                <img src={image} alt="Loading..." />
                                <p className="card-text font-size-sm mt-3 notedate">{note.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default NotesItem
