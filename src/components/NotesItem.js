import React, { useContext } from 'react'
import NotesContext from '../mynotes/NotesContext';
import { BaseUrl } from '../Urls'
import { useTheme } from '@mui/material/styles';
require('../styles/noteitems.css');


function NotesItem(props) {

    const { note, updateNotes } = props;
    console.log(note)
    const { deleteNotes } = useContext(NotesContext);
    const theme = useTheme();
    const { title, description, tag, type, date } = note;
    const ftitle = title.at(0).toUpperCase();
    const remtitle = title.slice(1)
    const titlename = ftitle + remtitle;
    const firstdec = description.charAt(0).toUpperCase()
    const remdec = description.slice(1);
    const allDescription = firstdec + remdec;
    const tagname = tag.replaceAll(" ", "").toLowerCase();
    const notetype = type ? "public" : "private";
    const date1 = new Date(date);

    return (
        <>
            <div className="col-md-4 rounded-3 mt-3">
                <div className='d-flex flex-column justify-content-center rounded-3 px-3' style={{ backgroundColor: theme.palette.notes.main }}>
                    <div className='d-flex justify-content-between align-item-center'>
                        <spam className={`pt-3 text-danger`}>{notetype}</spam>
                        <spam><i className="fa-solid fa-pen-to-square mx-3 mt-3 fs-5 text-primary" onClick={() => { updateNotes(note) }}></i>
                            <i className="fa-solid fa-trash-can mt-3 fs-5 text-danger" onClick={() => { deleteNotes(note._id) }}></i></spam>
                    </div>
                    <div className="card my-3" style={{ backgroundColor: theme.palette.notesElement.main, color: theme.palette.text.main }}>
                        <div className="card-body ">
                            <div className="d-flex align-items-center justify-content-center">
                                <h6 id='cardtitle' className="card-title">{titlename}</h6>
                            </div>
                            <hr />
                            <div className='notescomponent'>
                                <p className="card-text">{allDescription}</p>
                                {(tagname) ? <p><spam className="card-text notetag">#{tagname}</spam></p> : ''}
                                {note.image ? <img src={`${note.image}`} alt="loading..." /> : ''}
                                <p className="card-text font-size-sm mt-3 notedate">{date1.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                   { type ? <div className="d-flex  align-items-center my-4">
                        <a href='/'><img src="http://localhost:3000/static/media/usericon.9d93cbdb31f49a45d11e.png" className="rounded-circle me-3" width="40" height="40" alt="loading..."/></a>
                        <div className="small">
                            <a href='/'  className="text-dark fw-semibold text-decoration-none hover:text-primary">Jonathan Reinink</a>
                            <div className="text-muted">Aug 18</div>
                        </div>
                    </div> : ""}
                </div>
            </div >
        </>
    )
}

export default NotesItem
