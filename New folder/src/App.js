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
import PageNotFound from './components/PageNotFound';
import PublicNotes from './components/PublicNotes';

function App() {
  const [alerts, setAlerts] = useState(null);
  const showAlerts = (massage, type, status) => {
    setAlerts({
      massage: massage,
      type: type,
      status: status
    })
    setTimeout(() => {
      setAlerts(null);
    }, 2000);
  }

  return (
    <>
      <NotesState showAlerts={showAlerts}>
        <Router>
          <Navbar showAlerts={showAlerts}/>
          <Alert alerts={alerts} />
          <div className="container">
            <Routes>
              <Route path='/login' element={<LogIn showAlerts={showAlerts}/>} />
              <Route path='/' element={<Home showAlerts={showAlerts} />} />
              <Route path='/addnotes' element={<AddNotes showAlerts={showAlerts} />} />
              <Route path='/notes' element={<Notes showAlerts={showAlerts} />} />
              <Route path='/publicnotes' element={<PublicNotes showAlerts={showAlerts} />} />
              <Route path='/about' element={<About />} />
              <Route path='/signup' element={<SignUp showAlerts={showAlerts} />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </NotesState>
    </>
  );
}

export default App;
