import React, { useState } from 'react'
import NotesContext from './NotesContext';
import { BaseUrl } from '../Urls';


export default function NotesState(props) {
  const myNotes = [];
  const [Notes, setNotes] = useState(myNotes);
  const { showAlerts } = props;

  //fetch Notes
  const getNotes = async () => {
    //api call
    const response = await fetch(`${BaseUrl}/api/notes/getnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        /* "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMzEzZTMyY2JmOWQ4ODFlNTMzNmExIn0sImlhdCI6MTY5NDcwMDYyMX0._7zsjnlY9wNnD7Uam_l0W3NiI9yBMYQ6vTbwtjzC-jI" */
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  //Add Notes
  const addNotes = async (title, description, tag /* , file */) => {
    //API call to add data into database
    const response = await fetch(`${BaseUrl}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        /* "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMzEzZTMyY2JmOWQ4ODFlNTMzNmExIn0sImlhdCI6MTY5NDcwMDYyMX0._7zsjnlY9wNnD7Uam_l0W3NiI9yBMYQ6vTbwtjzC-jI" */
      },
      body: JSON.stringify({ title, description, tag /* , file */ }),
    });
    const note = await response.json()
    setNotes(Notes.concat(note))
  }

  //Delete Notes
  const deleteNotes = async (id) => {
    const response = await fetch(`${BaseUrl}/api/notes/deletenotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        /* "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMzEzZTMyY2JmOWQ4ODFlNTMzNmExIn0sImlhdCI6MTY5NDcwMDYyMX0._7zsjnlY9wNnD7Uam_l0W3NiI9yBMYQ6vTbwtjzC-jI" */

      }
    });
    const json = await response.json();
    console.log(json)
    const newNote = Notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
    showAlerts('Your note has been deleted', 'danger', 'Success');
  }

  //Edit Notes
  const editNotes = async (id, title, description, tag) => {
    const response = await fetch(`${BaseUrl}/api/notes/updatenotes/${id}`, {
      method: "PUt", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        /* "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMzEzZTMyY2JmOWQ4ODFlNTMzNmExIn0sImlhdCI6MTY5NDcwMDYyMX0._7zsjnlY9wNnD7Uam_l0W3NiI9yBMYQ6vTbwtjzC-jI" */

      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(Notes))

    for (let index = 0; index < newNotes.length; index++) {
      const note = newNotes[index];
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <div>
      <NotesContext.Provider value={{ Notes, setNotes, addNotes, editNotes, deleteNotes, getNotes}}>
        {props.children}
      </NotesContext.Provider>
    </div>
  )
}
