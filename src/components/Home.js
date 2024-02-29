import React from 'react'
import Notes from './Notes';
import TopBody from './TopBody';

/* import AddNotes from './AddNotes'; */

export default function Home(props) {
  const { showAlerts } = props;
  return (
    <>
      <TopBody />
      <Notes showAlerts={showAlerts} />
    </>
  )
}
