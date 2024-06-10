import './App.css';
import React, { useState } from 'react';
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
import NewPassword from './components/NewPassword';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const getTheme = (mode) => createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#121212' : '#DBE9FE',
        paper: mode === 'dark' ? '#1d1d1d' : '#DBE9FE',
      },
      primary: {
        main: mode === 'dark' ? '#1976d2' : '#1976d2',
      },
      secondary: {
        main: mode === 'dark' ? '#9C27B0' : '#9C27B0',
      },
      notes: {
        main: mode === 'dark' ? '#252525' : '#CFE2FF',
      },
      notesElement: {
        main: mode === 'dark' ? '#202020' : '#CFF4FC',
      },
      text: {
        main: mode === 'dark' ? '#ffffff' : '#000000',
      },
      navBar: {
        main: mode === 'dark' ? 'rgb(13, 13, 13)' : 'rgb(219, 233, 254)',
      },
    },
  });

  const [darkMode, setDarkMode] = useState(false);

  const theme = React.useMemo(() => getTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <NotesState>
        <Router>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
          <div className="container">
            <Routes>
              <Route path='/login' element={<LogIn/>}/>
              <Route path='/forgot-password' element={<ForgotPass/>}/>
              <Route path='/new-password/:id/:auth_token/' element={<NewPassword/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='/addnotes' element={<AddNotes/>}/>
              <Route path='/notes' element={<Notes darkMode={darkMode}/>}/>
              <Route path='/publicnotes' element={<PublicNotes/>}/>
              <Route path='/about' element={<About darkMode={darkMode}/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='*' element={<PageNotFound/>}/>
            </Routes>
          </div>
          <Footer/>
        </Router>
      </NotesState>
      </ThemeProvider>
    </>
  );
}

export default App;
