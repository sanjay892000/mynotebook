import './App.css';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Help from './components/Help';
import Home from './components/Home';
import Navbar from './components/Navbar';
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NotesState from './mynotes/NotesState';
import Alert from './components/Alert';
import { useState } from 'react';

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
              <Route path='/About' element={<About />} />
              <Route path='/Contact' element={<ContactUs />} />
              <Route path='/Help' element={<Help />} />
              <Route path='/LogIn' element={<LogIn showAlerts={showAlerts}/>} />
              <Route path='/SignUp' element={<SignUp showAlerts={showAlerts}/>} />
            </Routes>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
