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
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';
import PublicNotes from './components/PublicNotes';
import ForgotPass from './components/ForgotPass';

function App() {

  return (
    <>
      <NotesState>
        <Router>
          <Navbar/>
          <div className="container">
            <Routes>
              <Route path='/login' element={<LogIn/>}/>
              <Route path='/forgot-password' element={<ForgotPass/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='/addnotes' element={<AddNotes/>}/>
              <Route path='/notes' element={<Notes/>}/>
              <Route path='/publicnotes' element={<PublicNotes/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='*' element={<PageNotFound/>}/>
            </Routes>
          </div>
          <Footer/>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
