import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login';
import Registration from '../src/components/Registration';
import Home from '../src/components/Home';
import NoteDetails from './components/NoteDetail';
import { auth } from './firebaseConfig';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={isLoggedIn ? <Home /> : <Login handleLogin={handleLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/note/:noteId" element={<NoteDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
