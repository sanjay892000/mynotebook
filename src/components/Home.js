import React from 'react'
import Notes from './Notes';
/* import AddNotes from './AddNotes'; */

export default function Home(props) {
  const {showAlerts}=props;
  return (
   <Notes showAlerts={showAlerts}/>
  )
}
