import './App.css';
import About from './components/About';
import Home from './components/Home';
import AddNotes from './components/AddNotes';
import Navbar from './components/Navbar';
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Notes from "./components/Notes";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NotesState from './mynotes/NotesState';
import Alert from './components/Alert';
import { useState } from 'react';
import Footer from './components/Footer';
/* import { Notes } from '@mui/icons-material'; */


function App() {
  const [alerts, setAlerts] = useState(null);
  const showAlerts = (massage, type,status) => {
    setAlerts({
      massage:massage,
      type:type,
      status:status
    })
    setTimeout(() => {
      setAlerts(null);
    }, 2000);
  }
  return (
    <>
      <NotesState>
        <Router>
          <Navbar showAlerts={showAlerts}/>
          <Alert alerts={alerts}/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home showAlerts={showAlerts}/>} />
              <Route path='/AddNotes' element={<AddNotes showAlerts={showAlerts}/>} />
              <Route path='/Notes' element={<Notes showAlerts={showAlerts}/>} />
              <Route path='/About' element={<About />} />
              <Route path='/LogIn' element={<LogIn showAlerts={showAlerts}/>} />
              <Route path='/SignUp' element={<SignUp showAlerts={showAlerts}/>} />
             </Routes>
          </div>
          <Footer/>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
